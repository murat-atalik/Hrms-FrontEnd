import axios from "axios";

export default class WorkProgramService {
  getWorkPrograms() {
    return axios.get("http://localhost:8080/api/workprogram/getall");
  }
}
