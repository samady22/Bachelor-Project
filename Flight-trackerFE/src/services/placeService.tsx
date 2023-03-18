import httpService from "./httpService";

const restaurantService = {
  getPlaces: async function (data: any) {
    const response = await httpService.post(
      process.env.REACT_APP_API_URL + `/place`,
      data
    );
    return response;
  },
};
export default restaurantService;
