import Link from "next/link";

interface IProps {
  maxPage: number;
  currentPage: number;
}

const PageBtn = ({ maxPage, currentPage }: IProps) => {
  return (
    <section className="flex justify-center mt-4 mb-4">
      <h2 hidden>이전 / 다음 페이지</h2>
      <Link href={`/interview/${currentPage - 1}`}>
        <button
          className={`prevBtn py-2 px-3 bg-indigo-500 text-white text-m md:text-xl font-semibold rounded-md shadow focus:outline-none ${
            1 === currentPage ? "deactivate" : ""
          }`}
        >
          {"<"}
        </button>
      </Link>
      <div className="py-2 px-3 bg-indigo-500 text-white text-m md:text-xl font-semibold rounded-md shadow focus:outline-none">
        <span>{`${currentPage} / ${maxPage}`}</span>
      </div>
      <Link href={`/interview/${currentPage + 1}`}>
        <button
          className={`prevBtn py-2 px-3 bg-indigo-500 text-white text-m md:text-xl font-semibold rounded-md shadow focus:outline-none ${
            maxPage === currentPage ? "deactivate" : ""
          }`}
        >
          {">"}
        </button>
      </Link>
    </section>
  );
};

export default PageBtn;
