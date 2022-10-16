import Link from "next/link";

interface IProps {
  maxPage: number;
  currentPage: number;
}

const PageBtn = ({ maxPage, currentPage }: IProps) => {
  return (
    <section className="m-auto mt-4 mb-4 w-920 text-center">
      <h2 hidden>이전 / 다음 페이지</h2>
      <Link href={`/interview/${currentPage - 1}`}>
        <a
          className={`prevBtn text-m inline-block rounded-md bg-indigo-500 py-2 px-3 font-semibold text-white shadow focus:outline-none md:text-xl ${
            1 === currentPage ? "deactivate" : ""
          }`}
        >
          {"<"}
        </a>
      </Link>
      <div className="text-m m-2 inline-block rounded-md bg-indigo-500 py-2 px-3 font-semibold text-white shadow focus:outline-none md:text-xl">
        <span>{`${currentPage} / ${maxPage}`}</span>
      </div>
      <Link href={`/interview/${currentPage + 1}`}>
        <a
          className={`prevBtn text-m inline-block rounded-md bg-indigo-500 py-2 px-3 font-semibold text-white shadow focus:outline-none md:text-xl ${
            maxPage === currentPage ? "deactivate" : ""
          }`}
        >
          {">"}
        </a>
      </Link>
    </section>
  );
};

export default PageBtn;
