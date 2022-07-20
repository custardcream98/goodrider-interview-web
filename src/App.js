import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import Slider from "./components/Slider";

function App() {
  const [num, setNum] = useState(0);
  const [num2, setNum2] = useState(0);
  const changeNum = () => {
    setNum((priv) => ++priv);
    console.log(num);
  };

  useEffect(() => {
    setNum2(num / 2);
  }, [num, num2]);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <ReactSlider />
      <Slider changeNum={num} num={num} />
      <span>{num2}</span>
    </div>
  );
}

export default App;
