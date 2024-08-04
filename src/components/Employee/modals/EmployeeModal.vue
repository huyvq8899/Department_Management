<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ modalTitle }}</h2>
      <form v-if="!isView" @submit.prevent="submit">
        <div class="input-group">
          <label for="name">Name:</label>
          <div class="input-with-icon">
            <i class="fas fa-user"></i>
            <input v-model="employee.name" placeholder="Name" required />
          </div>
        </div>
        <div class="input-group">
          <label for="position">Position:</label>
          <div class="input-with-icon">
            <i class="fas fa-briefcase"></i>
            <input v-model="employee.position" placeholder="Position" required />
          </div>
        </div>
        <div class="input-group">
          <label for="department">Department:</label>
          <div class="input-with-icon">
            <i class="fas fa-building"></i>
            <input v-model="employee.department" placeholder="Department" required />
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
        <p>ID: {{ employee.id }}</p>
        <p>Name: {{ employee.name }}</p>
        <p>Position: {{ employee.position }}</p>
        <p>Department: {{ employee.department }}</p>
        <button class="close-button" @click="close">
          <i class="fas fa-times"></i> Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { Employee } from '@/models/Employee';

export default defineComponent({
  props: {
    visible: Boolean,
    employeeData: Object as () => Employee | null,
    isEdit: Boolean,
    isView: Boolean
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    const employee = ref<Employee>({ id: 0, name: '', position: '', department: '' });

    watch(() => props.employeeData, (newVal) => {
      if (newVal) {
        employee.value = { ...newVal };
      }
    });

    const modalTitle = computed(() => {
      if (props.isView) return 'View Employee';
      return props.isEdit ? 'Edit Employee' : 'Add Employee';
    });

    const submit = () => {
      emit('submit', employee.value);
    };

    const close = () => {
      emit('close');
    };

    return { employee, modalTitle, submit, close };
  }
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
    background-color: #4CAF50; /* Green */
  }

  .cancel-button {
    background-color: #f44336; /* Red */
  }

  .close-button {
    background-color: #2196F3; /* Blue */
  }
}
</style>
