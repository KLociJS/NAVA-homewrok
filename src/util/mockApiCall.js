import {
  API_RESPONSE_DELAY,
  IS_API_RESPONSE_SUCCESSFUL,
} from "../constants/constants";

import data from "../data/data.json";

export function mockPatchDeleteCall(
  url,
  method,
  errorMessage,
  successMessage,
  data
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (IS_API_RESPONSE_SUCCESSFUL) {
        resolve({ ok: true, message: successMessage });
      } else {
        resolve({ ok: false, message: errorMessage });
      }
    }, API_RESPONSE_DELAY);
  });
}

export const mockApiGetCall = (url) => {
  const response = JSON.parse(JSON.stringify(data));
  const end = +url.split("/").pop();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response.response.docs.slice(end - 10, end));
    }, API_RESPONSE_DELAY);
  });
};
