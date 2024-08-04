<template>
    <div>
      <button class="add-button" @click="openAddModal">
        <i class="fas fa-plus"></i> Add User
      </button>
      <table>
        <thead>
          <tr>
            <th class="id-column">ID</th>
            <th class="username-column">Username</th>
            <th class="name-column">Name</th>
            <th class="email-column">Email</th>
            <th class="department-column">Department ID</th>
            <th class="permissions-column">Permissions</th>
            <th class="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="id-column">{{ user.id }}</td>
            <td class="username-column">{{ user.username }}</td>
            <td class="name-column">{{ user.name }}</td>
            <td class="email-column">{{ user.email }}</td>
            <td class="department-column">{{ user.departmentId }}</td>
            <td class="permissions-column">{{ user.permissions.join(', ') }}</td>
            <td class="actions-column">
              <button class="edit-button" @click="() => handleEditUser(user)">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button class="delete-button" @click="() => handleDeleteUser(user.id)">
                <i class="fas fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, PropType } from 'vue';
  import { useStore } from 'vuex';
  import { User } from '@/models/User';
  
  export default defineComponent({
    name: 'UserTable',
    props: {
      openAddModal: {
        type: Function as PropType<() => void>,
        required: true,
      },
      editUser: {
        type: Function as PropType<(user: User) => void>,
        required: true,
      },
      deleteUser: {
        type: Function as PropType<(id: number) => void>,
        required: true,
      },
    },
    setup(props) {
      const store = useStore();
  
      // computed property for users
      const users = computed(() => store.state.userModule.users);
  
      // methods to handle actions
      const handleOpenModal = () => {
        props.openAddModal();
      };

      const handleEditUser = (user: User) => {
        props.editUser(user);
      };
  
  
      const handleDeleteUser = (id: number) => {
        props.deleteUser(id);
      };
  
      return {
        users,
        handleOpenModal,
        handleEditUser,
        handleDeleteUser,
      };
    },
  });
  </script>
  
  <style scoped lang="scss">
  @import "@/styles/global.scss";
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  .id-column {
    width: 10%;
  }
  
  .username-column {
    width: 15%;
  }
  
  .name-column {
    width: 20%;
  }
  
  .email-column {
    width: 20%;
  }
  
  .department-column {
    width: 10%;
  }
  
  .permissions-column {
    width: 20%;
  }
  
  .actions-column {
    width: 15%;
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
  
  .add-button {
    background-color: #4CAF50;
    margin-bottom: 20px;
    display: inline-flex;
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
  