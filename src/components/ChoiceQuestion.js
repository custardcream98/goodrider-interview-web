import React, { useState, useEffect } from "react";
import MyCard from "./MyCard";

function ChoiceQuestion({ onChange, index, text }) {
  const select = (selectedNum) => {
    onChange(index, selectedNum);
  }

  return (
    <>
      <h4>
        {text}
      </h4>
      <MyCard index={1} select={select} />
      <MyCard index={2} select={select} />
      <MyCard index={3} select={select} />
      <MyCard index={4} select={select} />
      <MyCard index={5} select={select} />
    </>
  )
}

export default ChoiceQuestion;
