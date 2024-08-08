<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ message }}</h3>
        <div class="modal-actions">
          <button class="confirm-button" @click="confirm">Đồng Ý</button>
          <button class="cancel-button" @click="cancel">Hủy</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    name: 'ConfirmationModal',
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      onConfirm: {
        type: Function as PropType<() => void>,
        required: true,
      },
      onCancel: {
        type: Function as PropType<() => void>,
        required: true,
      },
    },
    setup(props) {
      const confirm = () => {
        props.onConfirm();
      };
  
      const cancel = () => {
        props.onCancel();
      };
  
      return {
        confirm,
        cancel,
      };
    },
  });
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    width: 100%;
  }
  
  .modal-actions {
    margin-top: 20px;
  }
  
  .confirm-button, .cancel-button {
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .confirm-button {
    background-color: #4caf50;
    color: white;
  }
  
  .cancel-button {
    background-color: #f44336;
    color: white;
  }
  </style>
  