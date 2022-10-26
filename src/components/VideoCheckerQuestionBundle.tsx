import React, { useEffect } from "react";
import { IVideoQuestion } from "~/utils/video_question_data";
import VideoCheckerQuestion from "~/components/VideoCheckerQuestion";
import { useRecoilState } from "recoil";
import { setCheckerAnswer } from "~/utils/localStorage";
import { scoreState } from "~/utils/atom";

interface IProps {
  videoQuestions: IVideoQuestion;
  pageIndex: number;
}

const VideoCheckerQuestionBundle = ({ videoQuestions, pageIndex }: IProps) => {
  const [scoreStorage, _] = useRecoilState(scoreState);

  useEffect(() => {
    if (pageIndex in scoreStorage) {
      if (
        scoreStorage[pageIndex].checkedIndex <=
        scoreStorage[pageIndex].maxQuestions
      ) {
        setCheckerAnswer({
          questionIndex: pageIndex.toString(),
          values: scoreStorage[pageIndex].values as number[],
          checked: scoreStorage[pageIndex].checkedIndex,
        });
      }
    }
  }, [scoreStorage]);

  return (
    <section className="question-bundle">
      <h3 className="sr-only">{videoQuestions.question} 위험운전 점수</h3>
      <fieldset className="flex flex-wrap items-center justify-center gap-5">
        {React.Children.toArray(
          videoQuestions.selectives.map((videoPath, i) => (
            <VideoCheckerQuestion
              questionIndex={i + 1}
              pageIndex={pageIndex}
              videoPath={videoPath}
              criteria={videoQuestions.question}
            />
          ))
        )}
      </fieldset>
    </section>
  );
};

export default VideoCheckerQuestionBundle;
