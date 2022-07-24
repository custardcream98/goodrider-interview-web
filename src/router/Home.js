import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const onClick = () => navigate("/interview");
  return (
    <div className="p-2">
      <h1>착한 이륜차 설문조사</h1>
      <Button variant="primary" className="btn-sm" onClick={onClick}>
        설문 시작
      </Button>
    </div>
  );
}

export default Home;
