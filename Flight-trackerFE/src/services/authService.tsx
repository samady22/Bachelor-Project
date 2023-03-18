import axios from "axios";
import { getCookie } from "./authenticate";
axios.defaults.headers.common["Authorization"] = "Bearer " + getCookie();
axios.defaults.headers.post["Content-Type"] = "application/json";
const authService = {
  signUp: function (data: any) {
    return axios({
      method: "post",
      withCredentials: true,
      url: process.env.REACT_APP_API_URL + `/api/auth/signup`,
      data: data,
    })
      .then((response: any) => response)
      .catch((err: any) => console.log(err));
    // return httpService
    //   .post(process.env.REACT_APP_API_URL + `/api/auth/signup`, data)
    //   .then((response) => {
    //     return response;
    //   });
  },

  signIn: function (data: any) {
    return axios({
      method: "post",
      withCredentials: true,
      url: process.env.REACT_APP_API_URL + `/api/auth/signin`,
      data: data,
    })
      .then((response: any) => response)
      .catch((err: any) => console.log(err));
  },

  signOut: function () {
    return axios({
      method: "get",
      withCredentials: true,
      url: process.env.REACT_APP_API_URL + `/api/auth/logout`,
    })
      .then((response: any) => response)
      .catch((err: any) => console.log(err));
  },

  googleAuth: function () {
    return axios({
      method: "get",
      withCredentials: true,
      url: process.env.REACT_APP_API_URL + `/api/auth/google`,
    })
      .then((response: any) => response)
      .catch((err: any) => console.log(err));
  },

  googleLogin: function () {
    return axios({
      method: "get",
      withCredentials: true,
      url: process.env.REACT_APP_API_URL + `/api/auth/google/callback`,
    })
      .then((response: any) => response)
      .catch((err: any) => console.log(err));
    // return httpService
    //   .get(process.env.REACT_APP_API_URL + `/api/auth/google/callback`)
    //   .then((response) => {
    //     return response;
    //   });
  },
};
export default authService;
