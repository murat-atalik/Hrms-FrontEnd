import axios from "axios";

export default class JobAdvertisementService {
  getJobAdvert() {
    return axios.get("http://localhost:8080/api/jobadvertisement/getAll");
  }
}
