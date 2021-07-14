import axios from "axios";
import { endpoints } from "../endpoints";

export default class UserService {
  apiUrl = endpoints.apiUrl;
  login(values) {
    return axios.post(this.apiUrl + "/users/login", values);
  }
}
