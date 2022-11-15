import Axios from "axios";
import { HTTP_METHODS } from "../globals";

const axios = Axios.create({
  baseURL: "http://localhost:8080/",
});

export const createApiRequest = async (
  url: string,
  method: HTTP_METHODS,
  apikey: string,
  data: any
) => {
  try {
    const response = await axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Google-Authorization": apikey,
      },
      data,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
    // const statusCode = err.response.status;
    // const messages = err.response.data.data[0].messages;
    // throw new Error(JSON.stringify({ statusCode, messages }));
  }
};
export const baseImageUrl =
  "https://raw.githubusercontent.com/HybridShivam/Hotel/master/assets/images/";

export default axios;
