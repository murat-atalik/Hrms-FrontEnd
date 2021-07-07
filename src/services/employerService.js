import axios from "axios";
import { endpoints } from "../endpoints";

export default class EmployerService {
  apiUrl = endpoints.apiUrl;
  getEmployer() {
    return axios.get(this.apiUrl + "/employers/getAll");
  }
  getByEmployerId(id) {
    return axios.get(this.apiUrl + "/employers/getbyid?id=" + id);
  }
}
