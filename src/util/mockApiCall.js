import {
  API_RESPONSE_DELAY,
  IS_API_RESPONSE_SUCCESSFUL,
} from "../constants/constants";
import response from "../data/apiResponse";

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
  const end = +url.split("/").pop();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response.slice(end - 10, end));
    }, API_RESPONSE_DELAY);
  });
};
