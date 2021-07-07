import axios from "axios";
import { endpoints } from "../endpoints";

export default class AbilityService {
  apiUrl = endpoints.apiUrl;
  delete(id) {
    axios.delete(this.apiUrl + "/abilities?id=" + id);
  }
}
