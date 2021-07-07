import axios from "axios";
import { endpoints } from "../endpoints";
export default class LanguageService {
  apiUrl = endpoints.apiUrl;
  delete(id) {
    axios.delete(this.apiUrl + "/languages?id=" + id);
  }
}
