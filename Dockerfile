# 1. Node.js 이미지 사용
FROM node:20.12.2

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json 복사 & 의존성 설치
COPY package*.json ./
RUN npm install

# 4. 나머지 파일 복사
COPY . .

# 5. 환경 변수 설정 (선택)
ENV NODE_ENV=production

# 6. 봇 실행 커맨드
CMD ["npm", "start"]