<template>
  <div>
    <UserTable
      :openAddModal="openAddModal"
      :editUser="editUser"
      :deleteUser="deleteUser"
    />
  </div>
    
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import UserTable from '@/components/User/UserTable.vue';
import { User } from '@/models/User';

export default defineComponent({
  components: {
    UserTable,

  },
  setup() {
    const store = useStore();
    const showModal = ref(false);
    const isEdit = ref(false);
    const isView = ref(false);
    const currentUser = ref<User | null>(null);

    onMounted(() => {
      // store.dispatch('userModule/fetchUsers');
    });

    const openAddModal = () => {
      currentUser.value = {
        id: '',
        fullName: '',
        email: null,
        phoneNumber: null,
        address: null,
        departmentId: null,
        permissions: [],
        password: '',
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

    const deleteUser = (id: string) => {
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
