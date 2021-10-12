# [Wiken](https://wiken.io)

위캔, We Can!

Spring Boot WebMVC를 기반으로 한 오픈소스 블로그 서비스

## 개발환경

vscode의 docker devcontainer를 지원합니다.

### 개발 중 실행

1. `tasks.json`에 명시된 대로 `$ ./mvnw compile`을 통해서 소스코드를 컴파일합니다.
2. `launch.json`에 명시된 대로 Spring Boot를 실행합니다. 위에서 언급한 `compile` task를 의존합니다.
3. `$ npm run dev`를 통해서 tailwind css와 react js를 제공하는 서버를 켜줘야만 합니다.