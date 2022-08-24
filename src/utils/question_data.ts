export interface ICriteria {
  level: number;
  criteria: string;
  subcriterias: ICriteria[];
};

const hierarchy:ICriteria = 
  {
    level: 0,
    criteria: "착한 이륜차 운전 점수",
    subcriterias: [
      {
        level: 1,
        criteria: "헬멧 미착용",
        subcriterias: []
      },
      {
        level: 1,
        criteria: "신호위반, 중앙선 침범, 역주행",
        subcriterias: [
          {
            level: 2,
            criteria: "신호위반",
            subcriterias: []
          },
          {
            level: 2,
            criteria: "중앙선 침범",
            subcriterias: []
          },
          {
            level: 2,
            criteria: "역주행",
            subcriterias: []
          },
        ]
      },
      {
        level: 1,
        criteria: "보행자 위협, 인도 침범, 금지구역 침범",
        subcriterias: [
          {
            level: 2,
            criteria: "보행자 위협",
            subcriterias: []
          },
          {
            level: 2,
            criteria: "인도 침범",
            subcriterias: []
          },
          {
            level: 2,
            criteria: "금지구역 침범",
            subcriterias: []
          },
        ]
      },
      {
        level: 1,
        criteria: "과속, 급가속, 급감속, 차로위반",
        subcriterias: [
          {
            level: 2,
            criteria: "과속",
            subcriterias: []
          },
          {
            level: 2,
            criteria: "급가속",
            subcriterias: []
          },
          {
            level: 2,
            criteria: "급감속",
            subcriterias: []
          },
          {
            level: 2,
            criteria: "차로위반",
            subcriterias: []
          },
        ]
      }
    ],
}

type Pairs = 
  {
    criteria1: string;
    criteria2: string;
  }[]

export type Questions = {
  mainCriteria: string;
  pairs: Pairs;
}

const combination = (subcriterias: ICriteria[]) => {
  let pairs:Pairs = []
  subcriterias.forEach((currentSubCriteria, i) => {
    for (let j = i + 1; j < subcriterias.length; j++) {
      pairs.push({criteria1:currentSubCriteria.criteria, criteria2:subcriterias[j].criteria})
    }
  })

  return pairs;
}

const iterCurrentLevelToCreateQuestionsArr = (subcriterias: ICriteria[]) => {
  let currentLevelQuestions: Questions[] = [];
  subcriterias.forEach((currentSubCriteria) => {
    if (currentSubCriteria.subcriterias.length !== 0) {
      currentLevelQuestions.push({ mainCriteria: currentSubCriteria.criteria, pairs: combination(currentSubCriteria.subcriterias) });
    }
  })

  return currentLevelQuestions;
}
  
export const createPairs = () => {
  const questions: Questions[] = [
    { mainCriteria: hierarchy.criteria, pairs: combination(hierarchy.subcriterias) },
    ...iterCurrentLevelToCreateQuestionsArr(hierarchy.subcriterias)
  ];

  return questions;
}