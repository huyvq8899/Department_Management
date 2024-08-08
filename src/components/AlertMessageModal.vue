<template>
    <div v-if="visible" class="alert-modal">
      <div :class="`alert alert-${alertType}`">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'AlertMessageModal',
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      alertType: {
        type: String,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .alert-modal {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    justify-content: center; /* Center horizontally */
    width: 100%; /* Full width for centering */
  }
  
  .alert {
    padding: 10px 20px;
    border-radius: 5px;
    max-width: 400px; /* Optional: to constrain width */
    margin: 0 auto; /* Center horizontally */
  }
  
  .alert-success {
    background-color: #d4edda;
    color: #155724;
  }
  
  .alert-error {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  </style>
  