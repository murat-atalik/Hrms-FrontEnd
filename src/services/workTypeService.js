import axios from "axios";
import { endpoints } from "../endpoints";

export default class WorkTypeService {
  apiUrl = endpoints.apiUrl;
  getWorkTypes() {
    return axios.get(this.apiUrl + "/worktype/getall");
  }
  add(values) {
    return axios.get(this.apiUrl + "/worktype/add", values);
  }
  update(values) {
    return axios.get(this.apiUrl + "/worktype/update", values);
  }
}
