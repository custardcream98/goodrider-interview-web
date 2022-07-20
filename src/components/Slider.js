import React from "react";
import PropTypes from "prop-types";

const Slider = ({ changeNum, num }) => {
  return <button onClick={changeNum}>버튼 {num}</button>;
};

Slider.propTypes = {
  changeNum: PropTypes.func.isRequired,
  num: PropTypes.number.isRequired,
};

export default Slider;
