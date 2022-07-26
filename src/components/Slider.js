import ReactSlider from "react-slider";
import PropTypes from "prop-types";
import "../styles/Slider.css";

const Slider = ({ currentValue, setCurrentValue }) => {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ maxWidth: "810px", margin: "auto" }}>
        <h6 style={{ float: "left" }}>1번</h6>
        <h6 style={{ float: "right" }}>2번</h6>
      </div>
      <br />
      <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        min={1}
        max={99}
        value={currentValue}
        onChange={(value) => setCurrentValue(value)}
      />
      <br />
    </div>
  );
};

Slider.propTypes = {
  currentValue: PropTypes.number.isRequired,
  setCurrentValue: PropTypes.func.isRequired,
};

export default Slider;
