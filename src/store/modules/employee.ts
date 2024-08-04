import { Module } from 'vuex';
import { Employee } from '@/models/Employee';
import employeeService from '@/services/employee.service';

interface EmployeeState {
  employees: Employee[];
}

const employeesModule: Module<EmployeeState, any> = {
  namespaced: true,
  state: {
    employees: []
  },
  mutations: {
    setEmployees(state, employees: Employee[]) {
      state.employees = employees;
    },
    addEmployee(state, employee: Employee) {
      state.employees.push(employee);
    },
    updateEmployee(state, updatedEmployee: Employee) {
      const index = state.employees.findIndex(emp => emp.id === updatedEmployee.id);
      if (index !== -1) {
        state.employees[index] = updatedEmployee;
      }
    },
    deleteEmployee(state, employeeId: number) {
      state.employees = state.employees.filter(emp => emp.id !== employeeId);
    }
  },
  actions: {
    async fetchEmployees({ commit }) {
      try {
        const response = await employeeService.fetchEmployees();
        commit('setEmployees', response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
    async addEmployee({ commit }, employee: Employee) {
      try {
        const response = await employeeService.addEmployee(employee);
        commit('addEmployee', response.data);
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    },
    async updateEmployee({ commit }, employee: Employee) {
      try {
        const response = await employeeService.updateEmployee(employee);
        commit('updateEmployee', response.data);
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },
    async deleteEmployee({ commit }, employeeId: number) {
      try {
        await employeeService.deleteEmployee(employeeId);
        commit('deleteEmployee', employeeId);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  }
};

export default employeesModule;
