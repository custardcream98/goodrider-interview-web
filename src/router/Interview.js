import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import QuestionType from "../components/QuestionType";
import Navbar from "../components/Navigation";

function Interview() {
  const [qArr, setQArr] = useState([
    {
      type: 0,
      text: "다음 중 더 위험해 보이는 상황쪽으로 슬라이더를 조절해주세요.",
      val: 1, // 1/8 <= val <= 8
    },
    {
      type: 0,
      text: "다음 중 더 위험해 보이는 상황쪽으로 슬라이더를 조절해주세요.",
      val: 1,
    },
    {
      type: 0,
      text: "다음 중 더 위험해 보이는 상황쪽으로 슬라이더를 조절해주세요.",
      val: 1,
    },
    {
      type: 1,
      text: "다음 중 하나의 영상을 선택하세요.",
      val: 0, // 1 ~ 5
    },
    {
      type: 1,
      text: "다음 중 하나의 영상을 선택하세요.",
      val: 0,
    },
    {
      type: 1,
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
      case "#1":
        setCurrentlyShownQindex("0");
        break;
    }
  };

  return (
    <>
      <Navbar setCurrentlyShownQindex={setCurrentlyShownQindex} />
      <QuestionType
        onChange={onChange}
        index={currentlyShownQindex}
        qArr={qArr}
      />
      <div className="pb-4">value: {qArr[currentlyShownQindex].val}</div>
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
