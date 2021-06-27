import axios from "axios";

export default class FavoriteJobService {
  getAll() {
    return axios.get("http://localhost:8080/api/favoriteJob/getall");
  }
  add(values) {
    return axios.post("http://localhost:8080/api/favoriteJob/add", values);
  }
  delete(id) {
    return axios.post("http://localhost:8080/api/favoriteJob/delete?id=");
  }
  getAllByCandidateId(id) {
    return axios.get(
      "http://localhost:8080/api/favoriteJob/getallbycandidateid?id=" + id
    );
  }
}
