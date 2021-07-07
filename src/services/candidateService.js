import axios from "axios";
import { endpoints } from "../endpoints";

export default class CandidateService {
  apiUrl = endpoints.apiUrl;
  getCandidate() {
    return axios.get(this.apiUrl + "/candidates/getall");
  }
}
