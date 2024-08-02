import { Module } from 'vuex';

interface AuthState {
  isLoggedIn: boolean;
  username: string;
  errorMessage: string;
}

const authModule: Module<AuthState, any> = {
  namespaced: true,
  state: {
    isLoggedIn: !!localStorage.getItem('isLoggedIn'),
    username: '',
    errorMessage: '',
  },
  mutations: {
    loginSuccess(state, username: string) {
      state.isLoggedIn = true;
      state.username = username;
      state.errorMessage = '';
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = '';
      state.errorMessage = '';
      localStorage.removeItem('isLoggedIn');
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      // Perform login logic and then call the mutation
      commit('loginSuccess', username);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
};

export default authModule;
