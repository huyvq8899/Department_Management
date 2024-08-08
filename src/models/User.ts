export interface User {
  id: string;
  userName: string;
  fullName: string;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  departmentId: string | null;
  permissions?: string[];
  password?: string;
}