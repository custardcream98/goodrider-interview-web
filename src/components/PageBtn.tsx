import Link from "next/link";

interface IProps {
  maxPage: number;
  currentPage: number;
}

const PageBtn = ({ maxPage, currentPage }: IProps) => {
  return (
    <section className="m-auto mt-4 mb-4 w-95% text-center md:w-920">
      <h2 hidden>이전 / 다음 페이지</h2>
      <Link href={`/interview/${currentPage - 1}`}>
        <a className={`page-btn ${1 === currentPage ? "deactivate" : ""}`}>
          {"<"}
        </a>
      </Link>
      <div className="page-btn m-2">
        <span>{`${currentPage} / ${maxPage}`}</span>
      </div>
      <Link href={`/interview/${currentPage + 1}`}>
        <a
          className={`page-btn ${maxPage === currentPage ? "deactivate" : ""}`}
        >
          {">"}
        </a>
      </Link>
    </section>
  );
};

export default PageBtn;
