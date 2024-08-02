import { Module } from 'vuex';
import { RootState } from '@/models/Department';
import { Department } from '@/models/Department';

const departmentsModule: Module<{ departments: Department[] }, RootState> = {
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
    deleteDepartment(state, id: number) {
      state.departments = state.departments.filter(dept => dept.id !== id);
    },
  },
  actions: {
    fetchDepartments({ commit }) {
      // Simulate fetching data from an API
      const departments: Department[] = [
        { id: 1, name: 'HR', description: 'Human Resources' },
        { id: 2, name: 'IT', description: 'Information Technology' },
      ];
      commit('setDepartments', departments);
    },
    addDepartment({ commit }, department: Department) {
      commit('addDepartment', department);
    },
    updateDepartment({ commit }, department: Department) {
      commit('updateDepartment', department);
    },
    deleteDepartment({ commit }, id: number) {
      commit('deleteDepartment', id);
    },
  },
};

export default departmentsModule;
