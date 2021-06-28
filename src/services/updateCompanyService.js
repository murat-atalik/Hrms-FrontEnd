import axios from "axios";

export default class UpdateCompanyService {
  getAll() {
    return axios.get("http://localhost:8080/api/updatecompany/getall");
  }
  getByEmployerId(id) {
    return axios.get(
      "http://localhost:8080/api/updatecompany/getbyid?id=" + id
    );
  }
  getByCompanyId(id) {
    return axios.get(
      "http://localhost:8080/api/updatecompany/getbyid?id=" + id
    );
  }
  add(values) {
    return axios.post("http://localhost:8080/api/updatecompany/add", values);
  }
  update(id) {
    return axios.post(
      "http://localhost:8080/api/updatecompany//update?id=" + id
    );
  }

  delete(id) {
    return axios.post(
      "http://localhost:8080/api/updatecompany/delete?id=" + id
    );
  }
}
