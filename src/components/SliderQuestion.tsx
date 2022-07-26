import { useRecoilValue } from "recoil";
import { checkPassSelector } from "~/utils/atom";
import Slider from "./Slider";

type Props = {
  pageIndex: number;
  questionIndex: number;
  subCriteria1: string;
  subCriteria2: string;
  pairsCount: number;
};

/**
 * questionIndex는 1부터 시작하는 값
 */
const SliderQuestion = ({
  pageIndex,
  questionIndex,
  subCriteria1,
  subCriteria2,
  pairsCount,
}: Props) => {
  const { isScorePassed, nonPassedQuestionNum } =
    useRecoilValue(checkPassSelector);

  return (
    <section
      className={`mt-4 flex flex-col justify-center rounded-xl p-3 ${
        pairsCount === questionIndex ? "" : "mb-14"
      } ${
        !isScorePassed &&
        (nonPassedQuestionNum === questionIndex || nonPassedQuestionNum === -1)
          ? "outline outline-4 outline-offset-0 outline-red-600"
          : ""
      }`}
    >
      <h3 className="keep-all m-auto flex w-[90%] items-center pb-2 text-lg font-medium md:w-[51rem] md:text-xl">
        <span className="w-[50%] pr-2">{subCriteria1}</span>
        <span className="w-[50%] pl-2 text-right">{subCriteria2}</span>
      </h3>

      <Slider
        pageIndex={pageIndex}
        questionIndex={questionIndex}
        criteria1={subCriteria1}
        criteria2={subCriteria2}
      />
    </section>
  );
};

export default SliderQuestion;
