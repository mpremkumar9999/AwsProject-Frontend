import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your AWS EC2 IP in production
});

export default API;
