import fs from "fs";
import path from "path";

export interface IVideoQuestion {
  question: string;
  selectives: string[];
}

const ROOT_PATH = path.join("public", "videos");
const makePath = (name: string) => path.join(ROOT_PATH, name);

const questionPath = fs
  .readdirSync(ROOT_PATH)
  .filter((dir) => !dir.includes("."));
const getVideoPath = (question: string) => {
  const videos = fs
    .readdirSync(makePath(question))
    .filter((dir) => /\.mp4$/.test(dir))
    .sort();
  return videos.map((video) => path.join("..", "videos", question, video));
};

export const getVideoQuestions = () => {
  let videoQuestionData: IVideoQuestion[] = [];

  // 난폭운전 세부 문항 필요시 주석 해제
  for (const question of questionPath) {
    videoQuestionData.push({
      question: question.split("_")[1], // 1_영상이름 => 영상이름
      selectives: getVideoPath(question),
    });
  }

  return videoQuestionData;
};
