import axios from "axios";
import { endpoints } from "../endpoints";

export default class RoleService {
  apiUrl = endpoints.apiUrl;

  getRoles() {
    return axios.get(this.apiUrl + "/roles/getall");
  }
  add(values) {
    return axios.get(this.apiUrl + "/roles/add", values);
  }
  update(values) {
    return axios.get(this.apiUrl + "/roles/update", values);
  }
}
