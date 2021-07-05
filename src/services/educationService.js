import axios from "axios";

export default class EducationService {
  delete(id) {
    axios.delete("http://localhost:8080/api/educations?id=" + id);
  }
}
