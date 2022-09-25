# pilotProject_PurchaseModule_Payple
--------------------------------------
- Payple을 사용하여 결제모듈에 대한 파일럿 프로젝트
--------------------------------------
- 서버는 Node.js 사용 (express)
- REST API는 axios사용해서 호출
- Key 값은 Redis을 사용해서 set & get. 

--------------------------------
- [x] Node.js initialize
- [x] Test Authentication
- [x] Manage method to keep the data
    - Use Redis to save key data
- [X] Request to open purchase window
    - 약 1시간의 삽질 결과, 해당은 백엔드에서 하는게 아니라,
    프론트에서 Payple에서 지정해준 링크로 쏴주면
    결제와 해당 Response까지 다 해준다.
    백엔드에서 하는게 아니었움...ㅋㅋ
- [x] Test Purchase
- [x] Test Refund
