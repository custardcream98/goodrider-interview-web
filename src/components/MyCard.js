import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const MyCard = ({ index, select }) => {
  const click = () => {
    select(index);
  }

  return (
    <Card onClick={click} style={{height: "100%"}}>
      <Card.Header>
        <Card.Title>
          {index}
        </Card.Title>
      </Card.Header>
      <Card.Body className="d-flex justify-content-around ">
        영상
      </Card.Body>
    </Card>
  );
};

MyCard.propTypes = {
  index: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired
};

export default MyCard;
