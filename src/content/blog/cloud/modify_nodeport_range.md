---
title: '쿠버네티스 NodePort 할당 범위 변경하기'
date: 2021-07-23 17:17:00
category: 'Cloud'
draft: false
---
**수정사항**
- 2021.07.24 21:16 :: 제목 수정, 일부 잘못된 내용 삭제, 주석 수정

## NodePort

쿠버네티스 기본 세팅에서 NodePort는 `30000`-`32767` 범위 내에서 할당된다. [1]

이렇게 세팅된 이유는 다음 충돌이 예상되기 때문이다. [2]

- 노드가 실제로 사용하는 포트와 충돌할 수 있음. (예로 `22`번 포트 등)
- pod host 포트와 충돌할 수 있음.
- `80`, `443`, `22` 등에 랜덤으로 할당될 수 있음.

NodePort range는 클러스터에서 pod로 운영되는 `kube-apiserver`가 제어한다.

이 pod는 `/etc/kubernetes/manifests/kube-apiserver.yaml` 파일에서 설정값을 가져오고, 이 파일을 수정하면 현재 운영 중인 클러스터도 이를 감지하고 `kube-apiserver` pod를 재시작한다. 

해당 파일에 `--service-node-port-range` 설정을 넣어주면 된다. [3]

수정이 완료되면 자동으로 pod가 재시작되며 변경한 설정 또한 반영된다.

```yaml
# /etc/kubernetes/manifests/kube-apiserver.yaml

...
spec:
  containers:
  - command:
    - kube-apiserver
    - --authorization-mode=Node,RBAC
    ...
    - --service-node-port-range=30000-50000
...
```

## References

[1] [https://kubernetes.io/ko/docs/concepts/services-networking/service/#nodeport](https://kubernetes.io/ko/docs/concepts/services-networking/service/#nodeport)

[2] [https://github.com/kubernetes/kubernetes/issues/9995](https://github.com/kubernetes/kubernetes/issues/9995)

[3] [http://www.thinkcode.se/blog/2019/02/20/kubernetes-service-node-port-range](http://www.thinkcode.se/blog/2019/02/20/kubernetes-service-node-port-range)