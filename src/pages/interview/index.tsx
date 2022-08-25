import React, { useState } from "react";
import { createPairs, Questions } from "~/utils/question_data";
import Layout from "~/components/Layout";
import QuestionBundle from "~/components/QuestionBundle";
import styles from "~/styles/mainCriteriaContainer.module.css";
import PageBtn from "~/components/PageBtn";

interface IProps {
  questions: Questions[];
}

const scrollToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

const MainPage = ({ questions }: IProps) => {
  const [page, setPage] = useState(1);

  const onPageBtnclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;

    switch (name) {
      case "prev":
        if (page > 1) {
          setPage((prev) => prev - 1);
          scrollToTop();
        }
        break;
      case "next":
        if (page < questions.length) {
          setPage((prev) => prev + 1);
          scrollToTop();
        }
        break;
    }
  };

  return (
    <Layout>
      <div className={styles.Container}>
        <blockquote>
          각 질문별로 더 중요하게 고려해야 할 사항 쪽으로 가운데에 위치한{" "}
          <strong>회색 원</strong>을 옮겨주세요!
        </blockquote>
      </div>
      {
        <QuestionBundle
          currentPageQuestions={questions[page - 1]}
          pageIndex={page}
        />
      }
      <PageBtn
        maxPage={questions.length}
        currentPage={page}
        onClick={onPageBtnclick}
      />
    </Layout>
  );
};

export function getStaticProps() {
  const questions = createPairs();
  return {
    props: {
      questions: questions,
    },
  };
}

export default MainPage;
