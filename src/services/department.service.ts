// services/departmentService.ts
import axios from 'axios';
import { Department } from '@/models/Department'; // Cập nhật đường dẫn đến mô hình Department của bạn
import { getHeaders } from '@/utils/headerHelper'; // Import getHeaders

const API_URL = `${process.env.VUE_APP_API_URL}/api`; // Cập nhật URL API của bạn

// Get list of departments with pagination
export const getDepartmentsWithPagination = async (pageNumber: number, pageSize: number): Promise<{ items: Department[], totalCount: number }> => {
    try {
      const response = await axios.get(`${API_URL}/Departments/GetDepartmentWithPagination`, {
        params: { pageNumber, pageSize },
        headers: getHeaders(),
      });
      return {
        items: response.data.items,
        totalCount: response.data.totalCount,
      };
    } catch (error) {
      console.error('Error fetching departments with pagination:', error);
      throw error;
    }
  };

// Get list of departments
export const getDepartmentsList = async (): Promise<Department[]> => {
  try {
    const response = await axios.get(`${API_URL}/Departments`, {
      headers: getHeaders() // Thêm headers vào yêu cầu
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching departments list:', error);
    throw error;
  }
};

export const checkCodeDuplicate = async (code: string): Promise<boolean> => {
    try {
      // Make a GET request to the API endpoint
      const response = await axios.get(`${API_URL}/Departments/CheckCodeDuplicateDepartment`, {
        params: { code }, // Send code as a query parameter
        headers: getHeaders(), // Add headers to the request
      });
  
      // Assuming the API returns a boolean value indicating if the code is a duplicate
      return response.data; 
    } catch (error) {
      console.error('Error checking duplicate department code:', error);
      throw error;
    }
  };

// Create a new department
export const createDepartment = async (department: Department): Promise<Department> => {
  try {
    const response = await axios.post(`${API_URL}/Departments`, department, {
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
    const response = await axios.put(`${API_URL}/Departments/${id}`, department, {
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
    await axios.delete(`${API_URL}/Departments/${id}`, {
      headers: getHeaders() // Thêm headers vào yêu cầu
    });
  } catch (error) {
    console.error('Error deleting department:', error);
    throw error;
  }
};

/// Check Usesd Department
export const CheckUsedDepartment = async (id: string): Promise<boolean> => {
  console.log("🚀 ~ CheckUsedDepartment ~ id:", id)
  try {
    // Make a GET request to the API endpoint
    const response = await axios.get(`${API_URL}/Departments/CheckUsedDepartment`, {
      params: { id }, // Send code as a query parameter
      headers: getHeaders(), // Add headers to the request
    });
    console.log("🚀 ~ CheckUsedDepartment ~ response.data:", response)
    console.log("🚀 ~ CheckUsedDepartment ~ response.data:", response.data)

    // Assuming the API returns a boolean value indicating if the code is a duplicate
    return response.data; 
  } catch (error) {
    console.error('Error checking duplicate department code:', error);
    throw error;
  }
};