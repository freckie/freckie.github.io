---
title: '파이썬 SharedMemory 사용 시 자동으로 unlink가 호출되는 문제'
date: 2022-10-28 18:42:00
category: 'Troubleshooting'
draft: false
---
## 문제점

- Python 3.8에서 추가된 `multiprocessing.shared_memory` 모듈의 `SharedMemory`를 사용하는 경우,
- SharedMemory를 사용하던 프로세스가 종료되었을 때, 연결된 공유 메모리 블록까지 릴리즈되어 다른 프로세스에서 사용이 불가능한 문제 발생한다.
    - SharedMemory 세그먼트를 프로세스의 종료와 관계 없이 유지하는 시나리오도 존재할 수 있지만, 파이썬에서는 **memory leak로 판단하고 강제로 릴리즈함**으로써 발생한다.
- Python 3.8 ~ 3.11에서 발생한다.


### 문제 재현 시나리오

(파이썬 프로세스 $P_1$, $P_2$, $P_3$가 같은 공유 메모리 블록에 접근하려는 상황)

1. $P_1$이 SharedMemory를 생성
2. $P_2$가 해당 공유 메모리 블록에 접근하고, 작업을 처리한 후 프로세스 종료
    - Warning 발생
        
        ```python
        UserWarning: resource_tracker: There appear to be 1 leaked shared_memory objects to clean up at shutdown
          warnings.warn('resource_tracker: There appear to be %d '
        ```
        
3. $P_3$가 해당 공유 메모리 블록에 접근 시도
    - 에러 발생
        
        ```python
        FileNotFoundError: [Errno 2] No such file or directory: '/test'
        ```
        
```python
from multiprocessing.shared_memory import SharedMemory

### Process 1
shm = SharedMemory(name='test', create=True, size=4096)
# 대기

### Process 2
shm = SharedMemory(name='test', create=False)
# ...
exit()
# Warning 발생

### Process 3
shm = SharedMemory(name='test', create=False)
# 에러 발생
```


### 문제 원인

- `multiprocessing` 라이브러리에는 `ResourceTracker`가 존재하며, SharedMemory 오브젝트 생성 시 해당 오브젝트는 **ResourceTracker의 감시 대상에 등록**된다. (create=True인 경우나 False인 경우 모두 포함) [1]
    
    ```python
    ### Lib/multiprocessing/shared_memory.py
    
    class SharedMemory:
    	# ...
    
    	def __init__(self, name=None, create=False, size=0):
    		  # ...
    		
    		  if _USE_POSIX:
    		
    		      # POSIX Shared Memory
    		
    		      if name is None:
    		          while True:
    		              name = _make_filename()
    		              try:
    		                  self._fd = _posixshmem.shm_open(
    		                      name,
    		                      self._flags,
    		                      mode=self._mode
    		                  )
    		              except FileExistsError:
    		                  continue
    		              self._name = name
    		              break
    		      else:
    		          name = "/" + name if self._prepend_leading_slash else name
    		          self._fd = _posixshmem.shm_open(
    		              name,
    		              self._flags,
    		              mode=self._mode
    		          )
    		          self._name = name
    		      try:
    		          if create and size:
    		              os.ftruncate(self._fd, size)
    		          stats = os.fstat(self._fd)
    		          size = stats.st_size
    		          self._mmap = mmap.mmap(self._fd, size)
    		      except OSError:
    		          self.unlink()
    		          raise
    		
    		      resource_tracker.register(self._name, "shared_memory")
    ```
    
- ResourceTracker는 파이썬 프로세스 종료 시 unlink 되지 않은 SharedMemory 오브젝트가 있다면 **경고를 날리며 unlink를 호출**한다. [2] (leak으로 간주)
    
    ```python
    ### Lib/multiprocessing/resource_tracker.py
    
    # Line 49-51
    _CLEANUP_FUNCS.update({
        'shared_memory': _posixshmem.shm_unlink,
    })
    
    # Line 229-239
    for name in rtype_cache:
    	  # For some reason the process which created and registered this
    	  # resource has failed to unregister it. Presumably it has
    	  # died.  We therefore unlink it.
    	  try:
    	      try:
    	          _CLEANUP_FUNCS[rtype](name)
    		      except Exception as e:
    	          warnings.warn('resource_tracker: %r: %s' % (name, e))
    	  finally:
    	      pass
    ```
    

## 해결 방법

- ResourceTracker는 세마포어가 프로세스 종료에도 남아있는 상황을 피하기 위해 구현되었으나, SharedMemory에도 적용되어 잘못된 결과를 가져오는 버그가 되었다.
- 파이썬 이슈트래커에 이번 버그에 대해 논의가 있었고 솔루션도 제시되어 PR이 있지만, 2022.10.28기준 3.11 버전에서도 아직 머지되지 않았으며 방치된 상태이다.
    - [Issue #82300(bpo-38119)](https://github.com/python/cpython/issues/82300), [Issue #84180(bpo-39959)](https://github.com/python/cpython/issues/84140), [PR #15989(bpo-38119)](https://github.com/python/cpython/pull/15989/files)

- 이슈 #84180에서 shared_memory.py 파일을 수정에 로컬로 사용하는 임시 솔루션을 제시한다. ([해당 코멘트](https://github.com/python/cpython/issues/84140#issuecomment-1093865808))

```python
# Lib/multiprocessing/shared_memory.py

# Line 120
resource_tracker.register(self._name, "shared_memory")
```

```python
# Lib/multiprocessing/shared_memory.py

# Line 120
if create:
		resource_tracker.register(self._name, "shared_memory")
```

- 혹은 라인 120을 아예 주석처리해서 ResourceTracker가 관여하지 못하게 할 수도 있다.

## 참고

[1] [Lib/multiprocessing/shared_memory.py - Line 120](https://github.com/python/cpython/blob/3.10/Lib/multiprocessing/shared_memory.py#L120)
[2] [Lib/multiprocessing/resource_tracker.py](https://github.com/python/cpython/blob/3.10/Lib/multiprocessing/resource_tracker.py)
- [https://stackoverflow.com/questions/62748654/python-3-8-shared-memory-resource-tracker-producing-unexpected-warnings-at-appli](https://stackoverflow.com/questions/62748654/python-3-8-shared-memory-resource-tracker-producing-unexpected-warnings-at-appli)
- [https://bugs.python.org/issue39959](https://bugs.python.org/issue39959)
- [https://bugs.python.org/issue38119](https://bugs.python.org/issue38119)
- https://github.com/python/cpython/pull/15989/files
