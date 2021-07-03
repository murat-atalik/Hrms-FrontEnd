import axios from "axios";

export default class CurriculumVitaeService {
  getCv() {
    return axios.get("http://localhost:8080/api/cv/getAll");
  }
  getById(id) {
    return axios.get("http://localhost:8080/api/cv/getbyid?id=" + id);
  }
  addCv(values) {
    return axios.post("http://localhost:8080/api/cv/add", values);
  }
  addImage(file) {
    return axios.post("http://localhost:8080/api/cv/addFile", file);
  }
}
