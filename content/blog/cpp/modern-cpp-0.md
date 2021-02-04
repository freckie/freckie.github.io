---
title: '(C++11) std::unique_ptr'
date: 2018-01-05 00:00:00
category: 'C++'
draft: false
---
## Smart Pointer

C++에서 제공하는 동적 메모리 할당&해제는 분명히 장점도 있지만, 프로그래머의 실수로 인해 심각한 버그를 초래할 수 있다.

Java 등과 같은 언어는 *Garbage Collection* 기능을 지원해 자동으로 메모리 할당&해제를 도와주며, 이는 C++의 메모리 관리에 비해 편리함이 자명하다.

따라서 *Garbage Collection*의 필요성이 C++에서도 대두되었고 그 결과 탄생한 것이 ***Smart Pointer*** 개념이다.

스마트 포인터는 소멸될 때, 소유하고 있던 객체를 소멸시켜 메모리 누수 및 의도치 않은 상황을 방지한다.

이렇게 *Dangling Pointer* 위험성도 해결할 수 있다는 것이 스마트 포인터 사용의 장점이 될 수 있을 것이다.

C++11 이전에 있던 스마트 포인터는 auto_ptr이 있었지만 사용 상에 여러 제약이 있어 폭넓게 사용되진 못했다고 한다.

(C++11에서 deprecated, C++17에서 removed)

C++11 이후에 추가된 스마트 포인터는 `unique_ptr`, `shared_ptr`, `weak_ptr`이 있으며 이번 포스팅에서는 `unique_ptr`을 다룰 것이다.


## std::unique_ptr

`unique_ptr`은 포인터의 **독점적인 소유권**을 가진 객체이다.

즉, 하나의 대상 포인터를 여러 개의 `unique_ptr`이 소유할 수 없다.

대상 포인터를 소유하던 `unique_ptr`이 소멸될 때, 포인터를 소멸시킨 후에 `unique_ptr`이 소멸된다.

(`shared_ptr`의 경우에는 모든 `shared_ptr`이 소멸되어야 대상 포인터가 소멸된다.)

unique_ptr을 사용하기 위해서 <memory> 헤더를 인클루드 해준다.

( 참고 : `auto_ptr`은 STL 컨테이너에 사용할 수 없었지만, `unique_ptr`은 STL 컨테이너에서도 사용 가능하다. )


## 생성

```cpp
// 생성자를 사용한 생성.
std::unique_ptr<int> ptr1(new int(2018));

// [컴파일 에러] 복사 생성자 금지.
std::unique_ptr<int> ptr2(ptr1);

// [컴파일 에러] 대입 연산자 사용 금지.
std::unique_ptr<int> ptr3 = ptr1;

// [컴파일 에러] raw pointer 대입 금지.
std::unique_ptr<int> ptr4 = new int(2018);

// [C++14 기능] Factory 함수를 사용한 생성.
std::unique_ptr<int> ptr5 = std::make_unique<int>(5);
```

위 예제에서 볼 수 있듯이 `unique_ptr`은 **복사 생성자, 대입 연산자(복사 지정)는 사용이 금지**되어 있다.

복사 생성자가 허용되었다면 같은 포인터에 대해 여러 `unique_ptr`이 소유하고 있다는 착각을 할 수 있기 때문에 금지되었다고 한다.

Scott Meyers는 생성자를 사용해 생성하는 것보다, **make_unique 함수를 통해 생성하는 것을 선호**하라고 조언한다. 예외 안정성, 코드 중복 회피 측면에서 `make_unique` 함수가 낫다고 한다.

( 출처 : Scott Meyers 저서 "Effective Modern C++" )


## Reset 및 Release

```cpp
int* pInt1 = new int(2017);
int* pInt2 = new int(2018);

auto ptr = std::make_unique<int>(pInt1);

// 기존의 pInt1는 소멸되고 pInt2의 소유권을 가진다.
ptr.reset(pInt2);

// 기존의 pInt2는 소멸되고, 아무 것도 소유하지 않는다.
ptr.reset();
```

위 예제와 같이 다른 포인터의 소유권을 가져올 수 있다.
만약 `reset` 함수에 파라미터가 주어지지 않는다면, 기존에 소유하던 포인터만 소멸시킨다.

```cpp
int* pInt1 = new int(2018);
int* pInt2 = nullptr;

auto ptr = std::make_unique<int>(pInt1);

// 소유권을 반환한다. (포인터 소멸X)
pInt2 = ptr.release();
std::cout << *pInt2; // [결과] : 2018
```

`release()` 함수를 통해 메모리 해제 없이 소유권만을 반환한다.


## Custom Deleter (커스텀 삭제자)

`unique_ptr`이 소유하던 포인터를 소멸시킬 때, 그 객체를 delete 하는 방식으로 소멸시킨다.

다른 방식의 소멸 구현이 필요할 때는 그 객체만을 위한 Deleter를 만들어 지정할 수 있다.

Custom Deleter 는 **Functor**가 될 수도 있고, 아래 예제와 같이 **Lambda 함수**가 될 수도 있다.

( 물론 **함수 포인터**도 가능하며 `std::function`도 사용 가능하다. )

```cpp
auto deleter = [](Human* human)
{
  delete[] human->name;
  delete human;
}
// Deleter를 지정한다.
std::unique_ptr<Human, decltype(deleter)> ptr(new Human, deleter);
```

( 주의 : `std::make_unique`를 사용한 생성에는 Custom Deleter를 지정할 수 없음. )


## 데이터 접근

이 스마트 포인터를 사용하다 보면 `unique_ptr`이 포인터를 소유하고 있는지 확인할 필요가 있을 것이다.

`unique_ptr::operator bool()` 이 정의되어 있기 때문에 다음과 같이 확인하면 된다.

```cpp
std::unique_ptr<int> ptr;

if(ptr)
  std::cout << *ptr << std::endl;

else
  std::cout << "데이터가 존재하지 않음.\n";
```

또한, `unique_ptr`이 가지고 있는 데이터에 접근할 때는 기존의 Raw Pointer 사용하던 것 처럼 `*`, `->` 연산자를 통해 접근하면 된다.


## move semantics

C++11에서 도입된 기능 중에 제일 중요한 기능이 *rvalue 참조*와 *move semantics* 라고 생각한다.

`unique_ptr`는 *rvalue*에 대해서는 대입 연산을 허용하고 있기 때문에 아래 예제와 같이 `std::move` 함수를 이용해서 **소유권을 이동**하는 것이 가능하다.

```cpp
auto ptr1 = std::make_unique<int>(2018);

// 소유권 이동. ptr1는 사용 불가.
std::unique_ptr<int> ptr2 = std::move(ptr1);
```


## references

Scott Meyers - "*Effective Modern C++*"

https://msdn.microsoft.com/ko-kr/library/hh279676.aspx