import styles from "~/styles/mainCriteriaContainer.module.css";

interface IProps {
  maxPage: number;
  currentPage: number;
  onClick: React.MouseEventHandler;
}

const PageBtn = ({ maxPage, currentPage, onClick }: IProps) => {
  return (
    <div className="flex justify-center mb-4">
      <button className={styles.pageBtn} name="prev" onClick={onClick}>
        {"<"}
      </button>
      <div className={styles.pageBtn}>{`${currentPage} / ${maxPage}`}</div>
      <button className={styles.pageBtn} name="next" onClick={onClick}>
        {">"}
      </button>
    </div>
  );
};

export default PageBtn;
