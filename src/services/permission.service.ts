import axios from 'axios';
import { Permission } from '@/models/Permission';
import { getHeaders } from '@/utils/headerHelper';

const API_URL = '/api';

export async function fetchPermissions(): Promise<Permission[]> {
  const response = await axios.get(`${API_URL}/permissions`);
  return response.data;
}

export async function addPermission(permission: Permission): Promise<Permission> {
  const response = await axios.post(`${API_URL}/permissions`, permission, {
    headers: getHeaders(),
  });
  return response.data;
}

export async function updatePermission(permission: Permission): Promise<Permission> {
  const response = await axios.put(`${API_URL}/permissions/${permission.id}`, permission, {
    headers: getHeaders(),
  });
  return response.data;
}

export async function deletePermission(id: number): Promise<void> {
  await axios.delete(`${API_URL}/permissions/${id}`);
}
