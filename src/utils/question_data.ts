export interface ICriteria {
  criteria: string;
  imgSrc?: string;
  description?: string;
  subcriterias?: ICriteria[];
}

const hierarchy: ICriteria = {
  criteria: "착한 이륜차 운전 점수",
  subcriterias: [
    {
      criteria: "교통법규 위반",
      imgSrc: "/images/신호위반.jpeg",
      description:
        "신호위반, 중앙선 침범, 역주행, 과속, 헬멧 미착용 등을 말합니다.",
      subcriterias: [
        {
          criteria: "신호위반",
          imgSrc: "/images/신호위반.jpeg",
        },
        {
          criteria: "중앙선 침범",
          imgSrc: "/images/중앙선침범.jpg",
        },
        {
          criteria: "역주행",
          imgSrc: "/images/역주행.jpg",
        },
        {
          criteria: "과속",
          imgSrc: "/images/과속.jpg",
        },
        {
          criteria: "헬멧 미착용",
          imgSrc: "/images/헬멧미착용.jpg",
        },
      ],
    },
    {
      criteria: "보행자 위협",
      imgSrc: "/images/인도주행.jpg",
      description: "보행자 근접주행, 인도 침범 등을 말합니다.",
      subcriterias: [
        {
          criteria: "보행자 근접주행",
          imgSrc: "/images/보행자근접주행.jpg",
        },
        {
          criteria: "인도 침범",
          imgSrc: "/images/인도주행.jpg",
        },
      ],
    },
    {
      criteria: "난폭운전",
      imgSrc: "/images/난폭운전.png",
      description: "급가속, 급감속, 급회전, 급진로변경 등을 말합니다.",
      subcriterias: [
        {
          criteria: "급가속",
          imgSrc: "/videos/급가속.mp4",
        },
        {
          criteria: "급감속",
          imgSrc: "/videos/급감속.mp4",
        },
        {
          criteria: "급회전",
          imgSrc: "/videos/급회전.mp4",
        },
        {
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

const getSubCriteriasCombination = (subcriterias: ICriteria[]) => {
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

let hierarchyFlattend = {};

function flattenHierarchy(criteria: ICriteria) {
  if (criteria.subcriterias) {
    hierarchyFlattend[criteria.criteria] = [...criteria.subcriterias];
    criteria.subcriterias.forEach(function (child) {
      flattenHierarchy(child);
    });
  }
}
flattenHierarchy(hierarchy);

export const createPairs = () => {
  const questions: Questions[] = Object.keys(hierarchyFlattend).map(
    (criteriaKey) => {
      return {
        mainCriteria: criteriaKey,
        pairs: getSubCriteriasCombination(hierarchyFlattend[criteriaKey]),
      };
    }
  );

  return questions;
};

export interface IDescriptionImages {
  title: string;
  imgSrc: string;
  description?: string;
}

export const getDescriptionImage = (criteria: string) => {
  if (hierarchy.criteria === criteria) {
    return hierarchy.subcriterias.map((subcriteria) => ({
      title: subcriteria.criteria,
      imgSrc: subcriteria.imgSrc,
      description: subcriteria.description,
    }));
  }

  return hierarchy.subcriterias
    .filter((subcriteria) => subcriteria.criteria === criteria)[0]
    .subcriterias.map((innerSubcriteria) => ({
      title: innerSubcriteria.criteria,
      imgSrc: innerSubcriteria.imgSrc,
    }));
};
