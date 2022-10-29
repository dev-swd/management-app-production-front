import axios from "axios";

const client = axios.create({
//  baseURL: "http://157.7.66.66/api/v1"
  baseURL: "https://manapp.sawa-works.com/api/v1"
})

export default client;