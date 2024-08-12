// src/services/roleService.ts

import axios from 'axios';
import { Role } from '@/models/Role';
import { getHeaders } from '@/utils/headerHelper';

const mockRoles: Role[] = [
  { id: '1', code: 'ADMIN', name: 'Admin', description: 'Administrator with full access', permissions: ['manage_users', 'manage_roles'] },
  { id: '2', code: 'USER', name: 'User', description: 'Regular user with limited access', permissions: ['view_content'] },
];

// Mock API functions
export async function fetchRoles(): Promise<Role[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRoles;
}

export async function addRole(role: Role): Promise<Role> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newRole = { ...role, id: (mockRoles.length + 1).toString() }; // Mock ID generation
  mockRoles.push(newRole);
  return newRole;
}

export async function updateRole(role: Role): Promise<Role> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockRoles.findIndex(r => r.id === role.id);
  if (index !== -1) {
    mockRoles[index] = role;
    return role;
  }
  throw new Error('Role not found');
}

export async function deleteRole(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockRoles.findIndex(r => r.id === id);
  if (index !== -1) {
    mockRoles.splice(index, 1);
    return;
  }
  throw new Error('Role not found');
}
