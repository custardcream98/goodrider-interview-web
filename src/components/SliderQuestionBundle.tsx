import React from "react";
import {
  getDescriptionImage,
  IDescriptionImages,
  Questions,
} from "~/utils/question_data";
import SliderQuestion from "~/components/SliderQuestion";
import DescriptionImage from "./DescriptionImage";

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
  let count = 0;

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
        currentPageQuestions.pairs.map((sub) => {
          count++;

          return (
            <SliderQuestion
              key={`${pageIndex}-${count}`}
              questionIndex={`${pageIndex}-${count}`}
              subCriteria1={sub.criteria1}
              subCriteria2={sub.criteria2}
            />
          );
        })
      )}
    </section>
  );
};

export default SliderQuestionBundle;

// type Params = {
//   params: {
//     criteria: string;
//   }
// }

// export async function getStaticProps({ params }: Params) {
//   return getDescriptionImage(params.criteria);
// }
