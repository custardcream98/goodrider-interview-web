export interface ICriteria {
  level: number;
  criteria: string;
  imgSrc?: string;
  description?: string;
  subcriterias?: ICriteria[];
}

const hierarchy: ICriteria = {
  level: 0,
  criteria: "착한 이륜차 운전 점수",
  subcriterias: [
    {
      level: 1,
      criteria: "교통법규 위반",
      imgSrc: "/images/신호위반.jpeg",
      description:
        "신호위반, 중앙선 침범, 역주행, 과속, 헬멧 미착용 등을 말합니다.",
      subcriterias: [
        {
          level: 2,
          criteria: "신호위반",
          imgSrc: "/images/신호위반.jpeg",
        },
        {
          level: 2,
          criteria: "중앙선 침범",
          imgSrc: "/images/중앙선침범.jpg",
        },
        {
          level: 2,
          criteria: "역주행",
          imgSrc: "/images/역주행.jpg",
        },
        {
          level: 2,
          criteria: "과속",
          imgSrc: "/images/과속.jpg",
        },
        {
          level: 2,
          criteria: "헬멧 미착용",
          imgSrc: "/images/헬멧미착용.jpg",
        },
      ],
    },
    {
      level: 1,
      criteria: "보행자 위협",
      imgSrc: "/images/인도주행.jpg",
      description: "보행자 근접주행, 인도 침범 등을 말합니다.",
      subcriterias: [
        {
          level: 2,
          criteria: "보행자 근접주행",
          imgSrc: "/images/보행자근접주행.jpg",
        },
        {
          level: 2,
          criteria: "인도 침범",
          imgSrc: "/images/인도주행.jpg",
        },
      ],
    },
    {
      level: 1,
      criteria: "난폭운전",
      imgSrc: "/images/난폭운전.png",
      description: "급가속, 급감속, 급회전, 급진로변경 등을 말합니다.",
      subcriterias: [
        {
          level: 2,
          criteria: "급가속",
          imgSrc: "/videos/급가속.mp4",
        },
        {
          level: 2,
          criteria: "급감속",
          imgSrc: "/videos/급감속.mp4",
        },
        {
          level: 2,
          criteria: "급회전",
          imgSrc: "/videos/급회전.mp4",
        },
        {
          level: 2,
          criteria: "급진로변경",
          imgSrc: "/videos/급진로변경.mp4",
        },
      ],
    },
  ],
};

export type Pairs = {
  criteria1: string;
  criteria2: string;
}[];

export type Questions = {
  mainCriteria: string;
  pairs: Pairs;
};

const combination = (subcriterias: ICriteria[]) => {
  let pairs: Pairs = [];
  subcriterias.forEach((currentSubCriteria, i) => {
    for (let j = i + 1; j < subcriterias.length; j++) {
      pairs.push({
        criteria1: currentSubCriteria.criteria,
        criteria2: subcriterias[j].criteria,
      });
    }
  });

  return pairs;
};

const iterCurrentLevelToCreateQuestionsArr = (subcriterias: ICriteria[]) => {
  let currentLevelQuestions: Questions[] = [];
  subcriterias.forEach((currentSubCriteria) => {
    if (currentSubCriteria.subcriterias) {
      if (currentSubCriteria.subcriterias.length !== 0) {
        currentLevelQuestions.push({
          mainCriteria: currentSubCriteria.criteria,
          pairs: combination(currentSubCriteria.subcriterias),
        });
      }
    }
  });

  return currentLevelQuestions;
};

export const createPairs = () => {
  const questions: Questions[] = [
    {
      mainCriteria: hierarchy.criteria,
      pairs: combination(hierarchy.subcriterias),
    },
    ...iterCurrentLevelToCreateQuestionsArr(hierarchy.subcriterias),
  ];

  return questions;
};

export interface IDescriptionImages {
  title: string;
  imgSrc: string;
  description?: string;
}

export const getDescriptionImage = (criteria: string) => {
  let result: IDescriptionImages[] = [];

  if (hierarchy.criteria === criteria) {
    hierarchy.subcriterias.forEach((subcriteria) => {
      result.push({
        title: subcriteria.criteria,
        imgSrc: subcriteria.imgSrc,
        description: subcriteria.description,
      });
    });
  } else {
    for (let subcriteria of hierarchy.subcriterias) {
      if (subcriteria.criteria === criteria) {
        subcriteria.subcriterias.forEach((innerSubcriteria) => {
          result.push({
            title: innerSubcriteria.criteria,
            imgSrc: innerSubcriteria.imgSrc,
          });
        });
        break;
      }
    }
  }

  return result;
};
