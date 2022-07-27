import React from "react";
import SliderQuestion from "../components/SliderQuestion";
import ChoiceQuestion from "../components/ChoiceQuestion";

function QuestionType({ onChange, index, qArr }) {
  return (
    <>
      {qArr[index].type === "ahp" ? (
        <SliderQuestion
          onChange={onChange}
          index={index}
          text={qArr[index].text}
          val={qArr[index].val}
          img={qArr[index].img}
        />
      ) : (
        <ChoiceQuestion
          onChange={onChange}
          index={index}
          text={qArr[index].text}
          val={qArr[index].val}
          img={qArr[index].img}
        />
      )}
    </>
  );
}

export default QuestionType;
