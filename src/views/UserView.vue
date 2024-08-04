<template>
    <div>
      <UserTable
        :openAddModal="openAddModal"
        :editUser="editUser"
        :deleteUser="deleteUser"
      />
      <UserModal
        :visible="showModal"
        :userData="currentUser"
        :isEdit="isEdit"
        :isView="isView"
        @close="closeModal"
        @submit="handleUserSubmit"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useStore } from 'vuex';
  import UserTable from '@/components/User/UserTable.vue';
  import UserModal from '@/components/User/UserModal.vue';
  import { User } from '@/models/User';
  
  export default defineComponent({
    components: {
      UserTable,
      UserModal,
    },
    setup() {
      const store = useStore();
      const showModal = ref(false);
      const isEdit = ref(false);
      const isView = ref(false);
      const currentUser = ref<User | null>(null);
  
      const openAddModal = () => {
        currentUser.value = {
          id: 0,
          username: '',
          password: '',
          name: '',
          departmentId: 0,
          email: '',
          permissions: [],
        };
        isEdit.value = false;
        isView.value = false;
        showModal.value = true;
      };
  
      const editUser = (user: User) => {
        currentUser.value = { ...user };
        isEdit.value = true;
        isView.value = false;
        showModal.value = true;
      };
  
      const deleteUser = (id: number) => {
        store.dispatch('userModule/deleteUser', id);
      };
  
      const closeModal = () => {
        showModal.value = false;
      };
  
      const handleUserSubmit = (user: User) => {
        if (isEdit.value) {
          store.dispatch('userModule/updateUser', user);
        } else {
          store.dispatch('userModule/addUser', user);
        }
        closeModal();
      };
  
      store.dispatch('userModule/fetchUsers');
  
      return {
        showModal,
        isEdit,
        isView,
        currentUser,
        openAddModal,
        editUser,
        deleteUser,
        closeModal,
        handleUserSubmit,
      };
    },
  });
  </script>
  
  <style scoped lang="scss">
  @import "@/styles/global.scss";
  </style>
  