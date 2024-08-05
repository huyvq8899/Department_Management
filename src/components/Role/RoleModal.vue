<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ modalTitle }}</h2>
      <form v-if="!isView" @submit.prevent="submit">
        <div class="input-group">
          <i class="fas fa-crown icon"></i>
          <input id="roleName" v-model="role.name" placeholder="Role Name" required />
          <label for="roleName" class="input-label">Role Name</label>
        </div>
        <div class="input-group">
          <i class="fas fa-info-circle icon"></i>
          <input id="roleDescription" v-model="role.description" placeholder="Description" />
          <label for="roleDescription" class="input-label">Description</label>
        </div>
        <div class="input-group">
          <i class="fas fa-lock icon"></i>
          <input id="rolePermissions" v-model="permissionsString" placeholder="Permissions (comma separated)" />
          <label for="rolePermissions" class="input-label">Permissions</label>
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
        <p>ID: {{ role.id }}</p>
        <p>Role Name: {{ role.name }}</p>
        <p>Description: {{ role.description }}</p>
        <p>Permissions: {{ role.permissions.join(', ') }}</p>
        <button class="close-button" @click="close">
          <i class="fas fa-times"></i> Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { Role } from '@/models/Role';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    roleData: {
      type: Object as () => Role | null,
      default: null
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    isView: {
      type: Boolean,
      required: true
    },
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    const role = ref<Role>({ id: 0, name: '', description: '', permissions: [] });
    const permissionsString = ref('');

    watch(() => props.roleData, (newVal) => {
      if (newVal) {
        role.value = { ...newVal };
        permissionsString.value = newVal.permissions.join(', ');
      }
    });

    const modalTitle = computed(() => {
      if (props.isView) return 'View Role';
      return props.isEdit ? 'Edit Role' : 'Add Role';
    });

    const submit = () => {
      role.value.permissions = permissionsString.value.split(',').map(p => p.trim());
      emit('submit', role.value);
    };

    const close = () => {
      emit('close');
    };

    return { role, modalTitle, permissionsString, submit, close };
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
  border-radius: 8px; /* Rounded corners */
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;

  .icon {
    position: absolute;
    left: 10px;
    color: #333;
    font-size: 18px;
  }

  input {
    padding: 10px 10px 10px 40px; /* Adjust padding for icon */
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }

  .input-label {
    position: absolute;
    top: -10px;
    left: 40px;
    font-weight: 500;
    color: #666;
    background: white;
    padding: 0 5px;
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
    color: white;
    transition: background-color 0.3s, box-shadow 0.3s;

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
