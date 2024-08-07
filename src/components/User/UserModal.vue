<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ modalTitle }}</h2>
      <form v-if="!isView" @submit.prevent="submit">
        <div class="input-group">
          <label for="userName">Username:</label>
          <div class="input-with-icon">
            <i class="fas fa-user"></i>
            <input v-model="user.userName" placeholder="Username" required />
          </div>
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <div class="input-with-icon">
            <i class="fas fa-lock"></i>
            <input v-model="user.password" type="password" placeholder="Password" />
          </div>
        </div>
        <div class="input-group">
          <label for="fullName">Full Name:</label>
          <div class="input-with-icon">
            <i class="fas fa-user-tag"></i>
            <input v-model="user.fullName" placeholder="Full Name" required />
          </div>
        </div>
        <div class="input-group">
          <label for="email">Email:</label>
          <div class="input-with-icon">
            <i class="fas fa-envelope"></i>
            <input v-model="user.email" type="email" placeholder="Email" />
          </div>
        </div>
        <div class="input-group">
          <label for="phoneNumber">Phone Number:</label>
          <div class="input-with-icon">
            <i class="fas fa-phone"></i>
            <input v-model="user.phoneNumber" placeholder="Phone Number" />
          </div>
        </div>
        <div class="input-group">
          <label for="address">Address:</label>
          <div class="input-with-icon">
            <i class="fas fa-address-book"></i>
            <input v-model="user.address" placeholder="Address" />
          </div>
        </div>
        <div class="input-group">
          <label for="departmentId">Department ID:</label>
          <div class="input-with-icon">
            <i class="fas fa-building"></i>
            <input v-model="user.departmentId" placeholder="Department ID" />
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
        <p>Username: {{ user.userName }}</p>
        <p>Full Name: {{ user.fullName }}</p>
        <p>Email: {{ user.email || 'Not provided' }}</p>
        <p>Phone Number: {{ user.phoneNumber || 'Not provided' }}</p>
        <p>Address: {{ user.address || 'Not provided' }}</p>
        <p>Department ID: {{ user.departmentId || 'Not provided' }}</p>
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
    visible: {
      type: Boolean,
      required: true,
    },
    userData: {
      type: Object as () => User | null,
      default: null,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
    isView: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    const user = ref<User>({
      id: '',
      userName: '',
      fullName: '',
      email: null,
      phoneNumber: null,
      address: null,
      departmentId: null,
      password: '',
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
