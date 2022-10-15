# week3_board
22.10.01
1. schemas에 unique 해제 및 mongodb의 인덱스 삭제. Mongo Server Error: E11000 duplicate key error 오류 해결
2. 모든 기능 정상 구동 확인 완료. 
3. 개인과제 1차 완성 확인.

22.10.03
1. AWS EC2 인스턴스 생성 후, 서버 실행하기 위해 ubuntu에 git clone 하려 했으나, private으로 설정되어 있어서 아이디, 비번 요구함. 
2. 그래서 public으로 변경하려하니, schemas 폴더 내 index에 내 몽고db 개인 url을 넣어놔서 노출 위험 (경고 이메일도 받음) 
3. 어쩔 수 없이 studio 3T 이용하는 local2 27017 db로 다시 재변경함. 
4. 그런데 테스트 해보니 이번에는 index문제가 발생하지 않음 
5. 즉, 내 mongodb 아틀라스 연결해서 index 삭제 작업을 최초 한 번만 진행해주면, 그 이후로는 local27017 연경 후 studio 3T 써도 인덱스 문제 발생하지 않는 것 같음. 
6. 어쨋든 db 주소 변경하고, git push 후 깃헙 public으로 변경함. 
7. 이제 ubuntu에 git clone 하고 서버 실행해 볼 예정 


22. 10. 10
1. mongoDB --> mySQL 변경
2. ORM은 Mongoose --> Sequelize 변경
3. migration 및 model 생성 (+테이블/컬럼 추가에 따른 sequelize 명령어 이용하여 삭제 및 추가생성,수정)
4. database 및 ORM 변경에 따른 기존 코드 모두 수정 (DB 참조 시 WHERE 절, delete-->destroy 등)
5. 기존 코드에 예외처리 삽입 (if..return / try catch 등)
6. 회원가입 API 작성 (Joi Library 이용, Validation Middleware 이용, 회원가입 API 접속 시 validation 파일 반드시 거치고 프로세스 종료 후 next() 로 다시 원래 api 복귀)
7. 로그인 API 작성 (authMiddleware 이용, JWT 타입의 token 발급, 로그인 된 상태에서 접근가능한 API에 authMiddleware 삽입)
8. 사용자 인증 (마이페이지 접속 시 res.locals 이용하여 나의 user정보 반환, 로그인 필요한 api 접근 시 headers의 토큰 확인)
9. 좋아요 기능 (PUT Method를 이용하여 하나의 api안에서 좋아요반영 및 좋아요취소 모두 구현. )
10. 데이터베이스 운용: 총 테이블 4개 (User2s, Posts, Comments, Likes)