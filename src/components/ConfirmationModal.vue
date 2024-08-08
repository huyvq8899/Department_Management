<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <i class="fas fa-exclamation-triangle"></i>
          <span>{{ message }}</span>
        </div>
        <div class="modal-actions">
          <button class="confirm-button" @click="confirm">
            <i class="fas fa-check"></i> Đồng Ý
          </button>
          <button class="cancel-button" @click="cancel">
            <i class="fas fa-times"></i> Hủy
          </button>
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
    left: 0;
    bottom: 5vh;
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
    max-width: 500px;
    width: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px; /* Reduced margin for better spacing */
  }
  
  .modal-header i {
    font-size: 24px; /* Larger icon size */
    color: #f44336; /* Icon color */
    margin-right: 10px;
  }
  
  .modal-header span {
    font-size: 18px; /* Larger text size */
    font-weight: bold; /* Optional: make text bold */
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end; /* Align buttons to the right */
    gap: 10px; /* Space between buttons */
    margin-top: 15px; /* Reduced margin for better spacing */
  }
  
  .confirm-button,
  .cancel-button {
    padding: 6px 12px; /* Smaller padding for smaller buttons */
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px; /* Smaller font size */
    display: flex;
    align-items: center;
  }
  
  .confirm-button {
    background-color: #4caf50;
    color: white;
  }
  
  .confirm-button i {
    margin-right: 5px;
  }
  
  .cancel-button {
    background-color: #f44336;
    color: white;
  }
  
  .cancel-button i {
    margin-right: 5px;
  }
  
  button i {
    font-size: 14px; /* Adjusted icon size */
  }
  </style>
  