import httpService from "./httpService";
const flightService = {
  getFlight: async function (num: any) {
    const response = await httpService.get(
      process.env.REACT_APP_API_URL + `/flight/${num}`
    );
    return response;
  },
  saveFlight: async function (data: any) {
    const response = await httpService.post(
      process.env.REACT_APP_API_URL + `/flight/save`,
      data
    );
    return response;
  },

  getFlightByUemail: async function (email: any) {
    const response = await httpService.get(
      process.env.REACT_APP_API_URL + `/flight/get/${email}`
    );
    return response;
  },

  getFlightByFlightNum: async function (flightNum: any) {
    const response = await httpService.get(
      process.env.REACT_APP_API_URL + `/flight/data/${flightNum}`
    );
    return response;
  },

  getSharedFlight: async function (shared_id: any) {
    const response = await httpService.get(
      process.env.REACT_APP_API_URL + `/flight/share/${shared_id}`
    );
    return response;
  },

  getAllFlights: async function () {
    const response = await httpService.get(
      process.env.REACT_APP_API_URL + `/flight/`
    );
    return response;
  },

  deleteFlights: async function (shareId: any) {
    const response = await httpService.delete(
      process.env.REACT_APP_API_URL + `/flight/delete/${shareId}`
    );
    return response;
  },
};

export default flightService;
