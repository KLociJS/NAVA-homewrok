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
      if (process.env.REACT_APP_IS_API_RESPONSE_SUCCESSFUL === "true") {
        resolve({ ok: true, message: successMessage });
      } else {
        resolve({ ok: false, message: errorMessage });
      }
    }, process.env.REACT_APP_API_RESPONSE_DELAY);
  });
}

export const mockApiGetCall = (url) => {
  const response = JSON.parse(JSON.stringify(data));
  const end = +url.split("/").pop();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response.response.docs.slice(end - 10, end));
    }, process.env.REACT_APP_API_RESPONSE_DELAY);
  });
};
