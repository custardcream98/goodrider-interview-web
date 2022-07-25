import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const MyCard = ({ index, select, className }) => {
  const click = () => {
    select(index);
  };

  return (
    <Card onClick={click} className={className}>
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
