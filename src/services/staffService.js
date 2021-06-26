import axios from "axios";

export default class StaffService {
  getStaffs() {
    return axios.get("http://localhost:8080/api/staff/getall");
  }
  getById(id) {
    return axios.get("http://localhost:8080/api/staff/getbyid?id=" + id);
  }
  update(values) {
    return axios.post("http://localhost:8080/api/staff/update", values);
  }
  add(values) {
    return axios.post("http://localhost:8080/api/staff/add", values);
  }
}
