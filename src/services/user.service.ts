import axios from 'axios';
import { User } from '@/models/User';
import { getHeaders } from '@/utils/headerHelper';


const API_URL = process.env.VUE_APP_API_URL + '/api/Users'; 

export default {
  fetchUsers() {
    return axios.get<User[]>(API_URL, { headers: getHeaders() });
  },
  fetchUser(id: number) {
    return axios.get<User>(`${API_URL}/${id}`, { headers: getHeaders() });
  },
  addUser(user: User) {
    return axios.post<User>(API_URL, user, { headers: getHeaders() });
  },
  updateUser(user: User) {
    return axios.put<User>(`${API_URL}/${user.id}`, user, { headers: getHeaders() });
  },
  deleteUser(userId: number) {
    return axios.delete(`${API_URL}/${userId}`, { headers: getHeaders() });
  }
};
