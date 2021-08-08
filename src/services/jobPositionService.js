import axios from "axios";
import { endpoints } from "../endpoints";

export default class JobPositionService {
  apiUrl = endpoints.apiUrl;
  getJobPositions() {
    return axios.get(this.apiUrl + "/job_positions/getall");
  }
  add(values) {
    return axios.post(this.apiUrl + "/job_positions/add", values);
  }
  update(values) {
    return axios.post(this.apiUrl + "/job_positions/update", values);
  }
}
