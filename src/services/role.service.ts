import axios from 'axios';
import { Role } from '@/models/Role';
import { getHeaders } from '@/utils/headerHelper';

const API_URL = '/api/roles';  // Đường dẫn API cụ thể cho roles

export async function fetchRoles(): Promise<Role[]> {
  const response = await axios.get(API_URL, { headers: getHeaders() });
  return response.data;
}

export async function addRole(role: Role): Promise<Role> {
  const response = await axios.post(API_URL, role, { headers: getHeaders() });
  return response.data;
}

export async function updateRole(role: Role): Promise<Role> {
  const response = await axios.put(`${API_URL}/${role.id}`, role, { headers: getHeaders() });
  return response.data;
}

export async function deleteRole(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
}
