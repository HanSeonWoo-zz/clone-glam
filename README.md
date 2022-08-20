# clone-glam

App glam clone coding project with React-Native

# 테스트환경

MacBook Pro (Retina, 15-inch, Mid 2015)  
macOS Monterey 버전 12.5  
iPhone X  
iOS 15.6

안드로이드 환경에서는 테스트가 불가할 수 있습니다.  
M1 맥에서도 추가적인 테스트가 필요합니다.

<br/>

# Install

```
yarn install
yarn pod
```

<br/>

# 실행

## 아이폰 실제 기기 (추천)

```
xed ./ios
```

1. 위의 명령어로 XCode 실행
2. 가운데 위에 보이는 "Any iOS Device ..." 부분을 클릭
3. 연결한 아이폰을 찾아서 선택
4. 왼쪽 부분에 재생버튼 클릭(command+R)

<br/>

## 맥북 Simulator

```
xed ./ios
```

1. 위의 명령어로 XCode 실행
2. 가운데 위에 보이는 "Any iOS Device ..." 부분을 클릭
3. iPhone 13(혹은 원하는 모델) 선택
4. 왼쪽 부분에 재생버튼 클릭(command+R)

혹은

```
yarn ios
```

위의 명령어 콘솔에 입력하면 개발모드로 실행 가능

<br/>
<br/>

# 라이브러리 & 스크린샷

## react-navigation

- stack navigation: 앱의 기본적인 navigation을 위해 사용
- tab navigation: 하단 탭을 구성하기 위해 사용

## react-native-tab-view

Home탭에 Glam - 근처 - 라이브 부분을 구현하기 위해 사용

- 화면 슬라이딩 하거나 상단탭을 클릭하여 화면을 이동할 수 있다.

<center><img src = "https://user-images.githubusercontent.com/67218739/185756494-be09e53a-0799-4d9a-861e-040fea500fb2.gif" width="50%" height="50%"></center>

## react-native-fast-image

이미지 캐싱을 지원한다.

## react-native-linear-gradient

카드 구현 시, 배경에 Gradient를 넣기 위해 사용.

<center><img src = "https://user-images.githubusercontent.com/67218739/185757251-7369ddf6-86d5-4f3f-94ce-0852e9179bff.png" width="50%" height="50%"></center>

## react-native-modal

프로필 설정 시, [키, 체형, 학력] 부분의 선택창을 Modal을 통해 구현.

<center><img src = "https://user-images.githubusercontent.com/67218739/185757358-04f666e2-13bd-46a8-a33a-8d6d192088ec.png" width="50%" height="50%"></center>

## axios

API 통신을 위해서 사용.

<br/>

# Troubleshooting
