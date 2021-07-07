import axios from "axios";
import { endpoints } from "../endpoints";

export default class JobAdvertisementService {
  apiUrl = endpoints.apiUrl;
  getJobAdvert() {
    return axios.get(this.apiUrl + "/jobadvertisement/getAll");
  }
  add(values) {
    return axios.post(this.apiUrl + "/jobadvertisement/add", values);
  }
  getByCompanyId(id) {
    return axios.get(this.apiUrl + "/jobadvertisement/getByCompany?id=" + id);
  }
  getByEmployerId(id) {
    return axios.get(this.apiUrl + "/jobadvertisement/getByEmployer?id=" + id);
  }
  getFilteredJobs(filterOption) {
    return axios.post(
      this.apiUrl + "/jobadvertisement/getAllFiltered",
      filterOption
    );
  }
}
