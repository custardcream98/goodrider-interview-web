import fs from "fs";

export interface IVideoQuestion {
  question: string;
  selectives: string[];
}

const ROOT_PATH = "./public/videos/";
const makePath = (name: string) => ROOT_PATH + name;

const questionPath = fs
  .readdirSync(ROOT_PATH)
  .filter((dir) => !dir.includes("."));
const getVideoPath = (question: string) => {
  const videos = fs
    .readdirSync(makePath(question))
    .filter((dir) => /\.mp4$/.test(dir));
  return videos.map((video) => "../videos/" + question + "/" + video);
};

export const getVideoQuestions = () => {
  let videoQuestionData: IVideoQuestion[] = [];

  // 난폭운전 세부 문항 필요시 주석 해제
  for (const question of questionPath) {
    videoQuestionData.push({
      question,
      selectives: getVideoPath(question),
    });
  }

  return videoQuestionData;
};
