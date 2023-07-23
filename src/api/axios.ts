import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://68.183.74.14:4005/api';

export default axios.create({
  baseURL,
  timeout: 5000,
});
