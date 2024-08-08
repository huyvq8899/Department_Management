export interface Department {
  id: string;
  code: string;
  name: string;
  description?: string;
}

export interface RootState {
  departments: Department[];
}
