import axios from "axios";
import { endpoints } from "../endpoints";

export default class StaffService {
  apiUrl = endpoints.apiUrl;
  getStaffs() {
    return axios.get(this.apiUrl + "/staff/getall");
  }
  getById(id) {
    return axios.get(this.apiUrl + "/staff/getbyid?id=" + id);
  }
  update(values) {
    return axios.post(this.apiUrl + "/staff/update", values);
  }
  add(values) {
    return axios.post(this.apiUrl + "/staff/add", values);
  }
}
