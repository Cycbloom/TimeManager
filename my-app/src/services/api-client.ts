import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000", // 添加协议
});
