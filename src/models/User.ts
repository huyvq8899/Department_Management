export interface User {
  id: string;
  fullName: string;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  departmentId: string | null;
  permissions?: string[];
  password?: string;
  departmentName?: string;
}