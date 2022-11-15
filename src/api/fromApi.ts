import { HTTP_METHODS } from "../globals";
import { createApiRequest } from "./axios";

class ApiCallCreator {
  getHotels(apikey: string) {
    return createApiRequest(
      `/google`,
      HTTP_METHODS.GET,
      apikey,
      {}
    );
  }
  getHotelByNameOrId(id: number | string, apikey: string) {
    return createApiRequest(`/hotel/${id}/`, HTTP_METHODS.GET, apikey, {});
  }
}

const fromApi = new ApiCallCreator();
export default fromApi;
