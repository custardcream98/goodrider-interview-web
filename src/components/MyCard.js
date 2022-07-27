import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";

const MyHeader = styled(Card.Header)`
  padding-bottom: 1px;
  padding-top: 1px;
  .card-title {
    margin-bottom: 0px;
  }
`;

const MyCard = ({ cardIndex, select, val, styles }) => {
  const click = () => {
    select(cardIndex);
  };

  return (
    <Card
      onClick={click}
      className={val === cardIndex ? styles.SelectedItem : styles.Item}
    >
      <MyHeader>
        <Card.Title>{cardIndex}</Card.Title>
      </MyHeader>
      <Card.Body>영상</Card.Body>
    </Card>
  );
};

MyCard.propTypes = {
  cardIndex: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired,
};

export default MyCard;
