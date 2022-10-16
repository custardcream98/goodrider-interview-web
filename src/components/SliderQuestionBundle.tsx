import React, { useEffect } from "react";
import { IDescriptionImages, Questions } from "~/utils/question_data";
import SliderQuestion from "~/components/SliderQuestion";
import DescriptionImage from "./DescriptionImage";
import { getAnswer, setAnswer } from "~/utils/localStorage";
import { calScoreToVal, calValToScore } from "~/utils/calSlider";

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
  return (
    <section className="question-bundle">
      <h2 className="ir-only">설문 문항</h2>
      <div
        className={`mb-6 flex flex-wrap justify-center gap-x-[60px] ${
          descriptionImages.length === 4 ? "mx-auto w-[600px]" : ""
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
            <div className={``}>
              <SliderQuestion
                key={`${pageIndex}-${i + 1}`}
                questionIndex={`${pageIndex}-${i + 1}`}
                subCriteria1={sub.criteria1}
                subCriteria2={sub.criteria2}
              />
            </div>
          );
        })
      )}
    </section>
  );
};

export default SliderQuestionBundle;
