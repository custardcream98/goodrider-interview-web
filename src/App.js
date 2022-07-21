import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import { Button } from "react-bootstrap";
import Slider from "./components/Slider";
import styles from "./App.module.css";
import InterviewQuestion from "./components/InterviewQuestion";
<<<<<<< Updated upstream
import Navbar from "./components/Navigation";
=======
import Navbar from "./components/Navigation.js"

>>>>>>> Stashed changes

function App() {
  return (

    <div className="App">
      <Navbar />
<<<<<<< Updated upstream
      <h1>착한 이륜차 설문조사</h1>
      <p>설명ㅇㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㄴㅇㄹ</p>
=======
      <p>설명</p>
>>>>>>> Stashed changes
      <div className={styles.Title}>타이틀</div>
      <InterviewQuestion />
      <Button>버튼</Button>
    </div>
  );
}

export default App;
