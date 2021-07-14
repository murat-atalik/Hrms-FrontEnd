import axios from "axios";
import { endpoints } from "../endpoints";

export default class EmployerService {
  apiUrl = endpoints.apiUrl;
  add(values) {
    return axios.post(this.apiUrl + "/employers/add", values);
  }
  getEmployer() {
    return axios.get(this.apiUrl + "/employers/getAll");
  }
  getUnConfirmed() {
    return axios.get(this.apiUrl + "/employers/getUnConfirmed");
  }
  getByEmployerId(id) {
    return axios.get(this.apiUrl + "/employers/getbyid?id=" + id);
  }
  changeConfirmStatus(id) {
    return axios.post(
      this.apiUrl + "/employers/changeSystemConfirmStatus?id=" + id
    );
  }
  delete(id) {
    return axios.delete(this.apiUrl + "/employers/delete?id=" + id);
  }
}
