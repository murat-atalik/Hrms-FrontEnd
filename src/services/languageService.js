import axios from "axios";

export default class LanguageService {
  delete(id) {
    axios.delete("http://localhost:8080/api/languages?id=" + id);
  }
}
