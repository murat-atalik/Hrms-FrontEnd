import axios from "axios";
import { endpoints } from "../endpoints";

export default class UpdateCompanyService {
  apiUrl = endpoints.apiUrl;
  getAll() {
    return axios.get(this.apiUrl + "/updatecompany/getall");
  }
  getByEmployerId(id) {
    return axios.get(this.apiUrl + "/updatecompany/getbyid?id=" + id);
  }
  getByCompanyId(id) {
    return axios.get(this.apiUrl + "/updatecompany/getbyid?id=" + id);
  }
  add(values) {
    return axios.post(this.apiUrl + "/updatecompany/add", values);
  }
  update(id) {
    return axios.post(this.apiUrl + "/updatecompany//update?id=" + id);
  }

  delete(id) {
    return axios.post(this.apiUrl + "/updatecompany/delete?id=" + id);
  }
}
