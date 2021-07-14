import axios from "axios";
import { endpoints } from "../endpoints";

export default class JobAdvertisementService {
  apiUrl = endpoints.apiUrl;
  getJobAdvert() {
    return axios.get(this.apiUrl + "/jobadvertisement/getAllSystemConfirmed");
  }
  getAll() {
    return axios.get(this.apiUrl + "/jobadvertisement/getAll");
  }
  getUnConfirmed() {
    return axios.get(this.apiUrl + "/jobadvertisement/getAllSystemUnConfirmed");
  }
  add(values) {
    return axios.post(this.apiUrl + "/jobadvertisement/add", values);
  }
  delete(id) {
    return axios.delete(this.apiUrl + "/jobadvertisement/delete?id=" + id);
  }
  changeConfirm(id) {
    return axios.post(
      this.apiUrl + "/jobadvertisement/changeConfirmStatus?id=" + id
    );
  }
  cahngeActive(values) {
    return axios.post(
      this.apiUrl + "/jobadvertisement/changeActiveStatus",
      values
    );
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
