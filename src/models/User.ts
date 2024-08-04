export interface User {
    id: number;
    username: string;
    password: string; // Mật khẩu (đã mã hóa)
    name: string;
    departmentId: number;
    email: string; //
    permissions: string[]; // Ví dụ: ['add', 'edit', 'delete']
  }
  