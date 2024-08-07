<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    // Check login status on mount
    onMounted(() => {
      const token = localStorage.getItem('token');
      if (token) {
        // Initialize authentication based on token
        store.dispatch('authModule/initialize');
      } else {
        router.push('/login');
      }
    });

    // Watch for login status changes
    watch(
      () => store.state.authModule.isLoggedIn,
      (newVal) => {
        if (newVal) {
          router.push('/');
        } else {
          router.push('/login');
        }
      },
      { immediate: true } // Ensure this runs immediately
    );

    return {};
  },
});
</script>

<style scoped>
/* Add any global styles here */
</style>
