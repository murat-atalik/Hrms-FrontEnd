import axios from "axios";
import { endpoints } from "../endpoints";

export default class JobAdvertApplyService {
  apiUrl = endpoints.apiUrl;
  add(values) {
    return axios.post(this.apiUrl + "/jobadvertapplies/add", values);
  }
  delete(id) {
    return axios.delete(this.apiUrl + "/jobadvertapplies/delete?id=" + id);
  }

  getByCandidateId(id) {
    return axios.get(
      this.apiUrl + "/jobadvertapplies/getByCandidateId?id=" + id
    );
  }
  getById(id) {
    return axios.get(this.apiUrl + "/jobadvertapplies/getById?id=" + id);
  }
  checkApply(candidateId, jobAdvertId) {
    return axios.get(
      this.apiUrl +
        "/jobadvertapplies/checkapply?candidateId=" +
        candidateId +
        "&jobAdvertId=" +
        jobAdvertId
    );
  }
  getByJobAdvertId(id) {
    return axios.get(
      this.apiUrl + "/jobadvertapplies/getByJobAdvertId?id=" + id
    );
  }
  getApproved(id) {
    return axios.get(this.apiUrl + "/jobadvertapplies/getApproved?id=" + id);
  }
  getDenied(id) {
    return axios.get(this.apiUrl + "/jobadvertapplies/getDenied?id=" + id);
  }
  getPending(id) {
    return axios.get(this.apiUrl + "/jobadvertapplies/getPending?id=" + id);
  }
  statusApproved(id) {
    return axios.post(
      this.apiUrl + "/jobadvertapplies/statusApproved?id=" + id
    );
  }
  statusDenied(id) {
    return axios.post(this.apiUrl + "/jobadvertapplies/statusDenied?id=" + id);
  }
  statusPending(id) {
    return axios.post(this.apiUrl + "/jobadvertapplies/statusPending?id=" + id);
  }
}
