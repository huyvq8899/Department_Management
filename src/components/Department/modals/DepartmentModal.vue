<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ modalTitle }}</h2>
      <form v-if="!isView" @submit.prevent="submit">
        <div class="input-group">
          <i class="fas fa-user"></i>
          <input v-model="department.name" placeholder="Name" required />
        </div>
        <div class="input-group">
          <i class="fas fa-info-circle"></i>
          <input v-model="department.description" placeholder="Description" required />
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
        <p>ID: {{ department.id }}</p>
        <p>Name: {{ department.name }}</p>
        <p>Description: {{ department.description }}</p>
        <button class="close-button" @click="close">
          <i class="fas fa-times"></i> Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Department } from "@/models/Department";
import { defineComponent, ref, computed, watch } from "vue";

export default defineComponent({
  props: {
    visible: Boolean,
    departmentData: Object as () => Department | null,
    isEdit: Boolean,
    isView: Boolean,
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    const department = ref<Department>({ id: 0, name: '', description: '' });

    watch(() => props.departmentData, (newVal) => {
      if (newVal) {
        department.value = { ...newVal };
      }
    });

    const modalTitle = computed(() => {
      if (props.isView) return 'View Department';
      return props.isEdit ? 'Edit Department' : 'Add Department';
    });

    const submit = () => {
      emit('submit', department.value);
    };

    const close = () => {
      emit('close');
    };

    return { department, modalTitle, submit, close };
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
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  i {
    margin-right: 10px;
    color: #333;
  }

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
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
