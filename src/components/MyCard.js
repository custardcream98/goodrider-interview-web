import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const MyCard = ({ index, select, val, styles }) => {
  const click = () => {
    select(index);
  };

  return (
    <Card
      onClick={click}
      className={val === index ? styles.SelectedItem : styles.Item}
    >
      <Card.Header>
        <Card.Title>{index}</Card.Title>
      </Card.Header>
      <Card.Body>영상</Card.Body>
    </Card>
  );
};

MyCard.propTypes = {
  index: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired,
};

export default MyCard;
