// src/services/roleService.ts

import axios from 'axios';
import { Role } from '@/models/Role';
import { getHeaders } from '@/utils/headerHelper';

// Define some mock roles data
const mockRoles: Role[] = [
  { id: '1', code: 'ADMIN', name: 'Admin', description: 'Administrator with full access', permissions: ['manage_users', 'manage_roles'] },
  { id: '2', code: 'USER', name: 'User', description: 'Regular user with limited access', permissions: ['view_content'] },
  { id: '3', code: 'MODERATOR', name: 'Moderator', description: 'Moderator with content management access', permissions: ['manage_content'] },
];

// Mock API functions
export async function fetchRoles(): Promise<Role[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRoles;
}

export async function addRole(role: Role): Promise<Role> {
  await new Promise(resolve => setTimeout(resolve, 500));
  // Mock adding role by pushing to the array
  const newRole = { ...role, id: (mockRoles.length + 1).toString() }; // Mock ID generation
  mockRoles.push(newRole);
  return newRole;
}

export async function updateRole(role: Role): Promise<Role> {
  await new Promise(resolve => setTimeout(resolve, 500));
  // Mock updating role by replacing in the array
  const index = mockRoles.findIndex(r => r.id === role.id);
  if (index !== -1) {
    mockRoles[index] = role;
    return role;
  }
  throw new Error('Role not found');
}

export async function deleteRole(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));
  // Mock deleting role by filtering out from the array
  const index = mockRoles.findIndex(r => r.id === id);
  if (index !== -1) {
    mockRoles.splice(index, 1);
    return;
  }
  throw new Error('Role not found');
}
