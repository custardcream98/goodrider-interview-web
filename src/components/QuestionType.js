import React from "react";
import SliderQuestion from "../components/SliderQuestion";
import ChoiceQuestion from "../components/ChoiceQuestion";

function QuestionType({ onChange, index, qArr }) {
  return (
    <>
      {qArr[index].type === 0 ? (
        <SliderQuestion
          onChange={onChange}
          index={index}
          text={qArr[index].text}
          val={qArr[index].val}
        />
      ) : (
        <ChoiceQuestion
          onChange={onChange}
          index={index}
          text={qArr[index].text}
          val={qArr[index].val}
        />
      )}
    </>
  );
}

export default QuestionType;
