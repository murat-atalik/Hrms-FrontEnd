import axios from "axios";

export default class ExperienceService {
  delete(id) {
    axios.delete("http://localhost:8080/api/experiences?id=" + id);
  }
}
