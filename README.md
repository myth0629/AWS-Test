# 도서관 대출 관리 시스템

React로 구현한 과제용 도서관 대출 관리 웹시스템입니다. 도서 검색, 대출, 반납, 대출 현황 확인 기능을 한 화면에서 사용할 수 있으며, 브라우저 `localStorage`를 활용해 새로고침 후에도 대출 상태가 유지됩니다.

## 주요 기능

- 전체 도서 수, 대출 가능 도서 수, 대출 중 도서 수 요약
- 제목, 저자, 분야 기준 도서 검색
- 도서별 대출 및 반납 처리
- 현재 대출 중인 도서 목록 확인
- `localStorage` 기반 대출 상태 저장

## 실행 방법

```bash
npm install
npm run dev
```

빌드 확인:

```bash
npm run build
```

## GitHub Actions CI/CD

이 저장소는 `.github/workflows/deploy.yml`을 통해 `main` 브랜치에 push될 때 자동으로 React 앱을 빌드하고 AWS S3 버킷에 배포합니다.

Workflow 동작 순서:

1. GitHub repository source checkout
2. Node.js 20 환경 설정
3. `npm ci`로 의존성 설치
4. `npm run build`로 Vite React 앱 빌드
5. AWS Academy 인증 정보 설정
6. `dist/` 폴더를 S3 버킷에 동기화

GitHub repository Secrets에 아래 값을 등록해야 합니다.

| Secret 이름 | 설명 |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | AWS Academy Access Key |
| `AWS_SECRET_ACCESS_KEY` | AWS Academy Secret Access Key |
| `AWS_SESSION_TOKEN` | AWS Academy Session Token |
| `AWS_REGION` | AWS Region, 예: `us-east-1` |
| `S3_BUCKET` | 정적 웹사이트 호스팅용 S3 Bucket 이름 |

AWS Academy 세션 토큰은 제한 시간이 있으므로 시연 전에 `AWS_SESSION_TOKEN`을 최신 값으로 다시 등록해야 합니다.

## AWS Amplify 호스팅

과제 1에서 사용한 GitHub repository를 AWS Amplify에 연결하여 같은 React 앱을 바로 호스팅합니다.

Amplify 빌드 설정:

- Build command: `npm run build`
- Install command: `npm ci`
- Output directory: `dist`

저장소에는 Amplify 자동 인식을 위한 `amplify.yml`도 포함되어 있습니다.

## 배포 URL

- AWS S3 URL: `여기에 S3 정적 웹사이트 URL 작성`
- AWS Amplify URL: `여기에 Amplify 배포 URL 작성`

## 시연 영상

- GitHub Actions CI/CD 구축 시연: `여기에 YouTube 링크 작성`
- AWS Amplify 서비스 활용 시연: `여기에 YouTube 링크 작성`

## 과제 체크리스트

- [x] React로 동작하는 도서관 대출 시스템 구현
- [x] GitHub Actions 배포 workflow 작성
- [x] AWS Academy Secret 사용 구조 반영
- [x] AWS Amplify 빌드 설정 작성
- [x] README에 시스템, 기능, CI/CD, Amplify 설명 작성
- [ ] GitHub repository 생성 및 code push
- [ ] GitHub Secrets 등록
- [ ] S3 URL 확인 후 README 업데이트
- [ ] Amplify URL 확인 후 README 업데이트
- [ ] YouTube 시연 영상 링크 README 업데이트
