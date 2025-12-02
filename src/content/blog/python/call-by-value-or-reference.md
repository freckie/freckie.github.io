---
title: '(번역글) Python은 call-by-value일까, call-by-reference일까?'
date: 2018-03-09 00:00:00 
category: 'Python'
draft: false
---
파이썬에서는 함수 파라미터 작동을 어떻게 하는지 찾아보다 괜찮은 글이 있어 가져와 보았다. ( 이글 댓글창에서도 의견이 분분하지만 적어도 내가 생각하는 바와 비슷해서 옮겨왔다. / 발번역 )

출처 : [https://jeffknupp.com/blog/2012/11/13/is-python-callbyvalue-or-callbyreference-neither/](https://jeffknupp.com/blog/2012/11/13/is-python-callbyvalue-or-callbyreference-neither/)


## 파이썬은 Call-by-value나 call-by-reference로 작동할까? 둘 다 아니다.

C나 Java 같은 언어에서 넘어온 개발자들이 파이썬 프로그래밍을 할 때 실수를 저지르는 것 중 하나는, 파이썬 함수에서 파라미터를 넘기는 방식에 대한 것이다. 더 기초적인 레벨에서, 이런 혼동은 파이썬의 객체 중심적 데이터 모델(object-centric data model)에 대한 오해에서 기인한다. 누군가 파이썬 함수의 호출 방식이 *"call-by-value"* 인지, *"call-by-reference"*인지 질문을 한다면, **둘다 아니다**가 정확한 답이 될 것이다. 사실은, 이런 용어들을 파이썬의 모델에 끼워넣기식 번역을 하는 것은 파이썬을 제대로 이해하지 못한 탓이다. *"call-by-object"*나 *"call-by-object-reference"*가 파이썬의 방식을 설명하기에 더 적합한 용어일 것이다. 그러면 *"call-by-object"*가 무슨 뜻일까?  

파이썬에서는 (거의) 대부분이 객체다. 우리가 파이썬에서 보통 "변수"라고 부르던 것은 더 정확히는 *이름(names)*이다. 비슷하게 *대입(assignment)*은 실제로 객체에 이름을 *바인딩(binding, 연결)* 하는 것일뿐이다. 각각의 바인딩에는 바인딩이 유지되는 *스코프(scope)* (보통 이름이 시작되는 블록)가 있다.  

한 번에 많은 용어들을 사용했지만 이런 기본 용어들이 파이썬 실행 모델의 기초를 형성한다. 그리고 C++과 비교했을 때의 차이는 미묘하지만 중요하다. 다음은 이러한 차이를 강조하는 구체적인 예제이다. 다음 C++ 예제가 실행될 때 일어날 일을 생각해보자.  

```cpp
string some_guy = "Fred";
// ...
some_guy = "George";
```

위의 예제에서 `some_guy` 변수는 메모리의 한 위치를 가리키고 'Fred'라는 값은 그 위치에 삽입되어 있는 데이터이다 (실제로 우리는 `some_guy` 의 주소를 이용해서 참조되는 메모리 위치를 얻을 수 있다). 그리고 `some_guy` 가 가리키는 메모리 위치의 컨텐츠는 'George' 로 바뀐다. 이전의 값은 더 이상 존재하지 않으며 새로운 값으로 덮어쓰기된 것이다. 아마 이 방법이 우리가 직관적으로 생각하던 방법에 더 가까울 것이다.  

이번에는 위와 비슷한 파이썬 코드를 보자.  

```python
some_guy = 'Fred'
# ...
some_guy = 'George'
```


## 객체에 이름을 바인딩하기

첫째 줄에서 우리는 `some_guy` 라는 이름과, 'Fred' 값을 포함하는 문자열 객체를 바인딩했다. 프로그램의 맥락에서 보면 환경이 바뀐 것이다. 문자열 객체와 `some_guy` 라는 이름의 바인딩이 구문이 실행된 블록의 스코프에서 만들어졌다. 그 후에 `some_guy = 'George'` 구문을 실행할 때, 'Fred' 값을 가지는 문자열 객체는 영향을 받지 않는 상태가 된다 (*unaffected*). 우리는 단지 `some_guy` 이름의 바인딩을 바꿨을 뿐이다! 그러나 우리는 **'Fred'나 'George' 문자열 객체를 바꾸지는 않았다**. 우리의 입장에서 그 객체들은 무제한으로 살아있게 된다.  

너무 지나치게 세세한 것에 신경쓰는 것 같아 보일 수 있지만, 바인딩이 공유되거나 함수가 호출될 경우에는 단 하나의 바인딩을 하는 것이 더 중요할 것이다. 다음 파이썬 코드를 보고 다시 생각해보자.  

```python
some_guy = 'Fred'

first_names = []
first_names.append(some_guy)

another_list_of_names = first_names
another_list_of_names.append('George')
some_guy = 'Bill'

print (some_guy, first_names, another_list_of_names)
```

마지막 줄에서는 무슨 결과가 출력되었을까? 처음부터 보자면 'Fred' 문자열 객체와 `some_guy` 이름의 바인딩이 블록의 *namespace*에 추가되었고, 그 뒤 `first_name` 이라는 이름이 빈 리스트 객체에 바인딩되었다. 4번째 줄에서는 `first_name`라는 이름이 바인딩된 리스트 객체에 `some_guy`가 바인딩 된 객체를 추가하는 함수가 호출된다. 이 부분에서, 실재하는 객체는 문자열과 리스트 객체 단 두 개 뿐이다. 그리고 `some_guy`와 `first_name[0]`은 둘 다 같은 객체를 가리킨다.  

(실제로 `print(some_guy is first_names[0])` 구문의 결과가 이를 증명한다)  

계속 분석해보자. 6번째 줄에서는 `another_list_of_names`라는 새로운 이름이 바인딩 된다. 이름간의 대입은 새로운 객체를 만들지 않는다. 이 이름들은 단순히 같은 객체에 바인딩된 것 뿐이다. 결과적으로 문자열 객체와 리스트 객체, 여전히 이 두 개만이 인터프리터에 의해 만들어진 객체가 된다. 7번째 줄에서는 `another_list_of_names`가 바인딩된 객체의 멤버 함수가 호출되며, 'George' 라는 새 객체를 추가하도록 변경된다. 그래서 아까 전의 질문에 대답하기 위해 코드의 출력 결과를 보면 다음과 같다.  

```python
Bill ['Fred', 'George'] ['Fred', 'George']
```

이 결과는 파이썬에서는 실제로 두 가지 종류의 객체가 있다는 중요한 점을 보여준다. ***변경가능한 객체(mutable object)***는 시간에 따라 변화하는 동작을 하며, 바인딩된 모든 이름을 통해 알 수 있다. 파이썬의 리스트는 변경가능한 객체의 한 예이다. ***변경불가능한 객체(immutable object)***는 만들어진 이후에 수정될 수 없다. 이들은 `string.join()`과 같은 함수가 새로운 객체의 값을 계산하기 위해 쓰일 수 있다. 이에 대해 생각해 볼 때, 파이썬에서 모든 것이 객체이기 때문에 이러한 **"이분법"**적인 구분이 필요할 수 밖에 없다. 만약 정수형이 변경불가능했다면 우리는 프로그램에서 숫자 *2*의 의미를 바꿀 수 있었을 것이다!  

그러나 "변경가능한 객체는 바뀔 수 있고, 변경불가능한 객체는 바뀔 수 없다"고 말할 수는 없다. 다음의 예제를 고려해보자.  

```python
first_names = ['Fred', 'George', 'Bill']
last_names = ['Smith', 'Jones', 'Williams']
name_tuple = (first_names, last_names)

first_names.append('Igor')
```

파이썬에서의 튜플은 변경불가능하다. 우리는 `name_tuple`으로 바인딩된 튜플 객체를 바꿀 수는 없다. 그러나 변경불가능한 컨테이너는 리스트와 같은 변경가능한 객체의 참조가 포함할 수 있다. 그러므로 `name_tuple`이 변경불가능하다고 해도, 마지막 줄에서 'Igor'가 `first_name`에 추가될 때 `name_tuple`은 변경된다. 이는 때로 유용할 수 있는 미묘한 부분이다.  

이제는 파이썬에서 함수 호출이 어떻게 작동하는지 거의 알 수 있어야 한다. 만약 `foo(bar)`를 호출한다면, 함수가 호출될 때 foo 함수의 스코프 안에서 인수 bar가 바인딩된 객체에 바인딩을 하기만 하면 된다. **만약** `bar`**가 변경가능한 객체를 가리키고** `foo`**가** `bar`**의 값을 바꾼다면, 이는 함수 스코프 바깥에서도 적용된다.**  

```python
def foo(bar):
    bar.append(42)
    print(bar)
    # >> [42]

answer_list = []
foo(answer_list)
print(answer_list)

# >> [42]
```

반면에 `bar`가 변경불가능한 객체를 가리킨다면, `foo` 함수가 할 수 있는 것은 함수 내부의 *namespace*에 `bar` 라는 이름을 만들고 완전히 다른 객체에 바인딩하는 것뿐이다.  

```python
def foo(bar):
    bar = 'new value'
    print (bar)
    # >> 'new value'

answer_list = 'old value'
foo(answer_list)
print(answer_list)

# >> 'old value'
```

이제 왜 파이썬이 *"call-by-value"*나 *"call-by-reference"*가 아닌지 명확해졌을 거라고 생각한다. 파이썬에서의 변수는 메모리의 위치를 가리키는 것이 아니다. 단순히 파이썬 객체와의 바인딩을 뜻할 뿐이다. "모든 것이 객체다"라는 말이 파이썬에 익숙하지 않은 사람들에게는 혼란의 원인이 될 수 있지만, 이는 강력하고 유연한 언어 구조를 갖게 해준다.  