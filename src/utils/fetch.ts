import { IQuestionnaireData } from "./questionnaireDataInterface";

const BE_URL = "/post";

export const postData = async (
  questionnaireData: IQuestionnaireData
): Promise<Response | null> => {
  try {
    const response = await fetch(BE_URL, {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "content-type": "application/json",
        "Content-Security-Policy": "upgrade-insecure-requests",
      },
      body: JSON.stringify(questionnaireData),
    });

    if (!response.ok) {
      throw response.statusText;
    }

    return response;
  } catch (e) {
    alert("데이터 전송에 실패했습니다.\n다시 시도해주세요.");
    return null;
  }
};
