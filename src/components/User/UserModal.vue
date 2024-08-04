<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ modalTitle }}</h2>
        <form v-if="!isView" @submit.prevent="submit">
          <div class="input-group">
            <label for="username">Username:</label>
            <div class="input-with-icon">
              <i class="fas fa-user"></i>
              <input v-model="user.username" placeholder="Username" required />
            </div>
          </div>
          <div class="input-group">
            <label for="password">Password:</label>
            <div class="input-with-icon">
              <i class="fas fa-lock"></i>
              <input v-model="user.password" type="password" placeholder="Password" required />
            </div>
          </div>
          <div class="input-group">
            <label for="name">Name:</label>
            <div class="input-with-icon">
              <i class="fas fa-user-tag"></i>
              <input v-model="user.name" placeholder="Name" required />
            </div>
          </div>
          <div class="input-group">
            <label for="email">Email:</label>
            <div class="input-with-icon">
              <i class="fas fa-envelope"></i>
              <input v-model="user.email" type="email" placeholder="Email" required />
            </div>
          </div>
          <div class="input-group">
            <label for="departmentId">Department ID:</label>
            <div class="input-with-icon">
              <i class="fas fa-building"></i>
              <input v-model.number="user.departmentId" type="number" placeholder="Department ID" required />
            </div>
          </div>
          <div class="input-group">
            <label for="permissions">Permissions:</label>
            <div class="input-with-icon">
              <i class="fas fa-key"></i>
              <input v-model="user.permissions" placeholder="Permissions (comma separated)" />
            </div>
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
          <p>ID: {{ user.id }}</p>
          <p>Username: {{ user.username }}</p>
          <p>Name: {{ user.name }}</p>
          <p>Email: {{ user.email }}</p>
          <p>Department ID: {{ user.departmentId }}</p>
          <p>Permissions: {{ user.permissions.join(', ') }}</p>
          <button class="close-button" @click="close">
            <i class="fas fa-times"></i> Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, watch } from 'vue';
  import { User } from '@/models/User';
  
  export default defineComponent({
    props: {
      visible: Boolean,
      userData: Object as () => User | null,
      isEdit: Boolean,
      isView: Boolean,
    },
    emits: ['close', 'submit'],
    setup(props, { emit }) {
      const user = ref<User>({
        id: 0,
        username: '',
        password: '',
        name: '',
        departmentId: 0,
        email: '',
        permissions: [],
      });
  
      watch(() => props.userData, (newVal) => {
        if (newVal) {
          user.value = { ...newVal };
        }
      });
  
      const modalTitle = computed(() => {
        if (props.isView) return 'View User';
        return props.isEdit ? 'Edit User' : 'Add User';
      });
  
      const submit = () => {
        emit('submit', user.value);
      };
  
      const close = () => {
        emit('close');
      };
  
      return { user, modalTitle, submit, close };
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
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .input-group {
    margin-bottom: 15px;
  
    label {
      display: block;
      margin-bottom: 5px;
      color: #333;
    }
    
    .input-with-icon {
      display: flex;
      align-items: center;
      
      i {
        margin-right: 10px;
        color: #333;
      }
      
      input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
      }
    }
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  
    button {
      margin-left: 10px;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      color: white;
      display: flex;
      align-items: center;
  
      i {
        margin-right: 5px;
      }
    }
  
    .submit-button {
      background-color: #4CAF50;
    }
  
    .cancel-button {
      background-color: #f44336;
    }
  
    .close-button {
      background-color: #2196F3;
    }
  }
  </style>
  