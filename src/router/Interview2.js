import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Choice from "../components/Choice";

function Interview() {
  const [qArr, setQArr] = useState([
    {
      text: "다음 중 하나의 영상을 선택하세요.",
      val: 0, // 1/8 <= val <= 8
    },
    {
      text: "다음 중 하나의 영상을 선택하세요.",
      val: 0,
    },
    {
      text: "다음 중 하나의 영상을 선택하세요.",
      val: 0,
    },
  ]);

  const [currentlyShownQindex, setCurrentlyShownQindex] = useState(0);

  const setQval = (numOfQ, val) =>
    setQArr((priv) => {
      priv[numOfQ].val = val;
      //   .forEach((question, index) => {
      //   if (index === numOfQ) {
      //     question.val = val;
      //   }
      // });
      return [...priv];
    });

  const onChange = (index, val) => setQval(index, val);

  const onClick = (event) => {
    const { name } = event.target;
    switch (name) {
      case "priv":
        setCurrentlyShownQindex((priv) => --priv);
        break;
      case "next":
        setCurrentlyShownQindex((priv) => ++priv);
        break;
    }
  };

  return (
    <>
      <h1>착한 이륜차 설문조사</h1>
      <Choice
        onChange={onChange} 
        index={currentlyShownQindex}
        text={qArr[currentlyShownQindex].text}
      />
      <div className="pb-4">selected: {qArr[currentlyShownQindex].val}</div>
      <div className="d-flex justify-content-center mb-4">
        <ButtonGroup>
          <Button
            variant="primary"
            className="btn-sm"
            onClick={onClick}
            name="priv"
            disabled={currentlyShownQindex === 0}
          >
            {"< 이전 질문"}
          </Button>
          <Button
            variant="primary"
            className="btn-sm"
            onClick={onClick}
            name="next"
            disabled={currentlyShownQindex === qArr.length - 1}
          >
            {"다음 질문 >"}
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}

export default Interview;
