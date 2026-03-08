# Wave

Discord 서버에서 게임 닉네임을 관리하고  
음성 채널 참여 시 사용자 정보를 자동으로 표시하는  
Node.js 기반 Discord Bot 입니다.


사용자는 자신의 게임 닉네임을 등록하고
서버 내 다른 사용자들과 랭킹을 비교할 수 있습니다.

> **Production 환경에서 1년 6개월 이상 운영 중인 Discord 서비스 봇**
> **40개 이상 Discord 서버에서 사용 중이며 1,000명 이상의 사용자 데이터를 관리하고 있습니다**

**이 프로젝트는 Service / Repository 구조의 백엔드 아키텍처를 적용하여 설계되었습니다.**

---

# 주요 기능

### 음성 채널 자동 프로필 표시

사용자가 음성 채널에 참여하면  
등록된 게임 닉네임 정보가 자동으로 표시됩니다.

Wave는 Discord Voice 이벤트를 감지하여  
사용자의 게임 정보를 임베드 형태로 채널에 표시합니다.

기능

- 음성 채널 입장 시 자동 프로필 생성
- 등록된 게임 닉네임 자동 표시
- 게임 프로필 링크 제공

---

### 음성 채널 자동 정리

사용자가 음성 채널에서 퇴장하면  
해당 사용자의 프로필 임베드는 자동으로 삭제됩니다.

또한 채널 상태를 확인하여  
남아 있는 오래된 임베드도 자동으로 정리합니다.

기능

- 음성 채널 퇴장 시 임베드 자동 삭제
- 채널 상태와 메시지 동기화
- 오래된 임베드 자동 정리

---

### 닉네임 등록

사용자는 자신이 플레이하는 게임의 닉네임을 등록할 수 있습니다.

* `/닉네임등록`
* 게임 선택 → 닉네임 입력

---

### 닉네임 삭제

등록된 닉네임을 삭제할 수 있습니다.

* `/닉네임삭제`

---

### 서버 랭킹 조회

서버 사용자들의 게임 랭킹을 확인할 수 있습니다.

* `/랭킹`
* 게임 선택 → 랭킹 출력

---

### 서버 자동 설정

관리자가 `/셋업` 명령어를 실행하면 Wave 전용 채널이 자동 생성됩니다.

생성되는 채널

* 메인 채널
* 관리자 채널

---

# 시스템 아키텍처

Wave는 Discord 이벤트를 기반으로 동작하며  
Command / Service / Repository 구조로 설계되었습니다.

```
Discord Interaction
        ↓
Commands / Voice Events
        ↓
Modules / Handlers
        ↓
Service Layer
        ↓
Cache Layer
        ↓
Repository Layer
        ↓
MongoDB
```

---

# 프로젝트 특징

## Event Driven Feature

Discord Voice 이벤트를 활용하여
사용자의 음성 채널 상태 변화에 따라
프로필 정보를 자동으로 표시하고 정리합니다.

* 음성 채널 입장 시 사용자 프로필 자동 표시
* 음성 채널 퇴장 시 임베드 자동 정리
* 채널 상태와 메시지 자동 동기화

---

## Backend Architecture

Command / Service / Repository 구조를 적용하여
비즈니스 로직과 데이터 접근 로직을 분리했습니다.

* Service Layer
* Repository Pattern
* DTO 구조
* Cache Layer

---

## Performance Optimization

사용자 정보와 길드 설정을 캐싱하여
불필요한 데이터베이스 조회를 최소화했습니다.

* User Cache
* Guild Cache

---

## Production Operation

Wave 봇은 실제 Discord 서버에서

* 40개 이상의 Discord 서버에서 사용 중
* 1,000명 이상의 사용자 데이터 관리
* 1년 6개월 이상 운영 및 유지보수
* AWS EC2 + Docker 환경에서 서비스 운영

---

# 기술 스택

## Backend

* Node.js
* Discord.js

## Database

- MongoDB

## Infrastructure

* AWS EC2
* Docker

## Architecture

- Service Layer
- Repository Pattern
- Cache Layer
- DTO Pattern

---

# 프로젝트 구조

```
src
 ├ commands
 ├ events
 ├ services
 ├ repositories
 ├ modules
 ├ dtos
 ├ constants
 ├ utils
 └ mongoDB
```
---

# 향후 개선

* API 서버 구축
* 테스트 코드 추가
* 웹 대시보드 개발

---

# 제작자

**Woohahang**

Node.js Backend Developer

- Discord Bot "Wave" 개발
- MongoDB 기반 데이터 관리
- Service / Repository 아키텍처 설계

