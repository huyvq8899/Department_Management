export interface Department {
    id: number;
    name: string;
    description: string;
  }
  
  export interface RootState {
    departments: Department[];
  }
  