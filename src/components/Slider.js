import ReactSlider from "react-slider";
import PropTypes from "prop-types";
import "./Slider.css";

const Slider = ({ currentValue, setCurrentValue }) => {
    return (
        <div style={{ width: "100%" }}>
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
