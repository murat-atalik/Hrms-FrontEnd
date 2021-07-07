import axios from "axios";
import { endpoints } from "../endpoints";

export default class ExperienceService {
  apiUrl = endpoints.apiUrl;
  delete(id) {
    axios.delete(this.apiUrl + "/experiences?id=" + id);
  }
}
