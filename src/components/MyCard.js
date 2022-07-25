import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const MyCard = ({ cardIndex, select, val, styles }) => {
  const click = () => {
    select(cardIndex);
  };

  return (
    <Card
      onClick={click}
      className={val === cardIndex ? styles.SelectedItem : styles.Item}
    >
      <Card.Header>
        <Card.Title>{cardIndex}</Card.Title>
      </Card.Header>
      <Card.Body>영상</Card.Body>
    </Card>
  );
};

MyCard.propTypes = {
  cardIndex: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired,
};

export default MyCard;
