import { useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "@react-hook/media-query";
import { motion, useMotionValue, useTransform } from "framer-motion";
import storageKeys, { getStorage, setAnswer } from "~/utils/localStorage";

type Props = {
  questionIndex: number;
  initialValue?: number;
};

const Wrapper = styled.div`
  display: flex;
  height: 11rem;
  width: 51rem;
  margin: auto;
  align-items: center;
  justify-content: center;
  border-radius: 500px;
  background-color: #e3e3e3;
  @media (max-width: 400px) {
    width: 306px;
    height: 66px;
  }
`;

const Handle = styled(motion.div)`
  width: 10rem;
  height: 10rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 100%;
  @media (max-width: 400px) {
    width: 60px;
    height: 60px;
  }
`;

const Slider = ({ questionIndex, initialValue }: Props) => {
  const media = useMediaQuery("only screen and (min-width: 400px)");
  const range = media ? 320 : 120;

  const xRange = [-range, 0, range];
  const x = useMotionValue(initialValue ?? 0);
  const scale = useTransform(x, xRange, [1, 0.3, 1]);
  const colors = useTransform(x, xRange, [
    "rgb(16, 152, 43)",
    "rgb(151, 151, 151)",
    "rgb(119, 0, 152)",
  ]);

  useEffect(() => {
    const unsubscribe = x.onChange((latest) => {
      const score =
        latest < -1
          ? ((1 / latest) * range) / 9
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
    </Wrapper>
  );
};

export default Slider;
