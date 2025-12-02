---
title: 'DHCP 간단 정리'
date: 2020-07-17 21:00:00
category: 'Networking'
draft: false
---
## DHCP (Dynamic Host Configuration Protocol)

TCP/IP 통신을 위해 필요한 설정 정보를 할당/관리하기 위한 프로토콜이다.

7계층에 위치한 프로토콜로 UDP 기반으로 통신한다.

동작은 다음과 같은 순서로 이루어진다.

1. DHCP Discover
    - 클라이언트에서 Broadcast로 IP 할당 요청을 한다.

2. DHCP Offer
    - 서버에서 클라이언트에게 (**Broadcast** or **Unicast**)로 네트워크 정보 및 할당될 IP주소를 제공한다.

3. DHCP Request
    - 클라이언트에서 Broadcast로 해당 IP 할당 요청을 한다.
    
4. DHCP Ack
    - 서버에서 클라이언트에게 DHCP Request에 대한 Ack을 돌려준다.