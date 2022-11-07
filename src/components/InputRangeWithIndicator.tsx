import React, { memo } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  height: 70px;
  width: 100%;
  margin-bottom: 7px;
  background-color: #e5eeec;
  border-radius: 100px;

  z-index: 0;

  @media (max-width: 768px) {
    height: 50px;
  }
`;

interface Position {
  x: number;
}

const Indicator = styled.div<Position>`
  position: absolute;
  top: 20px;
  left: ${(props) => props.x.toString() + "px"};
  width: 4px;
  height: 30px;
  background-color: #cdcdcd;
  border-radius: 2px;
  z-index: 10;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    top: 10px;
  }
`;

const InputRange = styled.input`
  position: relative;
  -webkit-appearance: none;
  appearance: none;

  height: 100%;
  width: 100%;
  margin: auto;
  padding: 5px;
  background-color: transparent;

  z-index: 20;
  outline: none;

  --ThumbColor: rgb(151, 151, 151);

  @media (max-width: 768px) {
    padding: 3px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 60px;
    height: 60px;
    background-color: var(--ThumbColor);
    border-radius: 100%;
    cursor: pointer;
    @media (max-width: 768px) {
      width: 44px;
      height: 44px;
    }
  }
  &::-moz-range-thumb {
    width: 60px;
    height: 60px;
    background-color: var(--ThumbColor);
    border-radius: 100%;
    cursor: pointer;
    @media (max-width: 768px) {
      width: 44px;
      height: 44px;
    }
  }

  &:hover {
    opacity: 1;
  }
`;

interface IProps {
  sliderWidth: number;
  sliderRef: React.MutableRefObject<HTMLInputElement>;
  onChange: () => void;
}

const InputRangeWithIndicator = ({
  sliderWidth,
  sliderRef,
  onChange,
}: IProps) => (
  <Wrapper>
    {React.Children.toArray(
      new Array(9)
        .fill(0)
        .map((_, i) => <Indicator x={(sliderWidth * (i + 1)) / 10} />)
    )}
    <InputRange ref={sliderRef} type="range" step="0.1" onChange={onChange} />
  </Wrapper>
);

export default memo(InputRangeWithIndicator);
