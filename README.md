# DEMO

https://woncha.vercel.app/

<br>

# 개발 목표

**nextJS** 를 사용하여 SSR 웹사이트를 구축하고, tailwind css를 사용하여 다양한 컴포넌트들과 반응형 웹사이트를 구축.

**next-auth** 를 사용하여 웹사이트 자체 아이디 뿐만 아니라 카카오/구글 계정과 연동한 로그인 방식 구현.

**mongoDB** 백앤드를 기반으로 comment CRUD시스템 구현, react context와 **redux-toolkit** 을 사용하여 ui 및 content 즐겨찾기 기능 등의 app state 제어.

23.07
typescript로 migration 작업

<br>

# 기술 스택

<div align="center">
	<img src="https://img.shields.io/badge/Javascript-007396?style=flat&logo=javascript&logoColor=#000" />
	<img src="https://img.shields.io/badge/React-3e5661?style=flat&logo=react&logoColor=#000" />
    <img src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=#000" />
    <img src="https://img.shields.io/badge/NextJS-000000?style=flat&logo=nextdotjs&logoColor=#fff" />
    <img src="https://img.shields.io/badge/Vercel-black?style=flat&logo=vercel&logoColor=#fff" />
    <img src="https://img.shields.io/badge/TailwindCss-3e5661?style=flat&logo=tailwindcss&logoColor=#fff" />
    <img src="https://img.shields.io/badge/MongoDB-3e6141?style=flat&logo=mongodb&logoColor=#fff" />
</div>
<br>

# Features & Functions

## - **반응형 ui**

큰 화면
![home-lg](https://github.com/wontae99/nextjs-movie-project/assets/109476712/75c8e580-1058-48e5-8c2e-9906c77b91b5)

![content-lg](https://github.com/wontae99/nextjs-movie-project/assets/109476712/c2da029c-e5e1-42b7-9d29-f38f228a214b)

작은 화면<br>
<img src="https://github.com/wontae99/nextjs-movie-project/assets/109476712/8f663227-5f4a-4a21-b647-d349f6bab485" width="300" height="565">

<img src="https://github.com/wontae99/nextjs-movie-project/assets/109476712/80d1f63f-333e-410d-85ec-335a2a22c099" width="300" height="565">

<br>

## - **dark/light mode**

![toggle-mode](https://github.com/wontae99/nextjs-movie-project/assets/109476712/f9f067d8-e7ea-40a4-9a96-4003d3678d52)
<br><br>

## - **autocomplete search**

![autocomplete](https://github.com/wontae99/nextjs-movie-project/assets/109476712/be789bd9-742b-4954-bddb-0b9d400c3391)
<br>
mui의 autocomplete 기능을 사용하여 content 제목들의 키워드를 통하여 자동완성 기능 구현
<br><br>

## - **로그인 시스템**

![mongoDB](https://github.com/wontae99/nextjs-movie-project/assets/109476712/ec14f501-db74-4edf-a2dc-856341e7ba54)
<br>
웹사이트 계정 생성시 password 해쉬&솔팅 후 mongoDB에 저장.
<br><br>

![login-credential](https://github.com/wontae99/nextjs-movie-project/assets/109476712/9a18d7d3-74f0-4720-9ea1-eb835386db50)
<br>웹 어플리케이션 credential로 로그인
<br><br>

![login-kakao](https://github.com/wontae99/nextjs-movie-project/assets/109476712/04266963-a4c6-4fc8-9a8f-f0f8091f9d4b)
<br>kakao 계정으로 로그인
<br><br>

![login-google](https://github.com/wontae99/nextjs-movie-project/assets/109476712/f020c25c-e400-4f6e-9874-e85c6577e14e)
<br>google계정으로 로그인

<br>

## - **Redux를 이용한 상태관리**

![toggle-fav](https://github.com/wontae99/nextjs-movie-project/assets/109476712/8177550f-a0b0-4607-8022-d8ccccd25c2f)
<br>
컨텐츠 즐겨찾기 및 알림 메시지를 redux로 state관리 / backend와 연결하여 CRUD 기능 구현.
<br><br>

## - **mongodb 백앤드를 기반한 comment**

![comment](https://github.com/wontae99/nextjs-movie-project/assets/109476712/ba6a44fb-bf23-4c34-b4c0-476d832bd9b1)

![comment-data](https://github.com/wontae99/nextjs-movie-project/assets/109476712/e6e809d5-e74e-408e-8992-27b36daaa2b2)

<br><br>

# 개선 사항

- 작업이 진행될 수록 프로젝트 크기가 커짐에 따라 코드양이 많아지게 되어 좀더 깔끔한 코드 정리가 필요해짐.
- 큰 프로젝트일 수록 typescript가 용이할 것이라는 생각이 드는 계기가 됨.

<br><br>

### content source(movie api) : https://developer.themoviedb.org/reference/
