<template>
  <div class="login-container">
    <h1>Đăng nhập</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          v-model="email"
          required
        />
        <span v-if="email && !isEmailValid" class="error-message">Vui lòng nhập địa chỉ email hợp lệ.</span>
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />
        <span v-if="password && !isPasswordValid" class="error-message">
          Mật khẩu phải dài hơn 8 ký tự, chứa chữ cái, số, 
          ít nhất một ký tự đặc biệt và một chữ cái viết hoa.
        </span>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button type="submit">Đăng nhập</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { validateEmail, validatePassword } from '@/utils/validators';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const errorMessage = computed(() => store.state.authModule.errorMessage);


    const isPasswordValid = computed(() => validatePassword(password.value));
    
    const isEmailValid = computed(() => {
      return validateEmail(email.value);
    });

    const handleLogin = async () => {
      try {
        await store.dispatch('authModule/login', { email: email.value, password: password.value });

        await nextTick();

        if (store.state.authModule.isLoggedIn) {
          router.push({ name: 'UserView' });
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    return {
      email,
      password,
      errorMessage,
      isEmailValid,
      isPasswordValid,
      handleLogin,
    };
  }
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
  color: #333;

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #00844E;
    text-align: center;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 14px;
      background-color: #fff;
      color: #333;
    }
  }

  .error-message {
    margin-top: 5px;
    color: #f44336;
    font-size: 14px;
  }

  button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #00844E;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #006837;
    }
  }
}
</style>
