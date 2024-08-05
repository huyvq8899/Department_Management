import { Module } from 'vuex';
import { Role } from '@/models/Role';
import { addRole, deleteRole, fetchRoles, updateRole } from '@/services/role.service';

interface RoleState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const roleModule: Module<RoleState, any> = {
  namespaced: true,
  state: {
    roles: [],
    loading: false,
    error: null,
  },
  mutations: {
    setRoles(state, roles: Role[]) {
      state.roles = roles;
    },
    addRole(state, role: Role) {
      state.roles.push(role);
    },
    updateRole(state, updatedRole: Role) {
      const index = state.roles.findIndex(role => role.id === updatedRole.id);
      if (index !== -1) {
        state.roles.splice(index, 1, updatedRole);
      }
    },
    removeRole(state, roleId: number) {
      state.roles = state.roles.filter(role => role.id !== roleId);
    },
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    setError(state, error: string | null) {
      state.error = error;
    },
  },
  actions: {
    async fetchRoles({ commit }) {
      commit('setLoading', true);
      try {
        const roles = await fetchRoles();
        commit('setRoles', roles);
      } catch (error : any) {
        commit('setError', error.message || 'Failed to fetch roles');
      } finally {
        commit('setLoading', false);
      }
    },
    async addRole({ commit }, role: Role) {
      try {
        const newRole = await addRole(role);
        commit('addRole', newRole);
      } catch (error : any) {
        commit('setError', error.message || 'Failed to add role');
      }
    },
    async updateRole({ commit }, role: Role) {
      try {
        const updatedRole = await updateRole(role);
        commit('updateRole', updatedRole);
      } catch (error : any) {
        commit('setError', error.message || 'Failed to update role');
      }
    },
    async deleteRole({ commit }, roleId: number) {
      try {
        await deleteRole(roleId);
        commit('removeRole', roleId);
      } catch (error : any) {
        commit('setError', error.message || 'Failed to delete role');
      }
    },
  },
};

export default roleModule;
