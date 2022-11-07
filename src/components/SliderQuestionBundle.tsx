import React from "react";
import { IDescriptionImages, Questions } from "~/utils/question_data";
import SliderQuestion from "~/components/SliderQuestion";
import DescriptionImage from "./DescriptionImage";
import { useRecoilValue } from "recoil";
import { checkPassSelector } from "~/utils/atom";
import { PassNonPass } from "~/utils/ahpValidation/types";
import { resetSliderAnswersOfPage } from "~/utils/localStorage";
import Router from "next/router";

interface IProps {
  currentPageQuestions: Questions;
  descriptionImages: IDescriptionImages[];
  pageIndex: number;
}

const SliderQuestionBundle = ({
  currentPageQuestions,
  descriptionImages,
  pageIndex,
}: IProps) => {
  const { nonPassedQuestionNum } = useRecoilValue(checkPassSelector);

  const onResetSliders = () => {
    resetSliderAnswersOfPage(pageIndex);
    Router.reload();
  };

  return (
    <section className="question-bundle">
      <h2 className="sr-only">설문 문항</h2>
      <div
        className={`mb-6 flex flex-wrap justify-center gap-x-[60px] ${
          descriptionImages.length === 4 ? "mx-auto md:w-[600px]" : ""
        }`}
      >
        {React.Children.toArray(
          descriptionImages.map((descriptionImage) => {
            return (
              <DescriptionImage
                title={descriptionImage.title}
                imgSrc={descriptionImage.imgSrc}
                description={descriptionImage.description}
              />
            );
          })
        )}
      </div>
      {React.Children.toArray(
        currentPageQuestions.pairs.map((sub, i) => {
          return (
            <SliderQuestion
              key={`${pageIndex}-${i + 1}`}
              pageIndex={pageIndex}
              questionIndex={i + 1}
              subCriteria1={sub.criteria1}
              subCriteria2={sub.criteria2}
              pairsCount={currentPageQuestions.pairs.length}
            />
          );
        })
      )}
      <button
        className={`dark fixed bottom-[60px] right-4 z-10 rounded-full py-2 px-3 md:bottom-[100px] md:right-6 md:px-5 md:py-4 md:text-2xl ${
          nonPassedQuestionNum === PassNonPass.NonPass ? "" : "hidden"
        }`}
        onClick={onResetSliders}
      >
        응답 리셋하기
      </button>
    </section>
  );
};

export default SliderQuestionBundle;
