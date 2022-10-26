import React, { useEffect } from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { scoreState } from "~/utils/atom";

type Props = {
  maxSliders: number;
  maxVideoQuestions: number;
  currentPage: number;
};

const outlineClasses = ["outline", "outline-2", "outline-darkmint"];
const checkedClasses = ["bg-darkmint", "text-mint"];
const unCheckedClasses = ["bg-mint", "text-darkmint"];

const Navbar = ({ maxSliders, maxVideoQuestions, currentPage }: Props) => {
  const [scoreStorage, _] = useRecoilState(scoreState);

  useEffect(() => {
    const navItems = document.getElementsByClassName("nav-item-js");

    for (let i = 0; i < navItems.length; i++) {
      if (i + 1 === currentPage) {
        navItems[i].classList.add(...outlineClasses);
      } else {
        navItems[i].classList.remove(...outlineClasses);
      }
    }
  }, [currentPage]);

  useEffect(() => {
    const navItems = document.getElementsByClassName("nav-item-js");

    if (currentPage <= maxSliders) {
      for (let i = 1; i <= maxSliders; i++) {
        if (i in scoreStorage) {
          if (
            Object.keys(scoreStorage[i]).length - 1 ===
            scoreStorage[i].maxQuestions
          ) {
            navItems[i - 1].classList.remove(...unCheckedClasses);
            navItems[i - 1].classList.add(...checkedClasses);
          } else {
            navItems[i - 1].classList.add(...unCheckedClasses);
            navItems[i - 1].classList.remove(...checkedClasses);
          }
        }
      }
    } else {
      for (let i = maxSliders + 1; i <= maxSliders + maxVideoQuestions; i++) {
        if (i in scoreStorage) {
          if (scoreStorage[i].checkedIndex <= scoreStorage[i].maxQuestions) {
            if (
              (scoreStorage[i].values as number[]).reduce(
                (acc, e) => (e > 0 ? acc + 1 : acc),
                0
              ) >
              scoreStorage[i].maxQuestions - scoreStorage[i].checkedIndex
            ) {
              navItems[i - 1].classList.remove(...unCheckedClasses);
              navItems[i - 1].classList.add(...checkedClasses);
            } else {
              navItems[i - 1].classList.add(...unCheckedClasses);
              navItems[i - 1].classList.remove(...checkedClasses);
            }
          }
        }
      }
    }
  }, [scoreStorage]);

  return (
    <header className="fixed top-2 z-50 w-full">
      <nav className="m-auto flex w-95% flex-col justify-between overflow-hidden rounded-xl bg-[#c8fff326] py-2 px-4 backdrop-blur-md md:w-920 md:flex-row md:items-center">
        <h1 className="mb-1 text-[1rem] font-[600] md:mb-0 md:text-[1.5rem]">
          착한 이륜차 운전자 평가 모델 관련 설문조사
        </h1>
        <ol className="mt-0 flex justify-end">
          {React.Children.toArray(
            new Array(maxSliders + maxVideoQuestions).fill(0).map((_, i) => (
              <li className="ml-3">
                <Link href={`/interview/${i + 1}`}>
                  <a className="nav-item-js inline-block rounded bg-mint px-2 py-[2px] text-nav-item-mobile text-darkmint shadow md:rounded-md md:py-2 md:px-3 md:text-nav-item">
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
