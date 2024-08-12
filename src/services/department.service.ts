import axios from 'axios';
import { Department } from '@/models/Department'; 
import { getHeaders } from '@/utils/headerHelper'; 

const API_URL = `${process.env.VUE_APP_API_URL}/api`; 

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

export const getDepartmentsList = async (): Promise<Department[]> => {
  try {
    const response = await axios.get(`${API_URL}/Departments`, {
      headers: getHeaders() 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching departments list:', error);
    throw error;
  }
};

export const checkCodeDuplicate = async (code: string): Promise<boolean> => {
    try {
      const response = await axios.get(`${API_URL}/Departments/CheckCodeDuplicateDepartment`, {
        params: { code }, 
        headers: getHeaders(),
      });
  
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
      headers: getHeaders() 
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
      headers: getHeaders() 
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
      headers: getHeaders() 
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
    const response = await axios.get(`${API_URL}/Departments/CheckUsedDepartment`, {
      params: { id },
      headers: getHeaders(), 
    });
    console.log("🚀 ~ CheckUsedDepartment ~ response.data:", response)
    console.log("🚀 ~ CheckUsedDepartment ~ response.data:", response.data)

    return response.data; 
  } catch (error) {
    console.error('Error checking duplicate department code:', error);
    throw error;
  }
};