import axios from "axios";

export default class EmployerService {
  getEmployer() {
    return axios.get("http://localhost:8080/api/employers/getAll");
  }
  getByEmployerId(id) {
    return axios.get("http://localhost:8080/api/employers/getbyid?id=" + id);
  }
}
