import Link from "next/link";

interface IProps {
  maxPage: number;
  currentPage: number;
}

const PageBtn = ({ maxPage, currentPage }: IProps) => {
  return (
    <div className="flex justify-center mb-4">
      <Link href={`/interview/${currentPage - 1}`}>
        <button
          className={`prevBtn py-2 px-3 mt-5 bg-indigo-500 text-white text-m md:text-xl font-semibold rounded-md shadow focus:outline-none ${
            1 === currentPage ? "deactivate" : ""
          }`}
        >
          {"<"}
        </button>
      </Link>
      <div className="py-2 px-3 mt-5 bg-indigo-500 text-white text-m md:text-xl font-semibold rounded-md shadow focus:outline-none">{`${currentPage} / ${maxPage}`}</div>
      <Link href={`/interview/${currentPage + 1}`}>
        <button
          className={`prevBtn py-2 px-3 mt-5 bg-indigo-500 text-white text-m md:text-xl font-semibold rounded-md shadow focus:outline-none ${
            maxPage === currentPage ? "deactivate" : ""
          }`}
        >
          {">"}
        </button>
      </Link>
    </div>
  );
};

export default PageBtn;
