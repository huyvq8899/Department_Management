// src/services/user.service.ts

import axios from 'axios';
import { User } from '@/models/User';
import { getHeaders } from '@/utils/headerHelper';

const API_URL = `${process.env.VUE_APP_API_URL}/api/users`; // Cập nhật URL API

// Get list of users with pagination
export const getUsersWithPagination = async (pageNumber: number, pageSize: number): Promise<{ items: User[], totalCount: number }> => {
  try {
    const response = await axios.get(`${API_URL}/GetUsersWithPagination`, {
      params: { pageNumber, pageSize },
      headers: getHeaders(),
    });
    return {
      items: response.data.items,
      totalCount: response.data.totalCount,
    };
  } catch (error) {
    console.error('Error fetching users with pagination:', error);
    throw error;
  }
};

// Get list of users
export const getUsersList = async (): Promise<User[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users list:', error);
    throw error;
  }
};

// Check for duplicate email
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/CheckEmailDuplicate`, {
      params: { email },
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error checking duplicate email:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.post(API_URL, user, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async (id: string, user: User): Promise<User> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, user, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getHeaders(),
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
