import { Module } from 'vuex';
import { LoginRequest } from '@/models/LoginRequest';
import { AccessTokenResponse, login } from '@/services/auth.service';
import { isValidToken } from '@/utils/jwtHelper';

interface AuthState {
  isLoggedIn: boolean;
  email: string;
  token: string | null;
  expiresAt: number | null;
  errorMessage: string;
}

const authModule: Module<AuthState, any> = {
  namespaced: true,
  state: {
    isLoggedIn: false,
    email: '',
    token: localStorage.getItem('token'),
    expiresAt: localStorage.getItem('expiresAt') ? parseInt(localStorage.getItem('expiresAt')!, 10) : null,
    errorMessage: '',
  },
  mutations: {
    loginSuccess(state, { email, token, expiresIn }: { email: string; token: string; expiresIn: number }) {
      state.isLoggedIn = true;
      state.email = email;
      state.token = token;
      state.expiresAt = Date.now() + expiresIn * 1000;
      state.errorMessage = '';
      localStorage.setItem('token', token);
      localStorage.setItem('expiresAt', state.expiresAt.toString());
    },
    loginFailure(state, errorMessage: string) {
      state.isLoggedIn = false;
      state.email = '';
      state.token = null;
      state.expiresAt = null;
      state.errorMessage = errorMessage;
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
    },
    logout(state) {
      state.isLoggedIn = false;
      state.email = '';
      state.token = null;
      state.expiresAt = null;
      state.errorMessage = '';
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
    },
  },
  actions: {
    initialize({ commit }) {
      const token = localStorage.getItem('token');
      const expiresAt = localStorage.getItem('expiresAt');
      if (token && expiresAt) {
        const tokenExpirationTimestamp = parseInt(expiresAt, 10);
        if (isValidToken(tokenExpirationTimestamp)) {
          commit('loginSuccess', { email: '', token, expiresIn: (tokenExpirationTimestamp - Date.now()) / 1000 });
        } else {
          commit('logout');
        }
      }
    },
    async login({ commit }, { email, password }: LoginRequest) {
      try {
        const response: AccessTokenResponse = await login({ email, password });


        const check = isValidToken(response.expiresIn);
        console.log("🚀 ~ login ~ check:", check)

        if (check) {
          commit('loginSuccess', { email, token: response.accessToken, expiresIn: response.expiresIn });
        } else {
          commit('loginFailure', 'Invalid token received from server.');
        }
      } catch (error) {
        commit('loginFailure', 'Login failed. Please check your credentials.');
      }
    },
    logout({ commit }) {
      commit('logout');
    },
    
  },
};

export default authModule;
