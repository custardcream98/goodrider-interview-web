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

// const NavbarContainer = styled.div`
// z-index: 1;
//   margin: 0 auto;
//   max-width: ;
// `

// const Navbar = styled.nav`
//   width: 100%;

// `

const scrollToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

const InterviewPage = ({ questions, pagenumber, maxPage }: IProps) => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Layout pagenumber={pagenumber}>
      <header>
        <nav>
          <h1 className="text-nav-heading">
            착한 이륜차 운전자 평가 모델 관련 설문조사
          </h1>
        </nav>
      </header>
      <main>
        <section className={styles.quote}>
          <h2 hidden>안내 문구</h2>
          <p>
            각 질문별로 더 중요하게 고려해야 할 사항 쪽으로 가운데에 위치한{" "}
            <strong>회색 원</strong>을 옮겨주세요!
          </p>
        </section>
        {
          <QuestionBundle
            currentPageQuestions={questions}
            pageIndex={pagenumber}
          />
        }
        <PageBtn maxPage={maxPage} currentPage={pagenumber} />
      </main>
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
