import { Module } from 'vuex';
import { User } from '@/models/User';
import { RootState } from '@/models/Department';
import userService from '@/services/user.service';

interface UserState {
  users: User[];
  currentUser: User | null;
  authenticatedUser: User | null; // Đã đăng nhập
}

const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    users: [],
    currentUser: null,
    authenticatedUser: null,
  },
  mutations: {
    setUsers(state, users: User[]) {
      state.users = users;
    },
    setCurrentUser(state, user: User | null) {
      state.currentUser = user;
    },
    setAuthenticatedUser(state, user: User | null) {
      state.authenticatedUser = user;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      console.log('Fetching users from database...');
      try {
        const response = await userService.fetchUsers();
        commit('setUsers', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchUser({ commit }, id: number) {
      try {
        const response = await userService.fetchUser(id);
        commit('setCurrentUser', response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async addUser({ dispatch }, user: User) {
      try {
        await userService.addUser(user);
        dispatch('fetchUsers'); // Lấy danh sách người dùng sau khi thêm mới
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    async updateUser({ dispatch }, user: User) {
      try {
        await userService.updateUser(user);
        dispatch('fetchUsers'); // Lấy danh sách người dùng sau khi cập nhật
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    async deleteUser({ dispatch }, userId: number) {
      try {
        await userService.deleteUser(userId);
        dispatch('fetchUsers'); // Lấy danh sách người dùng sau khi xóa
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  },
};

export default userModule;
