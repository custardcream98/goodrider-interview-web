import React, { useEffect } from "react";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  completedQuestionsState,
  ISelectiveScoreState,
  scoreState,
} from "~/utils/atom";

type Props = {
  maxSliders: number;
  maxVideoQuestions: number;
  currentPage: number;
};

const outlineClasses = "outline outline-2 outline-darkmint outline-offset-2";
const checkedClasses = "dark";
const unCheckedClasses = "light";

const Navbar = ({ maxSliders, maxVideoQuestions, currentPage }: Props) => {
  const scoreStorage = useRecoilValue(scoreState);
  const [completedQuestionsStorage, setCompletedQuestionsStorage] =
    useRecoilState(completedQuestionsState);

  useEffect(() => {
    let isCompleted = [];

    for (let i = 1; i <= maxSliders; i++) {
      if (i in scoreStorage) {
        isCompleted.push(
          Object.keys(scoreStorage[i]).length - 1 ===
            scoreStorage[i].maxQuestions
        );
      }
    }

    for (let i = maxSliders + 1; i <= maxSliders + maxVideoQuestions; i++) {
      if (i in scoreStorage) {
        if (scoreStorage[i].checkedIndex <= scoreStorage[i].maxQuestions) {
          isCompleted.push(
            (scoreStorage[i] as ISelectiveScoreState).values.reduce(
              (acc, e) => (e > 0 ? acc + 1 : acc),
              0
            ) >
              scoreStorage[i].maxQuestions - scoreStorage[i].checkedIndex
          );
        }
      }
    }

    setCompletedQuestionsStorage((_) => isCompleted);
  }, [scoreStorage]);

  return (
    <header className="fixed top-2 z-50 w-full">
      <nav className="m-auto flex w-95% flex-col justify-between overflow-hidden rounded-xl bg-[#c8fff326] py-2 px-4 backdrop-blur-md md:w-920 md:flex-row md:items-center">
        <h1 className="mb-1 text-[1rem] font-[600] md:mb-0 md:text-[1.5rem]">
          착한 이륜차 운전자 평가 모델 관련 설문조사
        </h1>
        <ol className="flex justify-end md:mt-1">
          {React.Children.toArray(
            new Array(maxSliders + maxVideoQuestions).fill(0).map((_, i) => (
              <li className="ml-3">
                <Link href={`/interview/${i + 1}`}>
                  <a
                    className={`inline-block rounded  px-2 py-[2px] text-nav-item-mobile shadow md:rounded-md md:py-2 md:px-3 md:text-nav-item ${
                      completedQuestionsStorage[i]
                        ? checkedClasses
                        : unCheckedClasses
                    } ${i + 1 === currentPage ? outlineClasses : ""}`}
                  >
                    {i + 1}
                  </a>
                </Link>
              </li>
            ))
          )}
        </ol>
      </nav>
    </header>
  );
};

export default Navbar;
