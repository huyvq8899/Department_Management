<template>
    <div>
      <table>
        <thead>
          <tr>
            <th class="id-column">ID</th>
            <th class="name-column">Name</th>
            <th class="position-column">Position</th>
            <th class="department-column">Department</th>
            <th class="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td class="id-column">{{ employee.id }}</td>
            <td class="name-column">{{ employee.name }}</td>
            <td class="position-column">{{ employee.position }}</td>
            <td class="department-column">{{ employee.department }}</td>
            <td class="actions-column">
              <button class="edit-button" @click="editEmployee(employee)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="delete-button" @click="deleteEmployee(employee.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { Employee } from '@/models/Employee';
  
  export default defineComponent({
    name: 'EmployeeTable',
    props: {
      employees: {
        type: Array as () => Employee[],
        required: true
      }
    },
    emits: ['edit', 'delete'],
    setup(props, { emit }) {
      const editEmployee = (employee: Employee) => {
        emit('edit', employee);
      };
  
      const deleteEmployee = (employeeId: number) => {
        emit('delete', employeeId);
      };
  
      return {
        editEmployee,
        deleteEmployee
      };
    }
  });
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  .id-column {
    width: 10%;
  }
  
  .name-column {
    width: 30%;
  }
  
  .position-column {
    width: 30%;
  }
  
  .department-column {
    width: 20%;
  }
  
  .actions-column {
    width: 10%;
    display: flex;
    justify-content: space-around;
  }
  
  button {
    margin: 0 5px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    color: white;
    display: flex;
    align-items: center;
  }
  
  .edit-button {
    background-color: #2196F3;
  }
  
  .delete-button {
    background-color: #f44336;
  }
  
  button i {
    margin-right: 5px;
  }
  </style>
  