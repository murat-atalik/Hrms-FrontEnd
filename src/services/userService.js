import axios from "axios";
import { endpoints } from "../endpoints";

export default class UserService {
  apiUrl = endpoints.apiUrl;
  login(values) {
    return axios.post(this.apiUrl + "/users/login", values);
  }
  changePassword(values) {
    return axios.post(this.apiUrl + "/users/changePassword", values);
  }
  forgotPassword(values) {
    return axios.post(this.apiUrl + "/users/forgotPassword", values);
  }
}
