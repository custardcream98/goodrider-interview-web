export enum PassNonPass {
  Pass = "passed",
  NonPass = "not passed",
}
export interface IQuestionToInstruct {
  questionIndex: number | PassNonPass;
  instruction: Instruction;
}
export enum CrPassCheck {
  Passed,
  PassedOnChange,
  ContinueToFind,
}
export enum Instruction {
  Left = "왼쪽",
  Right = "오른쪽",
  NotAbleToFind = "일관성 지수가 크게 벗어났습니다. 다시 설문해주세요!",
  NoNeedToMove = "",
}
