export interface Department {
    id: string;
    name: string;
    description?: string;
  }
  
  export interface RootState {
    departments: Department[];
  }
  