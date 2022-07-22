import ReactSlider from "react-slider";
import PropTypes from "prop-types";
import "./Slider.css";
import { useEffect } from "react";

const Slider = ({ currentValue, setCurrentValue, index, val }) => {
    useEffect(() => {
        setCurrentValue(val>=1 ? (val-1)*7 + 50 : -(((1/val) - 1)*7) + 50);
    }, [index]);

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
