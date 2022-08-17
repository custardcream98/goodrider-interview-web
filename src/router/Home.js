import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const onClick = () => navigate("/interview");
  return (
    <div className="d-flex justify-content-center align-items-center flex-column vw-100 vh-100">
      <h1 className="fs-1 mb-5">착한 이륜차 설문조사</h1>
      <Button variant="primary" className="btn-sm" onClick={onClick}>
        설문 시작
      </Button>
    </div>
  );
}

export default Home;
