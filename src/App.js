import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import AppRouter from "./router";

import Navbar from "./components/Navigation";



function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 처음 로딩시 Backend로부터 token validation을 받고
    // 통과하면 isLoggedIn = true 아니면 false로 prop 넘겨주기
    setInit(true);
    setIsLoggedIn(true);
  }, []);

  return (

    <div className="App">
      <Navbar />

      <h1>착한 이륜차 설문조사</h1>
      <p>설명ㅇㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㄴㅇㄹ</p>
      <p>설명</p>
      <div className={styles.Title}>타이틀</div>
      <InterviewQuestion />
      <Button>버튼</Button>
    </div>

  );
}

export default App;
