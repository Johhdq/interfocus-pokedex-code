import axios from "axios";

const api = axios.create({
    // Colocar o host e a porta na qual vai rodar
    baseURL: "http://192.168.11.3:3000"
});

export default api;