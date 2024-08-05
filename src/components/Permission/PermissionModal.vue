<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ modalTitle }}</h2>
        <form v-if="!isView" @submit.prevent="submit">
          <div class="input-group">
            <i class="fas fa-crown icon"></i>
            <input id="permissionName" v-model="permission.name" placeholder="Permission Name" required />
            <label for="permissionName" class="input-label"></label>
          </div>
          <div class="input-group">
            <i class="fas fa-info-circle icon"></i>
            <input id="permissionDescription" v-model="permission.description" placeholder="Description" />
            <label for="permissionDescription" class="input-label"></label>
          </div>
          <div class="button-group">
            <button type="submit" class="submit-button">
              <i class="fas fa-save"></i> {{ isEdit ? 'Update' : 'Add' }}
            </button>
            <button type="button" class="cancel-button" @click="close">
              <i class="fas fa-times"></i> Cancel
            </button>
          </div>
        </form>
        <div v-else>
          <p>ID: {{ permission.id }}</p>
          <p>Permission Name: {{ permission.name }}</p>
          <p>Description: {{ permission.description }}</p>
          <button class="close-button" @click="close">
            <i class="fas fa-times"></i> Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, watch } from 'vue';
  import { Permission } from '@/models/Permission';
  
  export default defineComponent({
    props: {
      visible: Boolean,
      permissionData: Object as () => Permission | null,
      isEdit: Boolean,
      isView: Boolean,
    },
    emits: ['close', 'submit'],
    setup(props, { emit }) {
      const permission = ref<Permission>({ id: 0, name: '', description: '' });
  
      watch(() => props.permissionData, (newVal) => {
        if (newVal) {
          permission.value = { ...newVal };
        }
      });
  
      const modalTitle = computed(() => {
        if (props.isView) return 'View Permission';
        return props.isEdit ? 'Edit Permission' : 'Add Permission';
      });
  
      const submit = () => {
        emit('submit', permission.value);
      };
  
      const close = () => {
        emit('close');
      };
  
      return { permission, modalTitle, submit, close };
    },
  });
  </script>
  
  <style scoped lang="scss">
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Ensure modal is above other content */
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px; /* Rounded corners */
    width: 400px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    position: relative;
    max-height: 80vh; /* Prevents modal from being too tall */
    overflow-y: auto; /* Adds scroll if content overflows */
  }
  
  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }
  
  .input-group {
    display: flex;
    flex-direction: column; /* Stack label and input vertically */
    margin-bottom: 20px; /* Increased spacing between input fields */
    position: relative;
  
    .icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: #333;
      font-size: 18px;
    }
  
    input {
      padding: 12px 12px 12px 40px; /* Adjust padding for icon */
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 100%;
      box-sizing: border-box;
      font-size: 14px; /* Slightly larger font size for better readability */
    }
  
    .input-label {
      position: absolute;
      top: -10px;
      left: 40px;
      font-weight: 500;
      color: #666;
      background: #fff;
      padding: 0 5px;
      font-size: 12px; /* Smaller font size for labels */
    }
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      color: #fff;
      transition: background-color 0.3s, box-shadow 0.3s;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
      i {
        margin-right: 5px;
      }
    }
  
    .submit-button {
      background-color: #4CAF50; /* Green */
    }
  
    .submit-button:hover {
      background-color: #45a049;
    }
  
    .cancel-button {
      background-color: #f44336; /* Red */
    }
  
    .cancel-button:hover {
      background-color: #e53935;
    }
  
    .close-button {
      background-color: #2196F3; /* Blue */
    }
  
    .close-button:hover {
      background-color: #1e88e5;
    }
  }
  </style>
  
  
  