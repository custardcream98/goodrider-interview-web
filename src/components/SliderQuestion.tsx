import styled from "styled-components";
import Slider from "./Slider";

type Props = {
  questionIndex: string;
  subCriteria1: string;
  subCriteria2: string;
};

const SubCriteriaContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  padding-bottom: 0.5rem;
  width: 51rem;
  @media (max-width: 400px) {
    width: 306px;
  }
`;

const SubCriteria = styled.span`
  width: 50%;
  word-break: keep-all;
  font-weight: 500;
  &:first-child {
    text-align: start;
    padding-right: 0.5rem;
  }
  &:last-child {
    text-align: end;
    padding-left: 0.5rem;
    border-left: 1px solid gray;
  }
  @media (min-width: 400px) {
    font-size: 1.3rem;
  }
`;

/**
 * questionIndex는 1부터 시작하는 값
 */
const SliderQuestion = ({
  questionIndex,
  subCriteria1,
  subCriteria2,
}: Props) => {
  return (
    <div className="p-3 flex flex-col justify-center">
      <SubCriteriaContainer>
        <SubCriteria>{subCriteria1}</SubCriteria>
        <SubCriteria>{subCriteria2}</SubCriteria>
      </SubCriteriaContainer>
      <Slider questionIndex={questionIndex} />
    </div>
  );
};

export default SliderQuestion;
