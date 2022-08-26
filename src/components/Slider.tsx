import React, { useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "@react-hook/media-query";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { getAnswer, setAnswer } from "~/utils/localStorage";

type Props = {
  questionIndex: string;
};

const Wrapper = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  height: 11rem;
  width: 51rem;
  margin: auto;
  align-items: center;
  justify-content: center;
  @media (max-width: 400px) {
    width: 306px;
    height: 66px;
  }
`;

interface GuideSizeProp {
  size: number;
}

const Guide = styled.div<GuideSizeProp>`
  z-index: 2;
  background-color: #e5e5e5;
  border-radius: 100%;
  width: calc(10rem * ${(props) => props.size});
  height: calc(10rem * ${(props) => props.size});
  @media (max-width: 400px) {
    width: calc(60px * ${(props) => props.size});
    height: calc(60px * ${(props) => props.size});
  }
`;

const Handle = styled(motion.div)`
  z-index: 3;
  position: absolute;
  width: 10rem;
  height: 10rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 100%;
  @media (max-width: 400px) {
    width: 60px;
    height: 60px;
  }
`;

const Slider = ({ questionIndex }: Props) => {
  const media = useMediaQuery("only screen and (min-width: 400px)");
  const range = media ? 320 : 120;

  const xRange = [-range, 0, range];
  const x = useMotionValue(0);
  const scale = useTransform(x, xRange, [1, 0.5, 1]);
  const colors = useTransform(x, xRange, [
    "rgb(16, 152, 43)",
    "rgb(151, 151, 151)",
    "rgb(119, 0, 152)",
  ]);

  useEffect(() => {
    const answer = getAnswer(questionIndex);
    x.set(
      answer
        ? answer < 1
          ? -(1 / ((answer * 9) / range))
          : answer === 1
          ? 0
          : (answer * range) / 9
        : 0
    );

    const unsubscribe = x.onChange((latest) => {
      const score =
        latest < -1
          ? Math.abs(((1 / latest) * range) / 9)
          : latest > 1
          ? (latest * 9) / range
          : 1;

      setAnswer(questionIndex, score);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Wrapper>
      <Handle
        style={{ x, scale, backgroundColor: colors }}
        drag="x"
        dragConstraints={{ left: -range, right: range }}
        dragElastic={0}
        dragMomentum={false}
      />
      <div className="w-full flex items-center justify-between md:p-2 p-3px">
        {React.Children.toArray(
          [1, 0.75, 0.5, 0.75, 1].map((val) => <Guide size={val} />)
        )}
      </div>
    </Wrapper>
  );
};

export default Slider;
