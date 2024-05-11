import axios from "axios";

export const BaseURL = {
  // Api: "http://localhost:4000",
  Api: "https://eco-inventro-server.vercel.app",
};

const getUserToken = () => {
  // Check if window is defined before accessing it
  if (typeof window !== "undefined") {
    return window.sessionStorage.getItem("token") || null;
  }
  return null;
};

export const HandleAllRequest = async (
  URL,
  type,
  access_token,
  jsonData
  // token
) => {
  console.log("userToken", getUserToken());
  const request = type;
  let apiClient = axios.create({
    baseURL: BaseURL.Api,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: `Bearer ${getUserToken()}`,
    },
    // cancelToken: token,
  });

  switch (request) {
    case "post":
      let postResponse = await apiClient.post(URL, jsonData).catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.localStorage.clear();
          sessionStorage.clear();
          window.location.replace("/");
        }
        return err.response?.data;
      });

      return postResponse?.data || postResponse;

    case "put":
      let putResponse = await apiClient.put(URL, jsonData).catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.localStorage.clear();
          sessionStorage.clear();
          window.location.replace("/");
        }
        return err.response?.data;
      });

      return putResponse?.data || putResponse;

    case "get":
      let getResponse = await apiClient.get(URL).catch((err) => {
        let errResponse =
          err.response?.status == undefined
            ? navigator.onLine
              ? { message: "Possible network error" }
              : { message: "No internet connection" }
            : err?.response?.data;
        let errRespData = {
          error: errResponse?.message,
        };
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.localStorage.clear();
          sessionStorage.clear();
          window.location.replace("/");
        }
        return errRespData;
      });
      return getResponse?.data || getResponse;

    case "patch":
      let patchResponse = await apiClient.patch(URL, jsonData).catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.localStorage.clear();
          sessionStorage.clear();
          window.location.replace("/");
        }
        return err.response?.data;
      });

      return patchResponse?.data || patchResponse;

    case "delete":
      let deleteResponse = await apiClient.delete(URL).catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.localStorage.clear();
          sessionStorage.clear();
          window.location.replace("/");
        }
        return err.response?.data;
      });

      return deleteResponse?.data || deleteResponse;
    default:
      return null;
  }
};
