import { useEffect, useState } from "react";
import { getAnswer } from "~/utils/localStorage";
import Slider from "./Slider";

type Props = {
  questionIndex: number;
  subCriteria1: string;
  subCriteria2: string;
};

/**
 * questionIndex는 1부터 시작하는 값
 */
const SliderQuestion = ({
  questionIndex,
  subCriteria1,
  subCriteria2,
}: Props) => {
  const [value, setValue] = useState<number>(null);

  useEffect(() => {
    setValue(getAnswer(questionIndex));
  }, []);

  return (
    <div className="p-3 flex flex-col justify-center">
      <span className="text-center mb-2 text-lg">
        {subCriteria1} vs {subCriteria2}
      </span>
      <Slider questionIndex={questionIndex} initialValue={value} />
    </div>
  );
};

export default SliderQuestion;
