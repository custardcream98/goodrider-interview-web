import React, { useEffect } from "react";
import Link from "next/link";

type Props = {
  maxPage: number;
  currentPage: number;
};

const Navbar = ({ maxPage, currentPage }: Props) => {
  useEffect(() => {
    const navItems = document.getElementsByClassName("nav-item-js");

    for (let i = 0; i < navItems.length; i++) {
      if (i + 1 === currentPage) {
        navItems[i].classList.remove("bg-mint", "text-darkmint");
        navItems[i].classList.add("bg-darkmint", "text-mint");
      } else {
        navItems[i].classList.add("bg-mint", "text-darkmint");
        navItems[i].classList.remove("bg-darkmint", "text-mint");
      }
    }
  }, [currentPage]);

  return (
    <header className="fixed top-2 z-50 w-full">
      <nav className="m-auto flex w-920 items-center justify-between overflow-hidden rounded-xl bg-[#c8fff326] py-2 px-4 backdrop-blur-md">
        <h1 className="text-nav-heading">
          착한 이륜차 운전자 평가 모델 관련 설문조사
        </h1>
        <ol className="mt-0 flex justify-end">
          {React.Children.toArray(
            new Array(maxPage).fill(0).map((_, i) => (
              <li className="ml-3">
                <Link href={`/interview/${i + 1}`}>
                  <a className="nav-item-js inline-block rounded-md bg-mint py-2 px-3 text-nav-item text-darkmint">
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
