import Layout from "~/components/Layout";
import QuestionBundle from "~/components/QuestionBundle";
import styles from "~/styles/mainCriteriaContainer.module.css";
import PageBtn from "~/components/PageBtn";
import { createPairs, Questions } from "~/utils/question_data";
import { useEffect } from "react";

interface IProps {
  questions: Questions;
  pagenumber: number;
  maxPage: number;
}

const scrollToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

const InterviewPage = ({ questions, pagenumber, maxPage }: IProps) => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Layout>
      <div className={styles.quote}>
        각 질문별로 더 중요하게 고려해야 할 사항 쪽으로 가운데에 위치한{" "}
        <strong>회색 원</strong>을 옮겨주세요!
      </div>
      {
        <QuestionBundle
          currentPageQuestions={questions}
          pageIndex={pagenumber}
        />
      }
      <PageBtn maxPage={maxPage} currentPage={pagenumber} />
    </Layout>
  );
};

export default InterviewPage;

type Params = {
  params: {
    pagenumber: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const questions = createPairs();
  const pageNumber = parseInt(params.pagenumber);

  return {
    props: {
      questions: questions[pageNumber - 1],
      pagenumber: pageNumber,
      maxPage: questions.length,
    },
  };
}

export async function getStaticPaths() {
  const questions = createPairs();

  return {
    paths: questions.map((_, i) => {
      return {
        params: {
          pagenumber: (i + 1).toString(),
        },
      };
    }),
    fallback: false,
  };
}
