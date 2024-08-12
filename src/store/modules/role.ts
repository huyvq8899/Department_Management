// src/store/modules/rolesModule.ts
import { Module } from 'vuex';
import { Role } from '@/models/Role';
import { RootState } from '@/models/Department';
import { fetchRoles, addRole, updateRole, deleteRole } from '@/services/role.service';

interface RolesState {
  roles: Role[];
  currentPage: number;
  totalRoles: number;
  pageSize: number;
}

const rolesModule: Module<RolesState, RootState> = {
  namespaced: true,
  state: () => ({
    roles: [],
    currentPage: 1,
    totalRoles: 0,
    pageSize: 10,
  }),
  getters: {
    roles: (state) => state.roles,
    currentPage: (state) => state.currentPage,
    totalRoles: (state) => state.totalRoles,
    pageSize: (state) => state.pageSize,
  },
  mutations: {
    SET_ROLES(state, roles: Role[]) {
      state.roles = roles;
    },
    SET_CURRENT_PAGE(state, page: number) {
      state.currentPage = page;
    },
    SET_TOTAL_ROLES(state, total: number) {
      state.totalRoles = total;
    },
    SET_PAGE_SIZE(state, size: number) {
      state.pageSize = size;
    },
  },
  actions: {
    async fetchRoles({ commit, state }) {
      try {
        const roles = await fetchRoles();
        commit('SET_ROLES', roles);
        commit('SET_TOTAL_ROLES', roles.length); 
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    },
    async addRole({ dispatch }, role: Role) {
      try {
        await addRole(role);
        await dispatch('fetchRoles'); 
      } catch (error) {
        console.error('Failed to add role:', error);
      }
    },
    async updateRole({ dispatch }, role: Role) {
      try {
        await updateRole(role);
        await dispatch('fetchRoles'); 
      } catch (error) {
        console.error('Failed to update role:', error);
      }
    },
    async deleteRole({ dispatch }, id: string) {
      try {
        await deleteRole(id);
        await dispatch('fetchRoles'); 
      } catch (error) {
        console.error('Failed to delete role:', error);
      }
    },
    setCurrentPage({ commit }, page: number) {
      commit('SET_CURRENT_PAGE', page);
    },
    setPageSize({ commit }, size: number) {
      commit('SET_PAGE_SIZE', size);
    },
  },
};

export default rolesModule;
