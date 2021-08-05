import axios from "axios";
import { endpoints } from "../endpoints";

export default class CandidateService {
  apiUrl = endpoints.apiUrl;
  getCandidate() {
    return axios.get(this.apiUrl + "/candidates/getall");
  }
  getById(id) {
    return axios.get(this.apiUrl + "/candidates/getbyid?id=" + id);
  }
  add(values) {
    return axios.post(this.apiUrl + "/candidates/add", values);
  }
  update(values) {
    return axios.post(this.apiUrl + "/candidates/update", values);
  }
}
