import { IUserInfo } from "~/interfaces/userInfo";
import { Pairs } from "./question_data";

export interface IQuestionnaireData extends IUserInfo {
  questions_count: number;
  results_slider: ISliderQuestionData[];
  results_selective: ISelectiveQuestionData[];
  email: string;
}

export interface ISliderQuestionData {
  main_criteria_id: number;
  main_criteria: string;
  sub_criterias: Pairs;
  results: {
    sub_criteria_id: number;
    sub_criteria_score: number;
  }[];
}

export interface ISelectiveQuestionData {
  selective_criteria_id: number;
  selective_criteria: string;
  results: {
    sub_criteria_id: number;
    sub_criteria_score: number;
  }[];
}
