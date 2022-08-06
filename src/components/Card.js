import { useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";

const SpinnerBox = styled.div`
  top: 50%;
  transform: translateY(-50%);
  position: relative;
  height: 33px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardBody = styled(Card.Body)`
  padding: 0;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const MyHeader = styled(Card.Header)`
  padding-bottom: 1px;
  padding-top: 1px;
  .card-title {
    margin-bottom: 0px;
  }
`;

const MyCard = ({ cardIndex, select, val, styles, imgSrc }) => {
  const [loading, setLoading] = useState(true);

  const imgLoaded = () => setLoading(false);

  const click = () => {
    select(cardIndex);
  };

  return (
    <Card
      onClick={click}
      className={styles.Item}
      id={val === cardIndex ? styles.Selected : ""}
    >
      <MyHeader>
        <Card.Title>{cardIndex}</Card.Title>
      </MyHeader>
      <CardBody>
        <SpinnerBox>
          <Spinner
            as="p"
            animation="border"
            role="status"
            className={`${loading ? "" : "visually-hidden"}`}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerBox>
        <Img
          className={loading ? "visually-hidden" : ""}
          src={`http://localhost:3000/${imgSrc}`}
          onLoad={imgLoaded}
        />
      </CardBody>
    </Card>
  );
};

MyCard.propTypes = {
  cardIndex: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired,
};

export default MyCard;
