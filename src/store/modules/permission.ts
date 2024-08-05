import { Module } from 'vuex';
import { Permission } from '@/models/Permission';
import { addPermission, deletePermission, fetchPermissions, updatePermission } from '@/services/permission.service';

interface PermissionState {
  permissions: Permission[];
  loading: boolean;
  error: string | null;
}

const permissionModule: Module<PermissionState, any> = {
  namespaced: true,
  state: {
    permissions: [],
    loading: false,
    error: null,
  },
  mutations: {
    setPermissions(state, permissions: Permission[]) {
      state.permissions = permissions;
    },
    addPermission(state, permission: Permission) {
      state.permissions.push(permission);
    },
    updatePermission(state, updatedPermission: Permission) {
      const index = state.permissions.findIndex(permission => permission.id === updatedPermission.id);
      if (index !== -1) {
        state.permissions.splice(index, 1, updatedPermission);
      }
    },
    removePermission(state, permissionId: number) {
      state.permissions = state.permissions.filter(permission => permission.id !== permissionId);
    },
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    setError(state, error: string | null) {
      state.error = error;
    },
  },
  actions: {
    async fetchPermissions({ commit }) {
      commit('setLoading', true);
      try {
        const permissions = await fetchPermissions();
        commit('setPermissions', permissions);
      } catch (error: any) {
        commit('setError', error.message || 'Failed to fetch permissions');
      } finally {
        commit('setLoading', false);
      }
    },
    async addPermission({ commit }, permission: Permission) {
      try {
        const newPermission = await addPermission(permission);
        commit('addPermission', newPermission);
      } catch (error: any) {
        commit('setError', error.message || 'Failed to add permission');
      }
    },
    async updatePermission({ commit }, permission: Permission) {
      try {
        const updatedPermission = await updatePermission(permission);
        commit('updatePermission', updatedPermission);
      } catch (error: any) {
        commit('setError', error.message || 'Failed to update permission');
      }
    },
    async deletePermission({ commit }, permissionId: number) {
      try {
        await deletePermission(permissionId);
        commit('removePermission', permissionId);
      } catch (error: any) {
        commit('setError', error.message || 'Failed to delete permission');
      }
    },
  },
};

export default permissionModule;
