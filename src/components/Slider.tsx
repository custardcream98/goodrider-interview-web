import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useMediaQuery } from "@react-hook/media-query";
import { getAnswer, setAnswer } from "~/utils/localStorage";

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
`;

const Wrapper = styled.div`
  margin: auto;
  position: relative;
  /* z-index: 1; */
  height: 70px;
  width: 600px;
  margin: auto;
  background-color: #e5eeec;
  border-radius: 100px;
`;

/**
 * 로직은 아직 덜짬
 */

type Props = {
  questionIndex: string;
};

const InputRange = styled.input`
  position: relative;
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;

  height: 100%;
  width: 100%;
  margin: auto;
  padding: 5px;
  background-color: transparent;
  /* background-color: #e5eeec;
  border-radius: 100px; */

  z-index: 20;
  @media (max-width: 400px) {
    width: 306px;
    height: 66px;
  }

  outline: none;
  /* opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s; */

  --ThumbColor: rgb(151, 151, 151);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 60px;
    height: 60px;
    background-color: var(--ThumbColor);
    border-radius: 100%;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 60px;
    height: 60px;
    background-color: var(--ThumbColor);
    border-radius: 100%;
    cursor: pointer;
  }

  &:hover {
    opacity: 1;
  }
`;

type Color = {
  red: number;
  green: number;
  blue: number;
};

const green: Color = { red: 16, green: 152, blue: 43 };
const gray: Color = { red: 151, green: 151, blue: 151 };
const red: Color = { red: 119, green: 0, blue: 152 };

function colorInterpolated(x: number): string {
  let res = { red: 0, green: 0, blue: 0 };

  Object.keys(gray).forEach((c) => {
    const color = x <= 50 ? green : x >= 51 ? red : 0;
    if (color === 0) return `rgb(${gray.red},${gray.green},${gray.blue})`;

    const denominator = Math.abs(color[c] - gray[c]);
    res[c] = Math.round(
      x <= 50
        ? (denominator * (50 - x)) / 50 + Math.min(gray[c], color[c])
        : x >= 51
        ? (denominator * (x - 50)) / 50 + Math.min(gray[c], color[c])
        : gray[c]
    );
  });
  console.log(`rgb(${res.red},${res.green},${res.blue})`);
  return `rgb(${res.red},${res.green},${res.blue})`;
}

const Slider = ({ questionIndex }: Props) => {
  const media = useMediaQuery("only screen and (min-width: 400px)");
  const range = media ? 265 : 120;
  const handle = useRef<HTMLInputElement>(null);

  const xRange = [0, range, 2 * range];

  // const x = useMotionValue(range);
  // const colors = useTransform(x, xRange, [
  //   "rgb(16, 152, 43)",
  //   "rgb(151, 151, 151)",
  //   "rgb(119, 0, 152)",
  // ]);

  // useEffect(() => {
  //   const answer = getAnswer(questionIndex);
  //   // x.set(
  //   //   answer
  //   //     ? answer < 1
  //   //       ? -(1 / ((answer * 9) / range))
  //   //       : answer === 1
  //   //       ? 0
  //   //       : (answer * range) / 9
  //   //     : 0
  //   // );

  //   const unsubscribe = x.onChange((latest) => {
  //     const score =
  //       latest < range
  //         ? ((latest / range) * 8) / 9 + 1 / 9
  //         : ((latest - range) / range) * 8 + 1;

  //     console.log(latest);
  //     setAnswer(questionIndex, score);
  //   });

  //   return () => unsubscribe();
  // }, []);

  // const [r, g, b] = [red/y, green/y, blue/y].map(Math.round)
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);

    const val = parseFloat(event.target.value);
    if (val === 50) {
      console.log(1);
    } else if (val < 50) {
      console.log((1 - 1 / 9) * (val / 50) + 1 / 9);
    } else {
      console.log(((val - 50) / 50) * 8 + 1);
    }
    // handle.current.style.setProperty(
    //   "--ThumbColor",
    //   colorInterpolated(parseFloat(event.target.value))
    // );
  };

  return (
    <Wrapper>
      {React.Children.toArray(
        new Array(17).fill(0).map((_, i) => {
          return <Indicator x={(530 * i) / 16 + 35} />;
        })
      )}
      <InputRange ref={handle} type="range" step="0.1" onChange={onChange} />
    </Wrapper>
  );
};

export default Slider;
