import axios from "axios";
import { endpoints } from "../endpoints";

export default class FavoriteJobService {
  apiUrl = endpoints.apiUrl;
  getAll() {
    return axios.get(this.apiUrl + "/favoriteJob/getall");
  }
  add(values) {
    return axios.post(this.apiUrl + "/favoriteJob/add", values);
  }
  delete(id) {
    return axios.delete(this.apiUrl + "/favoriteJob/delete?id=" + id);
  }
  getAllByCandidateId(id) {
    return axios.get(this.apiUrl + "/favoriteJob/getallbycandidateid?id=" + id);
  }
}
