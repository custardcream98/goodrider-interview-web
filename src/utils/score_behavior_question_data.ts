import fs from "fs";

export interface IBehaviorQuestion {
  question: string;
  selectives: string[];
}

const ROOT_PATH = "./public/videos/";
const makePath = (name: string) => ROOT_PATH + "/" + name;

const questionPath = fs.readdirSync(ROOT_PATH);
const getVideoPath = (question: string) => {
  const videos = fs.readdirSync(makePath(question));
  return videos.map((video) => makePath(question + "/" + video));
};
const questionList = questionPath.map((path) => path);

// const behaviorQuestionData: IBehaviorQuestion[] = [
//   {
//     question: "급가속",
//     selectives: [
//       "./videos/급가속/급가속30.mp4",
//       "./videos/급가속/급가속43.mp4",
//       "./videos/급가속/급가속60.mp4",
//       "./videos/급가속/급가속70.mp4",
//       "./videos/급가속/급가속90.mp4",
//     ],
//   },
//   {
//     question: "급감속",
//     selectives: [
//       "./videos/급가속/급가속30.mp4",
//       "./videos/급가속/급가속43.mp4",
//       "./videos/급가속/급가속60.mp4",
//       "./videos/급가속/급가속70.mp4",
//       "./videos/급가속/급가속90.mp4",
//     ],
//   },
//   {
//     question: "급가속",
//     selectives: [
//       "./videos/급가속/급가속30.mp4",
//       "./videos/급가속/급가속43.mp4",
//       "./videos/급가속/급가속60.mp4",
//       "./videos/급가속/급가속70.mp4",
//       "./videos/급가속/급가속90.mp4",
//     ],
//   },
//   {
//     question: "급가속",
//     selectives: [
//       "./videos/급가속/급가속30.mp4",
//       "./videos/급가속/급가속43.mp4",
//       "./videos/급가속/급가속60.mp4",
//       "./videos/급가속/급가속70.mp4",
//       "./videos/급가속/급가속90.mp4",
//     ],
//   },
// ];

export const getBehaviorQuestions = () => {
  let behaviorQuestionData: IBehaviorQuestion[] = [];

  for (const question of questionList) {
    behaviorQuestionData.push({
      question,
      selectives: getVideoPath(question),
    });
  }

  return behaviorQuestionData;
};
