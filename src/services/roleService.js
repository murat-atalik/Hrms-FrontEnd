import axios from "axios";
import { endpoints } from "../endpoints";

export default class RoleService {
  apiUrl = endpoints.apiUrl;

  getRoles() {
    return axios.get(this.apiUrl + "/roles/getall");
  }
  addRole(values) {
    return axios.get(this.apiUrl + "/roles/add", values);
  }
}
