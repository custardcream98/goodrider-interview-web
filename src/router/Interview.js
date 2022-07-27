import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { fetchQuestions } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import QuestionType from "../components/QuestionType";

function Interview() {
  const [qArr, setQArr] = useState([]);
  const [isQloaded, setIsQloaded] = useState(false);
  const [currentlyShownQindex, setCurrentlyShownQindex] = useState(0);

  useEffect(() => {
    (async () => {
      let data = await fetchQuestions();
      data.forEach((e) => (e.type === "ahp" ? (e["val"] = 1) : (e["val"] = 0)));
      console.log(data);

      setQArr((prev) => data);
      setIsQloaded(true);
    })();
  }, []);

  const setQval = (indexOfQ, val) =>
    setQArr((priv) => {
      priv[indexOfQ].val = val;
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
      {isQloaded ? (
        <>
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
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default Interview;
