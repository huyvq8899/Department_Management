import { Module } from 'vuex';
import { User } from '@/models/User';
import { Department, RootState } from '@/models/Department';
import { checkEmailDuplicate, createUser, deleteUser, getUsersList, getUsersWithPagination, registerUser, updateUser } from '@/services/user.service';


interface UserState {
  users: User[];
  currentUser: User | null;
  authenticatedUser: User | null; 
  totalUsers: number;
  currentPage: number;
  pageSize: number;
  listDepartments: Department[];
}

const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    users: [],
    currentUser: null,
    authenticatedUser: null,
    totalUsers: 0,
    currentPage: 1,
    pageSize: 10, 
    listDepartments: [],
  },
  mutations: {
    setUsers(state, { items, totalCount }: { items: User[], totalCount: number }) {
      state.users = items;
      state.totalUsers = totalCount;
    },
    setCurrentUser(state, user: User | null) {
      state.currentUser = user;
    },
    setAuthenticatedUser(state, user: User | null) {
      state.authenticatedUser = user;
    },
  },
  actions: {
    async fetchUsersWithPagination({ commit }, { pageNumber, pageSize }) {
      console.log('Fetching users with pagination...');
      try {
        const { items, totalCount } = await getUsersWithPagination(pageNumber, pageSize);
        commit('setUsers', { items, totalCount });
      } catch (error) {
        console.error('Error fetching users with pagination:', error);
      }
    },
    async fetchUsersList({ commit }) {
      console.log('Fetching full user list...');
      try {
        const users = await getUsersList();
        commit('setUsers', { items: users, totalCount: users.length });
      } catch (error) {
        console.error('Error fetching users list:', error);
      }
    },
    async addUser({ dispatch }, user: User) {
      try {
        const result = await createUser({email: user.email ?? '' , password: user.password ?? ''});
        dispatch('fetchUsersWithPagination', { pageNumber: 1, pageSize: 10 }); 
        return result;
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    async updateUser({ dispatch }, user: User) {
      try {
        await updateUser(user.id!, user);
        dispatch('fetchUsersWithPagination', { pageNumber: 1, pageSize: 10 }); 
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    async deleteUser({ dispatch }, userId: string) {
      try {
        await deleteUser(userId);
        dispatch('fetchUsersWithPagination', { pageNumber: 1, pageSize: 10 }); 
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    async checkEmailDuplicate(_, email: string) {
      try {
        return await checkEmailDuplicate(email);
      } catch (error) {
        console.error('Error checking duplicate email:', error);
        return false;
      }
    },

    async registerUser({ dispatch }, { email, password }: { email: string, password: string }) {
      try {
        const result = await registerUser({ email, password });
        dispatch('fetchUsersWithPagination', { pageNumber: 1, pageSize: 10 }); 

        return result;  
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
  },
};

export default userModule;
