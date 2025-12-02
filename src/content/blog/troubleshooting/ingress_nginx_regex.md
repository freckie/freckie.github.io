---
title: 'Ingress에 정의된 path에 regex 사용시 라우팅되지 않던 이슈'
date: 2024-02-18 21:48:00
category: 'Troubleshooting'
draft: false
---
## 문제 상황

`Ingress.yaml`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  namespace: mynamespace
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/use-regex: "true"
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
    - http:
        paths:
          - path: "/api(/|$)(.*)"
            pathType: Prefix
            backend:
              service:
                name: api-spring-service
                port:
                  number: 80
```

### 표면적으로 보이던 에러 상황

- 프론트엔드에서 `/api/*`로의 모든 request가 404 에러 발생
    - request가 도착해야할 pod에 어떠한 로그도 찍히지 않았다.
    - 다만, ingress-nginx-controller 로그에는 request가 도착했고 404를 돌려줬다는 로그가 찍혔다.
- 여기서, 다음 상황이라고 추측했다.

```
프론트엔드 → ingress-nginx-controller —(연결 두절?)→ 백엔드 service → pod
```

### 원인 추적

- Ingress를 살짝 바꿔 적용 후 ingress-nginx-controller 로그를 살펴봄.
    
    ```
    I0216 08:16:46.523876       7 main.go:100] "successfully validated configuration, accepting" ingress="mynamespace/api-ingress"
    
    I0216 08:16:46.529334       7 store.go:434] "Found valid IngressClass" ingress="mynamespace/api-ingress" ingressclass="nginx"
    
    W0216 08:16:46.529372       7 store.go:869] ingress mynamespace/api-ingress contains invalid path /api(/|$)(.*)
    ```
    
    - ingress가 변경된 후, controller에서 변경을 감지해 reconcile하는 과정에서 path가 잘못되었다고 얘기하고 있다.
    - 에러도 아니고 경고였기 때문에 무시하고 지나쳤지만.. 해당 path는 아예 라우팅을 못해준다는 상황을 겨우 경고로 내뱉다니?

- 이전에 성공적으로 동작하던 클러스터와 동작하지 않는 클러스터의 ingress-nginx-controller 이미지를 비교해봤다.
    - 이전 클러스터 (동작O) : `registry.k8s.io/ingress-nginx/controller:v1.6.4`
        
        ![20240218-1.png](/images/20240218-1.png)    
        
    - 지금 클러스터 (동작X) : `registry.k8s.io/ingress-nginx/controller:v1.6.3`
        
        ![20240218-2.png](/images/20240218-2.png)    
    
    - 태그의 마이너 버전이 하나가 다운그레이드 된 것.

- 현재 클러스터는 ingress-nginx-controller를 다음 가이드대로 설치하고 있다.
    
    ```bash
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/baremetal/deploy.yaml
    ```
    
    - yaml 파일의 브랜치도 controller-v1.6.4로 설정돼있으니 설치되는 것들도 동일하다 판단했으나, 실제로 구동된 이미지의 버전이 달랐다.

### 원인

- ingress-nginx 리포지토리가 v1.6.3 → v1.6.4로 업데이트될 때, controller 부분에 변경사항이 있었다. ([이슈 #9626](https://github.com/kubernetes/ingress-nginx/pull/9626/files#diff-5f4da05f4716a8d567db533819486a784e3f4993c11021da3b569564c78a5935L868))
    - 1.6.4에선 다음 코드가 삭제됐다. (L868)
        
        ```go
        if !ingressutils.IsSafePath(copyIng, path.Path) {
            klog.Warningf("ingress %s contains invalid path %s", key, path.Path)
            return
        }
        ```
        
    - ingress path를 검증하고 warning을 내뱉는 코드로, 위에서 발생했던 로그와 일치한다.

- 해당 검증 코드가 문제를 일으켰는지 1.6.4에서 검증이 제거됐고, v1.6.4를 설치한 기존 클러스터는 잘 동작한 것.
- 다만 무슨 이유에서인지 deploy.yaml 파일에 이미지들의 버전이 1.6.3으로 변경됐고, 오류가 있는 검증 코드가 동작하게 된 것이다.

![20240218-3.png](/images/20240218-3.png)    

## 해결 방법

- 딱히 ingress-nginx-controller 버전에 민감한 클러스터나 프로젝트가 아니었기 때문에, 바로 윗 버전인 v1.7.0으로 업데이트했다.

**느낀 점**

- 웹에 있는 yaml 파일은 static 하지 않다.. 같은 파일인 듯 해도 언제든지 바뀔 수 있었다.