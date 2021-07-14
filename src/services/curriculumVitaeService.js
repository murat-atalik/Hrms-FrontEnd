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
  getByCandidateIdActive(id) {
    return axios.get(this.apiUrl + "/cv/getbycandidateid-active?id=" + id);
  }
  getByCandidateIdPassive(id) {
    return axios.get(this.apiUrl + "/cv/getbycandidateid-passive?id=" + id);
  }
  addCv(values) {
    return axios.post(this.apiUrl + "/cv/add", values);
  }
  delete(id) {
    return axios.delete(this.apiUrl + "/cv/delete?id=" + id);
  }
  changeStatus(id) {
    return axios.post(this.apiUrl + "/cv/changestatus?id=" + id);
  }
  update(values) {
    return axios.post(this.apiUrl + "/cv/update", values);
  }
  addImage(file) {
    return axios.post(this.apiUrl + "/cv/addFile", file);
  }
}
