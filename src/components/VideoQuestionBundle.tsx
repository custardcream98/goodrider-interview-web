import React from "react";
import styled from "styled-components";
import { IBehaviorQuestion } from "~/utils/score_behavior_question_data";
import VideoQuestion from "~/components/VideoQuestion";

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: auto;
  max-width: 60rem;
`;

interface IProps {
  videoQuestions: IBehaviorQuestion;
  pageIndex: number;
}

const VideoQuestionBundle = ({ videoQuestions, pageIndex }: IProps) => {
  return (
    <section className="question-bundle">
      <h3 className="mb-5 w-[960px] text-question-title-mobile md:text-question-title">
        {videoQuestions.question} 위험도 점수
      </h3>
      <QuestionWrapper>
        {React.Children.toArray(
          videoQuestions.selectives.map((videoPath) => (
            <div className="w-[400px]">
              <VideoQuestion videoPath={videoPath}></VideoQuestion>
              <select
                className="mt-2 w-full rounded-lg bg-[#00000022] p-2"
                name="score"
                id=""
              >
                {React.Children.toArray([
                  <option value="">점수를 선택해주세요.</option>,
                  ...Array(10)
                    .fill(0)
                    .map((_, i) => <option value={i + 1}>{i + 1}</option>),
                ])}
              </select>
            </div>
          ))
        )}
      </QuestionWrapper>
    </section>
  );
};

export default VideoQuestionBundle;
