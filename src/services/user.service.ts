// src/services/user.service.ts

import axios from 'axios';
import { User } from '@/models/User';
import { getHeaders } from '@/utils/headerHelper';

interface RegisterUser {
  email: string;
  password: string;
}

const API_URL = `${process.env.VUE_APP_API_URL}/api/Users`; // Cập nhật URL API

// Get list of users with pagination
export const getUsersWithPagination = async (PageNumber: number, PageSize: number): Promise<{ items: User[], totalCount: number }> => {
  try {
    const response = await axios.get(`${API_URL}/GetUsersWithPagination`, {
      params: { PageNumber, PageSize }, // Sử dụng đúng tên tham số
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
    const response = await axios.get(`${API_URL}/CheckEmailUserDuplicate`, {
      params: { Email : email },
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error checking duplicate email:', error);
    throw error;
  }
};

export async function createUser({ email, password }: { email: string, password: string }) {
  try {
    const response = await axios.post(`${API_URL}/CreateUser`, null, {
      params: { Email: email, Password: password },
    });
    return response.data; // Giả sử API trả về userId hoặc dữ liệu cần thiết khác
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

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



export const registerUser = async (user: RegisterUser) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email: user.email,
      password: user.password,
    });
    console.log("🚀 ~ registerUser ~ response.data:", response.data)

    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};