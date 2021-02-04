---
title: '(C++11) Range-Based for Loop'
date: 2018-01-30 00:00:00
category: 'C++'
draft: false
---
Python, Javascript 등 다른 언어에서 편하게 사용되던 for문을 C++에서도 사용할 수 있게 C++11에서 추가된 문법이 *Range-Based for Loop (범위 기반 for 루프)* 이다.  

```python
country_list = ["KOR", "JPN", "CHN"]
for country in country_list:
 print(country)
```

위와 같은 Python 코드를 C++로 구현하려면 기존에는 다음과 같아야 할 것이다.  

```cpp
using namespace std;

vector<string> li{"KOR", "JPN", "CHN"};

// auto로 간결하게 사용 가능
for (vector<string>::iterator it = li.begin(); it != li.end(); ++it)
 cout << *it;
```

새로운 for문을 사용하면 다음처럼 간결해진다.  

```cpp
vector<string> li{"KOR", "JPN", "CHN"};
for(auto it : li)
 cout << it;
```

Visual Studio 를 사용중인 경우에, for 구문의 it에 커서를 가져가면 다음과 같은 메세지가 띄워진다. (위의 두 가지 C++ 예제가 동치라는 것을 알 수 있다.)  

`std::string it`

`for(vector<string>::iterator it = li.begin(); it!=li.end(); ++it)`

이 문법을 사용할 때 주의할 점이 있기는 한데,
당연하게도 예제에서 `auto it` 과 같이 for문에서 정의한 변수는 for문 바깥에서 사용할 수 없다.
만약 for문을 통해 단순히 값에 접근이 아니라 수정을 하고 싶다면 다음과 같이 레퍼런스로 받아오면 된다.  

```cpp
vector<int> li{1, 2, 3, 4, 5};
for (auto &it : li)
 it = it * it;
```

(MSDN에 의하면) 새로운 for문은 다음 조건을 통해 *iterable*한 객체를 인식한다.  

- 배열을 자동으로 인식
- `begin()`, `end()`를 가지고 있는 객체를 인식

사용자가 정의한 class를 이 문법으로 사용 가능하게 하려면, class의 멤버 함수로 `begin()`, `end()`를 만들어주어야 하며,
*iterator*에서는 `operator++`, `operator!=`, `operator*`를 구현해야 한다.