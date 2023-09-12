## .envrc
모두가 taejo-backend를 사용할 때 같은 노드 버전을 사용할 수 있게 해주는 파일입니다.
처음 taejo-backend 폴더에 들어가서 direnv allow를 입력하면 그 후로부터 계속 같은 노드 버전을 사용하게 됩니다. (현재 노드 18)
### direnv 설치 방법
mac
```
brew install direnv
```
linux (ubuntu)
```
apt-get install direnv
```

## .prettierrc
에디터에서 코드 작성시 서로 다른 스타일(세미콜론, 탭, 가로길이 등)을 사용하지 않게 해줘요.

### vscode
이 링크에서 설정하는 법 자세히 설명해주니까 참고하시면 될것 같아요! [link](https://inpa.tistory.com/entry/VS-Code-%E2%8F%B1%EF%B8%8F-%ED%95%9C%EB%B0%A9-%EC%BD%94%EB%93%9C-%ED%8F%AC%EB%A7%B7%ED%84%B0-Prettier-%EB%8F%84%EA%B5%AC-%EC%84%A4%EC%A0%95)

### Webstorm
Preferences -> Tools -> Actions on Save -> Run Prettier 체크 박스 체크하시면됩니다.