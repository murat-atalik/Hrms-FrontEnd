import axios from "axios";

export default class AbilityService {
  delete(id) {
    axios.delete("http://localhost:8080/api/abilities?id=" + id);
  }
}
