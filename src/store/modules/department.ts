import { Module } from 'vuex';
import { Department, RootState } from '@/models/Department';
import * as departmentService from '@/services/department.service';

interface DepartmentsState {
  departments: Department[];
}

const departmentsModule: Module<DepartmentsState, RootState> = {
  namespaced: true,
  state: {
    departments: [],
  },
  mutations: {
    setDepartments(state, departments: Department[]) {
      state.departments = departments;
    },
    addDepartment(state, department: Department) {
      state.departments.push(department);
    },
    updateDepartment(state, updatedDepartment: Department) {
      const index = state.departments.findIndex(dept => dept.id === updatedDepartment.id);
      if (index !== -1) {
        state.departments[index] = updatedDepartment;
      }
    },
    deleteDepartment(state, id: string) {
      state.departments = state.departments.filter(dept => dept.id !== id);
    },
  },
  actions: {
    async fetchDepartments({ commit }) {
      try {
        const departments = await departmentService.getDepartmentsList();
        commit('setDepartments', departments);
      } catch (error) {
        console.error('Error fetching departments:', error);
        // Handle error accordingly
      }
    },
    async addDepartment({ commit }, department: Department) {
      try {
        const newDepartment = await departmentService.createDepartment(department);
        commit('addDepartment', newDepartment);
      } catch (error) {
        console.error('Error adding department:', error);
        // Handle error accordingly
      }
    },
    async updateDepartment({ commit }, department: Department) {
      try {
        const updatedDepartment = await departmentService.updateDepartment(department.id, department);
        commit('updateDepartment', updatedDepartment);
      } catch (error) {
        console.error('Error updating department:', error);
        // Handle error accordingly
      }
    },
    async deleteDepartment({ commit }, id: string) {
      try {
        await departmentService.deleteDepartment(id);
        commit('deleteDepartment', id);
      } catch (error) {
        console.error('Error deleting department:', error);
        // Handle error accordingly
      }
    },
  },
};

export default departmentsModule;
