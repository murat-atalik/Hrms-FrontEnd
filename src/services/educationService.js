import axios from "axios";
import { endpoints } from "../endpoints";

export default class EducationService {
  apiUrl = endpoints.apiUrl;
  delete(id) {
    axios.delete(this.apiUrl + "/educations?id=" + id);
  }
}
