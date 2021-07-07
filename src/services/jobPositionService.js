import axios from "axios";
import { endpoints } from "../endpoints";

export default class JobPositionService {
  apiUrl = endpoints.apiUrl;
  getJobPositions() {
    return axios.get(this.apiUrl + "/job_positions/getall");
  }
}
