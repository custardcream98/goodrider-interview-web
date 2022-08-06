import axios from "axios";

export const fetchQuestions = async () =>
  await axios.get(`questions`).then((res) => res.data);
