<template>
    <transition name="fade">
      <div v-if="visible" class="notification" :class="type">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  
  export default defineComponent({
    name: 'NotificationConponent',
    props: {
      message: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'success',
      },
      duration: {
        type: Number,
        default: 3000,
      },
    },
    setup(props) {
      const visible = ref(true);
  
      watch(() => props.message, (newMessage) => {
        if (newMessage) {
          visible.value = true;
          setTimeout(() => {
            visible.value = false;
          }, props.duration);
        }
      });
  
      return {
        visible,
      };
    },
  });
  </script>
  
  <style scoped>

  </style>
  