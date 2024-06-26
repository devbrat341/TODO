import axios from "axios";

export const BASE_URL ="http://localhost:9000/api";


export const callApi = async (method, url, data) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: method, 
      data,
      cancelToken: null,
      headers,
      responseType: "json",
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        // console.log("ERROR in calling API", err);

        if (err.response) {
          reject(err.response.data);
        } else {
          reject(err);
        }
      });
  });
};
