---
title: '쿠버네티스 | 쿲벖넶팂슶 Ep.1'
date: 2021-06-03 15:43:00
category: 'Cloud'
draft: false
---
![](../images/20210603-1.png)  

## 소개

쿠버네티스 공식 문서에서는 애플리케이션 배포 방법에 따라 3개의 시대로 나눈다.

*전통적인 배포 시대(Traditional deployment era)*, *가상화된 배포 시대(Virtualized deployment era)*, *컨테이너 개발 시대(Container deployment era)*.

![https://d33wubrfki0l68.cloudfront.net/26a177ede4d7b032362289c6fccd448fc4a91174/eb693/images/docs/container_evolution.svg](https://d33wubrfki0l68.cloudfront.net/26a177ede4d7b032362289c6fccd448fc4a91174/eb693/images/docs/container_evolution.svg)

전통적인 배포 시대에는 각 조직이 보유하고 있는 물리 서버에서 애플리케이션을 구동했었다. 알아야 할 것도 많고, 환경 구성부터 매우 복잡한 현대적 배포 방식과는 다르게 물리 서버에 애플리케이션을 올려두면 되는 어떻게 보면 간단한 방법이었다. 다만 서비스의 사용자에 따른 인프라의 탄력적인 확장(scaling)이 불가능했고, 서로 격리되지 않은 애플리케이션들이 영향을 주고받는 등 많은 문제가 발생했다.

한 예시로, 구동 중인 어떤 애플리케이션이 리소스를 점점 많이 잡아먹더니, 서버의 한계만큼 차지한 상황을 보자. 서비스의 수요 증가에 대응하기 위해서 리소스를 더 할당해줘야 하는 것은 맞지만, 이로 인해 리소스를 더 요구하는 다른 애플리케이션이 영향을 받게 된다면 그 서비스는 장애가 발생할 것이다. 그러나 수요가 늘어난다고 다른 서비스에 할당될 리소스까지 할당해줄 수는 없다. 따라서 각 애플리케이션이 서로 격리되어야 할 필요성과, 리소스 할당에 한계를 두어야 할 필요성이 대두되었다.

후에 발전한 가상화 기술은 전통적인 배포 시대 문제점들의 해결책이 되어주었다. **가상화**를 도입하면서, 하나의 물리적인 서버를 여러 대의 논리적인 서버로 나누어 사용할 수 있게 되었다. 이렇게 나누어진 논리적인 서버는 **가상 머신(VM, Virtual Machine)**이라고 불리며, 이 VM들은 서로 격리되어 각각 OS를 구동한다.

가상화의 도입으로 시스템의 리소스를 하드웨어 레벨에서 나누어 각 VM에 할당할 수 있고, 전통적인 배포 방식보다 더 효율적으로 리소스를 사용할 수 있게 되었다.

그러나 쿠버네티스 공식 사이트의 설명에 따르면 HW 레벨 가상화의 VM들은 OS를 포함한 모든 구성 요소를 실행하는 하나의 완전한 머신이므로 머신의 크기가 GB 단위를 넘어가며 너무나 크다는 단점이 있다. 이에 대한 해결책으로, 호스트 OS를 공유하여 조금 더 가벼운 격리 속성을 가진 **컨테이너** 기술이 등장한다.

컨테이너는 가벼운 VM이라고 생각하면 편한데, VM처럼 OS를 포함한 모든 종속성을 포함하는 것이 아닌, 동작할 애플리케이션의 종속성만을 포함해 묶은 것이라고 할 수 있다. 

이렇게 컨테이너를 이용함으로써 가볍고 빠르며 잘 격리된 환경에서 애플리케이션을 실행할 수 있게 되었다. 도커(Docker)의 등장 이후 많은 수의 애플리케이션들이 컨테이너화되어 배포되고 있다. 그러나 구글의 관점에서 볼 때, 너무나 많은 수의 컨테이너들이 배포되고 교체되어 관리의 복잡성이 증가하고 있었고, 컨테이너 간 네트워크 또한 이 복잡성에 크게 영향을 주고 있었다. 구글은 내부에서 사용하던 Borg라는 플랫폼을 통해 일주일에 20억 개 이상의 컨테이너를 배포하는 등 컨테이너들을 종합적으로 관리할 툴이 필요하게 되었다.

쿠버네티스는 이러한 흐름 속에서, 여러 컨테이너들의 스케일링, 장애 처리, 배포 등을 종합적으로 **오케스트레이션(Orchestration)**하는 플랫폼으로 개발되었다. 컨테이너에 대해 원하는 상태(desired state)를 미리 선언해두고, 쿠버네티스는 이 상태를 유지하기 위해 자동으로 rollout, rollback을 수행한다. 또한 컨테이너에서 fail이 발생한다면 다시 시작하고 교체하는 능력을 포함한다. 로드밸런싱을 통한 안정적인 네트워크 트래픽 처리 또한 포함하고 있다.

## 쿠버네티스 클러스터 구축

### 관리형 쿠버네티스 서비스

**GKE (Google Kubernetes Engine)**

[GKE](https://cloud.google.com/kubernetes-engine)는 GCP(Google Cloud Platform)을 통해서 유저에게 제공된다. 쿠버네티스의 설치 등 클러스터 인프라 구축 작업과 유지 보수 작업은 모두 GCP에서 대신해준다. GKE는 구글의 [클라우드 SDK](https://cloud.google.com/sdk/?utm_source=google&utm_medium=cpc&utm_campaign=japac-AU-all-en-dr-bkws-all-pkws-trial-e-dr-1009882&utm_content=text-ad-none-none-DEV_c-CRE_495131377608-ADGP_Hybrid%20%7C%20BKWS%20-%20EXA%20%7C%20Txt%20~%20Developer%20Tools%20~%20Cloud%20SDK_cloud%20sdk-general%20-%20Products-44225-KWID_43700060418855956-kwd-76317487932&userloc_1009871-network_g&utm_term=KW_google%20cloud%20sdk&gclid=Cj0KCQjw2NyFBhDoARIsAMtHtZ7hAYsUdZ_i1ZpDiJzjPTrZu0YhEnuo0fQLmG6y56TfIMAKn7DPfSAaAlR4EALw_wcB&gclsrc=aw.ds)를 사용해서 접근할 수 있으며, 간편하게 웹 콘솔을 이용할 수도 있다. 여러 개의 Failure Zone (AWS의 AZ, Available Zone에 대응)에 걸쳐서 워커 노드를 분산시켜 Multizone 클러스터를 구성할 수 있다.

GKE는 클러스터의 워커 노드(Google Compute Engine 인스턴스를 사용)를 기준으로 노드가 생성됐을 때부터 삭제될 때까지 초 단위로 비용을 청구하는 과금 모델을 지원한다.

**AWS EKS (Amazon Elastic Kubernetes Service)**

EKS는 AWS를 통해서 제공된다. GKE와 마찬가지로 인프라 관련 작업은 아마존에서 자동으로 진행되며, AWS 웹 콘솔 및 AWS SDK를 통해서 접근할 수 있다.

다만, 구글의 GKE나 마이크로소프트의 AKS와 비교했을 때 일반적으로 더 많은 비용이 든다고 한다.

### 자체 호스팅을 위한 설치 툴

**kops**

[kops](https://github.com/kubernetes/kops)는 클러스터 구축, 오케스트레이션 뿐만 아니라 프로비저닝까지 직접 수행하는 툴로, 클러스터의 생명주기 전반에 관여하고 있다. 온프레미스 환경보다는 클라우드 환경, 특히 AWS와 GCP에서 쿠버네티스를 직접 구축할 경우에 좋은 선택이 될 수 있다고 한다.

**kubespray**

[kubespray](https://github.com/kubernetes-sigs/kubespray)는 온프레미스 서버에 클러스터 구축하는데 중점을 두고 있으며, 멀티 플랫폼에서의 설치 또한 지원된다. kops와는 다르게 프로비저닝 등을 위해 **Ansible**을 사용하기 때문에, Ansible에 익숙한 경우 편리하다고 한다. 그러나 멀티 플랫폼 환경이 아니라, 하나의 플랫폼만을 사용할 것이라면 kops가 더 유용할 수 있다.

**kubeadm**

[kubeadm](https://github.com/kubernetes/kubeadm)은 위의 다른 툴과는 다르게 인프라를 직접 다루기 보다는, 클러스터의 구축, 부트스트랩에만 관여한다. 대부분의 다른 설치 툴들이 내부적으로 kubeadm을 사용하고 있으므로 쿠버네티스 클러스터의 구축에 있어 가장 기본이 되는 툴이라고 할 수 있다. 온프레미스 서버나 클라우드 인스턴스에 설치하는데 적합하다고 한다. 처음 쿠버네티스를 공부하는 상황이라면 kubeadm을 사용해서 설치하는 것이 도움이 될 것이라고 생각한다.

### 클러스터를 설치하기 전에

쿠버네티스를 설치하기 위해서 각 노드는 다음 조건을 모두 만족해야 한다.

- 각 노드는 **2GB** 이상의 RAM을 갖출 것
- 각 노드는 **2개 이상의 코어**를 가진 CPU를 갖출 것
- 각 노드의 **Swap을 비활성화**할 것

위의 조건들을 모두 만족해야 노드에서 kubelet이 구동될 수 있고, 클러스터에 참여할 수 있다.

### 클러스터 규모 상한선

쿠버네티스 클러스터를 구성하기 위해 노드가 갖춰야 할 최소 조건을 알아봤으니, 클러스터가 가질 수 있는 최대 규모에 대해서도 가볍게 짚고 넘어가려 한다.

v1.21 버전 기준 쿠버네티스는 다음과 같은 규모 제한이 있다. [1]

- 노드 : 최대 5000개
- 노드 당 파드 수 : 최대 100개
- 클러스터 전체 파드 수 : 최대 150,000개
- 클러스터 전체 컨테이너 수 : 최대 300,000개

처음 클러스터를 구축하고 부하 실험을 하던 도중, 노드 당 파드 수 100개 제한에 걸려 파드가 더 생성이 되지 않았었다. 제한이 빡빡하다고 생각했었지만 노드에 fail이 발생했을 경우 100개의 파드에 장애가 생길 수 있다고 생각하니 적절한 제한이라고 느꼈다.

## References

- [https://kubernetes.io/ko/docs/concepts/overview/what-is-kubernetes/](https://kubernetes.io/ko/docs/concepts/overview/what-is-kubernetes/)
- J. Arundel, J. Domingus, Cloud Native DevOps with Kubernetes, O'Reilly Media, 2019.
    - (번역판) 쿠버네티스를 활용한 클라우드 네이티브 데브옵스 (최경현 옮김), 한빛미디어.
- [1] [https://kubernetes.io/ko/docs/setup/best-practices/cluster-large/](https://kubernetes.io/ko/docs/setup/best-practices/cluster-large/)