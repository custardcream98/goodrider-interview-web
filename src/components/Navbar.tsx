import React from "react";
import Link from "next/link";

type Props = {
  maxPage: number;
  currentPage: number;
};

const Navbar = ({ maxPage, currentPage }: Props) => {
  return (
    <nav className="box block custom:flex custom:items-center custom:justify-between z-50 sticky top-1 !bg-transparent backdrop-blur-md">
      <h1 className="text-nav-heading-mobile custom:text-nav-heading">
        착한 이륜차 운전자 평가 모델 관련 설문조사
      </h1>
      <ol className="flex">
        {React.Children.toArray(
          new Array(maxPage).fill(0).map((_, i) => (
            <li className="py-2 px-3 ml-3 bg-indigo-500 text-white text-nav-item-mobile custom:text-nav-item rounded-md shadow focus:outline-none">
              <Link href={`/interview/${i + 1}`}>{i + 1}</Link>
            </li>
          ))
        )}
      </ol>
    </nav>
  );
};

export default Navbar;
