const GreetingMessage = () => (
  <section className="quote keep-all mt-0 text-lg">
    <h2 className="sr-only">설문조사 소개</h2>
    <p>
      본 설문조사는 이륜차 착한운전 평가 시스템 개발에 관한 설문지입니다. 본
      설문지는 <strong>무기명</strong>으로 작성되며, 설문의 결과는 이륜차
      착한운전을 위한 기술 개발 연구에 사용되오니 설문 항목에 성실히
      응답해주시면 대단히 감사하겠습니다.
    </p>
    <p>
      설문에 대한 궁금한 점이 있거나 문의하실 사항이 있으시다면 서울시립대학교
      공간데이터베이스 연구실(
      <a href="mailto:dongbum80@gmail.com" className="text-blue-600">
        dongbum80@gmail.com
      </a>
      ) 로 연락주시기 바랍니다.
    </p>
    <p className="my-5">
      아울러 응답해주신 분들 중 추첨을 통해 감사의 의미를 담아 기프티콘을
      드리고자 하오니 원하시는 분은 설문 결과 제출시 이메일 주소를 기입해주시기
      바랍니다.
    </p>
    <p className="my-5">
      바쁘신 중에도 귀중한 시간을 내시어 본 설문조사에 응해주셔서 감사합니다.
    </p>
    <ul className="ml-4 list-disc text-[1rem]">
      <li>중앙행정기관: 행정안전부</li>
      <li>전문기관: 한국지역정보개발원</li>
      <li>사업명: 국민수요 맞춤형 생활안전 연구개발사업</li>
      <li>과제명: 이륜차 착한운전 평가 기술개발</li>
      <li>주관기관(연구책임자): 서울시립대학교 산학협력단(전철민 교수)</li>
    </ul>
  </section>
);

export default GreetingMessage;
