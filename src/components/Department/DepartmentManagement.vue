<template>
  <div>
    <h1>Department Management</h1>
    <button class="add-button" @click="openAddModal">
      <i class="fas fa-plus"></i> Add Department
    </button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="department in departments" :key="department.id">
          <td>{{ department.id }}</td>
          <td>{{ department.name }}</td>
          <td>{{ department.description }}</td>
          <td style="display: flex;">
            <button class="edit-button" @click="editDepartment(department)">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete-button" @click="deleteDepartment(department.id)">
              <i class="fas fa-trash"></i> Delete
            </button>
            <button class="view-button" @click="viewDepartment(department)">
              <i class="fas fa-eye"></i> View
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <DepartmentModal
      :visible="showModal"
      :departmentData="currentDepartment"
      :isEdit="isEdit"
      :isView="isView"
      @close="closeModal"
      @submit="handleDepartmentSubmit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import DepartmentModal from '@/components/Department/modals/DepartmentModal.vue';
import { Department } from '@/models/Department';

export default defineComponent({
  components: {
    DepartmentModal,
  },
  setup() {
    const store = useStore();
    const showModal = ref(false);
    const isEdit = ref(false);
    const isView = ref(false);
    const currentDepartment = ref<Department | null>(null);

    const departments = computed(() => store.state.departmentsModule.departments);

    const openAddModal = () => {
      currentDepartment.value = null;
      isEdit.value = false;
      isView.value = false;
      showModal.value = true;
    };

    const editDepartment = (department: Department) => {
      currentDepartment.value = { ...department };
      isEdit.value = true;
      isView.value = false;
      showModal.value = true;
    };

    const viewDepartment = (department: Department) => {
      currentDepartment.value = department;
      isView.value = true;
      isEdit.value = false;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const handleDepartmentSubmit = (department: Department) => {
      if (isEdit.value) {
        store.dispatch('departmentsModule/updateDepartment', department);
      } else {
        store.dispatch('departmentsModule/addDepartment', department);
      }
      closeModal();
    };

    const deleteDepartment = (id: number) => {
      store.dispatch('departmentsModule/deleteDepartment', id);
    };

    store.dispatch('departmentsModule/fetchDepartments');

    return {
      showModal,
      isEdit,
      isView,
      currentDepartment,
      departments,
      openAddModal,
      editDepartment,
      viewDepartment,
      closeModal,
      handleDepartmentSubmit,
      deleteDepartment,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
  text-align: center;
}

button {
  margin: 0 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: white;
  display: flex;
  align-items: center;
}

.add-button {
  background-color: #4CAF50; /* Green */
}

.edit-button {
  background-color: #2196F3; /* Blue */
}

.delete-button {
  background-color: #f44336; /* Red */
}

.view-button {
  background-color: #FFC107; /* Amber */
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

button i {
  margin-right: 5px;
}
</style>
