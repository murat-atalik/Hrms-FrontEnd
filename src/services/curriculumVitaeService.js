import axios from "axios";
import { endpoints } from "../endpoints";

export default class CurriculumVitaeService {
  apiUrl = endpoints.apiUrl;
  getCv() {
    return axios.get(this.apiUrl + "/cv/getAll");
  }
  getById(id) {
    return axios.get(this.apiUrl + "/cv/getbyid?id=" + id);
  }
  addCv(values) {
    return axios.post(this.apiUrl + "/cv/add", values);
  }
  update(values) {
    return axios.post(this.apiUrl + "/cv/update", values);
  }
  addImage(file) {
    return axios.post(this.apiUrl + "/cv/addFile", file);
  }
}
