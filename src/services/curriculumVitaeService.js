import axios from "axios";

export default class CurriculumVitaeService {
  getCv() {
    return axios.get("http://localhost:8080/api/cv/getAll");
  }
}
