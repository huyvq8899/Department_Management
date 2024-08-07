<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const errorMessage = computed(() => store.state.authModule.errorMessage);

    const handleLogin = async () => {
      try {
        await store.dispatch('authModule/login', { email: email.value, password: password.value });

        // Use $nextTick to ensure DOM updates are complete
        await nextTick();

        if (store.state.authModule.isLoggedIn) {
          console.log("🚀 ~ handleLogin ~ store.state.authModule.isLoggedIn:", store.state.authModule.isLoggedIn);
          router.push({ name: 'Home' });
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    return {
      email,
      password,
      errorMessage,
      handleLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 14px;
    }
  }

  .error-message {
    margin-bottom: 15px;
    color: #f44336;
    font-size: 14px;
  }

  button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #42b983;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #359a6c;
    }
  }
}
</style>
