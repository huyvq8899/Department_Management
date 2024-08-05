<template>
    <div>
      <button @click="openModal" class="add-button">
        <i class="fas fa-plus"></i> Add Role
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role Name</th>
            <th>Description</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td>{{ role.id }}</td>
            <td>{{ role.name }}</td>
            <td>{{ role.description }}</td>
            <td>{{ role.permissions.join(', ') }}</td>
            <td>
              <button @click="editRole(role)">Edit</button>
              <button @click="deleteRole(role.id)">Delete</button>
              <button @click="viewRole(role)">View</button>
            </td>
          </tr>
        </tbody>
      </table>
      <RoleModal
        :visible="modalVisible"
        :roleData="currentRole"
        :is-edit="isEditing"
        :is-view="isViewing"
        @close="closeModal"
        @submit="handleSubmit"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, ref } from 'vue';
  import { useStore } from 'vuex';
  import { Role } from '@/models/Role';
  import RoleModal from '@/components/Role/RoleModal.vue';
  
  export default defineComponent({
    components: { RoleModal },
    setup() {
      const store = useStore();
      const modalVisible = ref(false);
      const isEditing = ref(false);
      const isViewing = ref(false);
      const currentRole = ref<Role | null>(null);
  
      // Update to use the new store namespace
      const roles = computed(() => store.state.roleModule.roles);
  
      const openModal = () => {
        modalVisible.value = true;
        isEditing.value = false;
        isViewing.value = false;
        currentRole.value = { id: 0, name: '', description: '', permissions: [] };
      };
  
      const editRole = (role: Role) => {
        modalVisible.value = true;
        isEditing.value = true;
        isViewing.value = false;
        currentRole.value = { ...role };
      };
  
      const viewRole = (role: Role) => {
        modalVisible.value = true;
        isEditing.value = false;
        isViewing.value = true;
        currentRole.value = { ...role };
      };
  
      const deleteRole = async (roleId: number) => {
        await store.dispatch('roleModule/deleteRole', roleId);
      };
  
      const handleSubmit = async (role: Role) => {
        if (isEditing.value) {
          await store.dispatch('roleModule/updateRole', role);
        } else {
          await store.dispatch('roleModule/addRole', role);
        }
        closeModal();
      };
  
      const closeModal = () => {
        modalVisible.value = false;
      };
  
      return { roles, modalVisible, isEditing, isViewing, currentRole, openModal, editRole, viewRole, deleteRole, handleSubmit, closeModal };
    },
  });
  </script>
  
  <style scoped lang="scss">
  .add-button {
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #4caf50; /* Green */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  
    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
  
    th {
      background-color: #f4f4f4;
    }
  }
  </style>
  