import httpService from "./httpService";

const userService = {
  createUser: function (data: any) {
    return httpService
      .post(process.env.REACT_APP_API_URL + `users`, data)
      .then((response) => {
        return response;
      });
  },
};

export default userService;
