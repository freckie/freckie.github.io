---
title: 'missing Location in call to Time.In 에러'
date: 2020-03-19 23:02:00
category: 'GoLang'
draft: false
---
# [Golang] missing Location in call to Time.In 에러

(go 1.12.1 버전 기준)

GoLang으로 HTTP API를 개발 중이었다.

API를 정적 바이너리로 빌드해서, scratch 이미지를 기반으로 Docker 이미지를 빌드해 사용 중이었는데,

다음과 같은 에러가 발생하면서 프로그램이 계속 죽었다.

```go
loc, _ := time.LoadLocation("Asia/Seoul") // 에러 발생
timestamp := time.Now().In(loc).Unix()
```

`time.LoadLocation` 함수는 timezone 데이터(*IANA Timezone Database*)를 다른 위치에서 가져오는데, scratch 이미지는 라이브러리가 포함되어 있지 않아 timezone 데이터를 가져올 수 없어 발생하는 에러였다.

원래는 다음 위치 중 하나에서 timezone 데이터를 가져온다.

- `ZONEINFO` 환경변수
- `$GOROOT/lib/time/zoneinfo.zip`

$GOROOT/lib/time 경로에 들어가서 [zoneinfo.zip](http://zoneinfo.zip) 파일을 가져온 후,

다음 방법으로 이미지에 timezone 데이터를 추가해 에러를 해결했다.

```docker
ADD zoneinfo.zip
ENV ZONEINFO /zoneinfo.zip
```