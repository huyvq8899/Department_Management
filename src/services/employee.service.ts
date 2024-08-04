import axios from 'axios';
import { Employee } from '@/models/Employee';

// Lấy URL từ biến môi trường
const API_URL = `${process.env.VUE_APP_API_URL}/employees`;

// Tạo đối tượng chứa các phương thức API
const employeeService = {
  // Lấy danh sách nhân viên
  fetchEmployees() {
    return axios.get<Employee[]>(API_URL);
  },
  
  // Thêm nhân viên mới
  addEmployee(employee: Employee) {
    return axios.post<Employee>(API_URL, employee);
  },
  
  // Cập nhật thông tin nhân viên
  updateEmployee(employee: Employee) {
    return axios.put<Employee>(`${API_URL}/${employee.id}`, employee);
  },
  
  // Xóa nhân viên
  deleteEmployee(employeeId: number) {
    return axios.delete(`${API_URL}/${employeeId}`);
  }
};

export default employeeService;
