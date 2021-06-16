import axios from "axios";

export default class JobAdvertisementService {
  getJobAdvert() {
    return axios.get("http://localhost:8080/api/jobadvertisement/getAll");
  }
  add(values) {
    return axios.post("http://localhost:8080/api/jobadvertisement/add", values);
  }
}
