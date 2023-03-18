import { rejects } from "assert";
import { resolve } from "path";
import { getCookie } from "./authenticate";

const httpService = {
  get: function (url: string): Promise<any> {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        Authorization: "Bearer " + getCookie(),
      },
    };
    return new Promise((resolve, reject) => {
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then(
          (data) => {
            resolve(data);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  },

  post: function (url: string, body: Object): Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        Authorization: "Bearer " + getCookie(),
      },
      body: JSON.stringify(body),
    };
    return new Promise((resolve, reject) => {
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then(
          (data) => {
            resolve(data);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  },

  put: function (url: string, body: Object): Promise<any> {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return new Promise((resolve, reject) => {
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then(
          (data) => {
            resolve(data);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  },

  patch: function (url: string, body: Object): Promise<any> {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return new Promise((resolve, reject) => {
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then(
          (data) => {
            resolve(data);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  },

  delete: function (url: string): Promise<any> {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        Authorization: "Bearer " + getCookie(),
      },
    };
    return new Promise((resolve, reject) => {
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then(
          (data) => {
            resolve(data);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  },
};

export default httpService;
