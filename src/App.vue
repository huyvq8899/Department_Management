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

    onMounted(() => {
      const token = localStorage.getItem('token');
      if (token) {
        store.dispatch('authModule/initialize');
      } else {
        router.push('/login');
      }
    });

    watch(
      () => store.state.authModule.isLoggedIn,
      (newVal) => {
        if (newVal) {
          router.push('/');
        } else {
          router.push('/login');
        }
      },
      { immediate: true }
    );

    return {};
  },
});
</script>

<style scoped>
</style>
