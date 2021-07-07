import axios from "axios";
import { endpoints } from "../endpoints";

export default class WorkProgramService {
  apiUrl = endpoints.apiUrl;
  getWorkPrograms() {
    return axios.get(this.apiUrl + "/workprogram/getall");
  }
}
