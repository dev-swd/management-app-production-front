import axios from "axios";

const client = axios.create({
  baseURL: "http://18.179.36.132/api/v1"
})

export default client;