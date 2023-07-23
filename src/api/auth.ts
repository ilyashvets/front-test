import axios from './axios';

export const fetchLogin = async (data: LoginData.Request) =>
  axios.get('/users/current/', {
    auth: {
      username: data.username,
      password: data.password,
    },
  });

export const fetchRegister = async (data: RegisterData.Request) =>
  axios.post('/users/', data);
