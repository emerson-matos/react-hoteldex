import { HTTP_METHODS } from "../globals";
import { createApiRequest } from "./axios";

class ApiCallCreator {
  getPokemons() {
    return createApiRequest(
      `/google`,
      HTTP_METHODS.GET,
      {}
    );
  }
  getPokemonByNameOrId(id: number | string) {
    return createApiRequest(`/pokemon/${id}/`, HTTP_METHODS.GET, {});
  }
}

const fromApi = new ApiCallCreator();
export default fromApi;
