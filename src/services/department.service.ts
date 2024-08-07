// services/departmentService.ts
import axios from 'axios';
import { Department } from '@/models/Department'; // Cập nhật đường dẫn đến mô hình Department của bạn
import { getHeaders } from '@/utils/headerHelper'; // Import getHeaders

const API_URL = `${process.env.VUE_APP_API_URL}/api/department`; // Cập nhật URL API của bạn

// Get list of departments with pagination
export const getDepartmentsWithPagination = async (pageNumber: number, pageSize: number): Promise<Department[]> => {
  try {
    const response = await axios.get(`${API_URL}/GetDepartmentWithPagination`, {
      params: { pageNumber, pageSize },
      headers: getHeaders() // Thêm headers vào yêu cầu
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching departments with pagination:', error);
    throw error;
  }
};

// Get list of departments
export const getDepartmentsList = async (): Promise<Department[]> => {
  try {
    const response = await axios.get(`${API_URL}/GetDepartmentList`, {
      headers: getHeaders() // Thêm headers vào yêu cầu
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching departments list:', error);
    throw error;
  }
};

// Create a new department
export const createDepartment = async (department: Department): Promise<Department> => {
  try {
    const response = await axios.post(`${API_URL}/CreateDepartment`, department, {
      headers: getHeaders() // Thêm headers vào yêu cầu
    });
    return response.data;
  } catch (error) {
    console.error('Error creating department:', error);
    throw error;
  }
};

// Update an existing department
export const updateDepartment = async (id: string, department: Department): Promise<Department> => {
  try {
    const response = await axios.put(`${API_URL}/UpdateDepartment/${id}`, department, {
      headers: getHeaders() // Thêm headers vào yêu cầu
    });
    return response.data;
  } catch (error) {
    console.error('Error updating department:', error);
    throw error;
  }
};

// Delete a department
export const deleteDepartment = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/DeleteDepartment/${id}`, {
      headers: getHeaders() // Thêm headers vào yêu cầu
    });
  } catch (error) {
    console.error('Error deleting department:', error);
    throw error;
  }
};
