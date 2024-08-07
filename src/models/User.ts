export interface User {
  id: string; // Đổi từ number thành string để phù hợp với UUID
  userName: string; // Tương ứng với `username` trong JSON
  fullName: string; // Tương ứng với `name` trong JSON
  email: string | null; // Có thể là null
  phoneNumber: string | null; // Có thể là null
  address: string | null; // Có thể là null
  departmentId: string | null; // Có thể là null
  // Tùy chọn: thêm thuộc tính permissions nếu cần thiết
  permissions?: string[]; 
  password?: string
}
