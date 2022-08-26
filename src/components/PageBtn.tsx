interface IProps {
  maxPage: number;
  currentPage: number;
  onClick: React.MouseEventHandler;
}

const PageBtn = ({ maxPage, currentPage, onClick }: IProps) => {
  return (
    <div className="flex justify-center mb-4">
      {/* <style>
        {`        
        .deactivate {
          cursor: none;
          background-color: azure;
        }
        `}
      </style> */}
      <button
        className="prevBtn py-2 px-3 mt-5 bg-indigo-500 text-white text-m md:text-xl font-semibold rounded-md shadow focus:outline-none"
        name="prev"
        onClick={onClick}
      >
        {"<"}
      </button>
      <div className="py-2 px-3 mt-5 bg-indigo-500 text-white text-m md:text-xl font-semibold rounded-md shadow focus:outline-none">{`${currentPage} / ${maxPage}`}</div>
      <button
        className="nextBtn py-2 px-3 mt-5 bg-indigo-500 text-white text-m md:text-xl font-semibold rounded-md shadow focus:outline-none"
        name="next"
        onClick={onClick}
      >
        {">"}
      </button>
    </div>
  );
};

export default PageBtn;
