import axios from 'axios';
import { User } from '@/models/User';

const API_URL = 'http://localhost:3000/api/users'; // Mock API URL

export default {
  fetchUsers() {
    return axios.get<User[]>(API_URL);
  },
  fetchUser(id: number) {
    return axios.get<User>(`${API_URL}/${id}`);
  },
  addUser(user: User) {
    return axios.post<User>(API_URL, user);
  },
  updateUser(user: User) {
    return axios.put<User>(`${API_URL}/${user.id}`, user);
  },
  deleteUser(userId: number) {
    return axios.delete(`${API_URL}/${userId}`);
  }
};
