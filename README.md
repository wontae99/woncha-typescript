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
- 큰 프로젝트일 수록 타입 정리를 위해 typescript가 용이할 것이라는 생각이 드는 계기가 됨.

<br><br>

### content source(movie api) : https://developer.themoviedb.org/reference/

<br/><br/>

# `v2.0` 개선 사항들 (10/16)

## 페이지 구조 개선

**유저 페이지 url 및 데이터 패칭 개선**

유저 데이터가 포함된 페이지에서 이전에 유저 데이터를 서버 사이드에서 프리 패칭하였기에 url param에서 유저 id를 받아와 백앤드(mongodb)에서 데이터를 받아 왔다.

➡️ url에 유저의 mongodb id가 표기되어 지저분해 보임.

하지만 유저 개인 데이터는 SEO가 필요없고 좀 더 빠르게 상호작용하는 이점을 가져가지 위해 데이터를 클라이언트 사이드로 패칭하도록 함.

➡️ url에 더 이상 id가 표기 되지 않고 데이터 입출력(watch list 추가/삭제) 시 상호작용도 더 빨라짐.

추가로 유저 페이지에서 `my-list`에서 와치 리스트 타입을 `useState`로 상태 제어를 했던 것을, url query에 `type` 파라미터를 추가하여 상태 제어를 하도록 수정. (`my-review` 페이지에서도 마찬가지로 리뷰가 5개를 넘어갈 시 다음 리뷰 페이지를 `page` 파라미터로 url에 표기되도록 설정)

➡️유저가 새로고침을 하더라도 같은 UI 페이지를 유지. 이전 UI를 보기위해 backspace 버튼을 사용할 수 있다.

<br/>

## 코드 리팩토링 및 컴포넌트 분리

- 중구 난방으로 분류되었던 컴포넌트들을 분리 및 위치 수정
- 코드에 typescript로 타이핑 추가.
- 일부 페이지/컴포넌트들에 `semantic markup`에 준수하도록 수정하여 적용.

<br/>

## url 개선

- **movie, tv 페이지**

콘텐츠의 id에 따라 동적으로 라우팅되는 페이지에 `getStaticProps`를 정의해 줌에 따라 static한 path 설정이 필요해짐
따라서, 이전에 작성했던 리뷰나 추가한 영화들을 찾아볼 시 모든 콘텐츠들을 path에 추가하지 않는 이상 더 이상 볼 수 없게됨.

➡️ `getStaticPaths`의 `fallback`프로퍼티를 `blocking`으로 설정함으로써 홈페이지나 movie, tv 페이지에 외의 컨텐츠 페이지도 페이지 `request` 발생시 이후 `request`부터 페이지가 pre-render되게 함.

<br/>

## UI 개선

- my-list 페이지에서도 와치 리스트의 콘텐츠들을 리스트에서 삭제할 수 있게 설정
- 다크 모드가 적용되지 않던 일부 텍스트, 마크업 수정
- 네비게이션 바가 스크롤 시 fade in/out 되도록 수정
- 카루젤 페이지가 4초마다 자동으로 다음 페이지로 넘어가도록 설정
- 반응형 웹페이지 - 작은 화면에서 네비게이션 바(상/하단) 및 콘텐츠 페이지 ui 개선

<br/>

## 버그 수정

- `watch list` 추가/삭제시 `notification` 메시지가 반대로 뜨는 현상 수정 : `redux`에서 리스트 토글로 추가 삭제하던 함수를 분리하여 추가/삭제시 마다 알림 메시지를 따로 설정.

<br/><br/>

# `v2.1` 추가 개선

## 추가 컨텐츠 패칭

[blog](https://wontae99.vercel.app/blog/NextJS/infinite-scroll)

- 홈페이지 및 Movie, TV show 페이지 에서 `View all` 버튼을 누를 시 추가로 더 많은 컨텐츠들을 볼 수 있는 페이지 추가.
- 해당 페이지에 무한 스크롤 기능 추가 
  - 스크롤을 내려 화면 하단에 도달할 시, 자동으로 컨텐츠 데이터를 추가로 패칭함.