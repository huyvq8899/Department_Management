<template>
    <div>
      <h1>Employee Management</h1>
      <button class="add-button" @click="openAddModal">
        <i class="fas fa-plus"></i> Add Employee
      </button>
      <EmployeeTable
        :employees="employees"
        @edit="openEditModal"
        @delete="deleteEmployee"
      />
      <EmployeeModal
        :visible="showModal"
        :employeeData="currentEmployee"
        :isEdit="isEdit"
        @close="closeModal"
        @submit="handleEmployeeSubmit"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import EmployeeTable from '@/components/Employee/EmployeeTable.vue';
  import EmployeeModal from '@/components/Employee/modals/EmployeeModal.vue';
  import { Employee } from '@/models/Employee';
  
  export default defineComponent({
    name: 'EmployeeManagement',
    components: {
      EmployeeTable,
      EmployeeModal
    },
    setup() {
      const store = useStore();
      const showModal = ref(false);
      const isEdit = ref(false);
      const currentEmployee = ref<Employee | null>(null);
  
      const employees = computed(() => store.state.employeesModule.employees);
  
      const openAddModal = () => {
        currentEmployee.value = null;
        isEdit.value = false;
        showModal.value = true;
      };
  
      const openEditModal = (employee: Employee) => {
        currentEmployee.value = { ...employee };
        isEdit.value = true;
        showModal.value = true;
      };
  
      const closeModal = () => {
        showModal.value = false;
      };
  
      const handleEmployeeSubmit = (employee: Employee) => {
        if (isEdit.value) {
          store.dispatch('employeesModule/updateEmployee', employee);
        } else {
          store.dispatch('employeesModule/addEmployee', employee);
        }
        closeModal();
      };
  
      const deleteEmployee = (id: number) => {
        store.dispatch('employeesModule/deleteEmployee', id);
      };
  
      store.dispatch('employeesModule/fetchEmployees');
  
      return {
        showModal,
        isEdit,
        currentEmployee,
        employees,
        openAddModal,
        openEditModal,
        closeModal,
        handleEmployeeSubmit,
        deleteEmployee
      };
    }
  });
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  
  .add-button {
    background-color: #4CAF50; /* Green */
    margin-bottom: 15px;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }
  
  button i {
    margin-right: 5px;
  }
  
  .add-button i {
    font-size: 16px;
  }
  </style>
  