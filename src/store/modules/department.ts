import { Module } from 'vuex';
import { Department, RootState } from '@/models/Department';
import * as departmentService from '@/services/department.service';

interface DepartmentsState {
  departments: Department[];
  totalDepartments: number;
  currentPage: number;
  pageSize: number;
  isCodeDuplicate: boolean;
  isUsedDepartment: boolean;
}

const departmentsModule: Module<DepartmentsState, RootState> = {
  namespaced: true,
  state: {
    departments: [],
    totalDepartments: 0,
    currentPage: 1,
    pageSize: 10,
    isCodeDuplicate: false,
    isUsedDepartment: false,
  },
  mutations: {
    setDepartments(state, { departments, totalCount }) {
      state.departments = departments;
      state.totalDepartments = totalCount;
    },
    addDepartment(state, department: Department) {
      console.log("🚀 ~ addDepartment ~ department:", department)
      //state.departments.push(department);
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
    setCurrentPage(state, page: number) {
      state.currentPage = page;
    },
    setPageSize(state, size: number) {
      state.pageSize = size;
    },
    setCodeDuplicateStatus(state, status: boolean) {
      state.isCodeDuplicate = status;
    },

    setUsedDepartmentStatus(state, status: boolean) {
      state.isUsedDepartment = status;
    },

  },
  actions: {
    async fetchDepartments({ commit, state }, { pageNumber = state.currentPage, pageSize = state.pageSize } = {}) {
      try {
        const { items, totalCount } = await departmentService.getDepartmentsWithPagination(pageNumber, pageSize);
        commit('setDepartments', { departments: items, totalCount });
      } catch (error) {
        console.error('Error fetching departments with pagination:', error);
        // Handle error accordingly
      }
    },
    async addDepartment({ commit }, department: Department) {
      console.log("🚀 ~ addDepartment ~ department:", department)
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

    async checkCodeDuplicate({ commit }, code: string) {
      try {
        const response = await departmentService.checkCodeDuplicate(code);
        const isDuplicate = response;
        commit('setCodeDuplicateStatus', isDuplicate);
        return isDuplicate;
      } catch (error) {
        console.error('Failed to check code duplicate:', error);
        return false;
      }
    },
    async getAllDepartments() {
      try {
        const departments = await departmentService.getDepartmentsList();
        return departments;
      } catch (error) {
        console.error('Error fetching departments with pagination:', error);
        // Handle error accordingly
      }
    },


    async checkUsedDepartment({ commit }, id: string) {

      try {
        const check = await departmentService.CheckUsedDepartment(id);
        commit('setUsedDepartmentStatus', check);

        return check;
      } catch (error) {
        console.error('Error fetching departments with pagination:', error);
        // Handle error accordingly
      }
    },

  },
};

export default departmentsModule;
