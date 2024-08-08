<template>
  <div>
    <h1>Quản Lý Người Dùng</h1>
    <button class="add-button" @click="openAddModal">
      <i class="fas fa-plus"></i> Thêm Người Dùng
    </button>
    <button class="reload-button" @click="reloadData">
      <i class="fas fa-sync"></i> Tải lại
    </button>

    <!-- Alert Message Modal -->
    <AlertMessageModal 
      :visible="alertVisible" 
      :message="alertMessage" 
      :alertType="alertType" 
      @close="alertVisible = false"
    />

    <!-- User Table -->
    <table>
      <thead>
        <tr>
          <th class="name-column">Họ và Tên</th>
          <th class="email-column">Email</th>
          <th class="phone-column">Số Điện Thoại</th>
          <th class="address-column">Địa Chỉ</th>
          <th class="department-column">ID Phòng Ban</th>
          <th class="actions-column">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" @dblclick="viewUser(user)">
          <td class="name-column text-left">{{ user.fullName }}</td>
          <td class="email-column text-left">{{ user.email || 'Không có' }}</td>
          <td class="phone-column text-left">{{ user.phoneNumber || 'Không có' }}</td>
          <td class="address-column text-left">{{ user.address || 'Không có' }}</td>
          <td class="department-column text-left">{{ user.departmentId || 'Không có' }}</td>
          <td class="actions-column-content">
            <button class="edit-button" @click.stop="editUser(user)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="delete-button" @click.stop="showDeleteConfirmation(user.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <pagination 
      :current-page="currentPage" 
      :total="totalUsers" 
      :page-size="pageSize" 
      @page-changed="onPageChanged"
    />

    <!-- User Modal -->
    <UserModal 
      :visible="showModal"
      :userData="currentUser"
      :isEdit="isEdit"
      :isView="isView"
      @close="closeModal"
      @submit="handleUserSubmit"
    />

    <!-- Confirmation Modal -->
    <ConfirmationModal 
      :visible="showConfirmationModal" 
      message="Bạn có chắc chắn muốn xóa người dùng này không?"
      :onConfirm="confirmDelete"
      :onCancel="cancelDelete"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import UserModal from '@/components/User/UserModal.vue';
import Pagination from '@/components/Pagination.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import AlertMessageModal from '@/components/AlertMessageModal.vue';
import { User } from '@/models/User';

export default defineComponent({
  components: {
    UserModal,
    Pagination,
    ConfirmationModal,
    AlertMessageModal,
  },
  name: 'UserManagement',
  setup() {
    const store = useStore();
    const showModal = ref(false);
    const isEdit = ref(false);
    const isView = ref(false);
    const currentUser = ref<User | null>(null);
    const showConfirmationModal = ref(false);
    const userToDelete = ref<string | null>(null);
    const alertVisible = ref(false);
    const alertMessage = ref('');
    const alertType = ref('success');

    const users = computed(() => store.state.userModule.users);
    const currentPage = computed(() => store.state.userModule.currentPage);
    const totalUsers = computed(() => store.state.userModule.totalUsers);
    const pageSize = computed(() => store.state.userModule.pageSize);

    const openAddModal = () => {
      currentUser.value = {
    id: '',
    userName: '', // Thêm thuộc tính userName
    fullName: '',
    email: null,
    phoneNumber: null,
    address: null,
    departmentId: null,
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

    const viewUser = (user: User) => {
      currentUser.value = user;
      isEdit.value = false;
      isView.value = true;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const handleUserSubmit = async (user: User) => {
      try {
        if (user) {
          const isDuplicate = await store.dispatch('userModule/checkEmailDuplicate', user.email);
          if (isDuplicate) {
            alertMessage.value = 'Email đã tồn tại!';
            alertType.value = 'error';
            alertVisible.value = true;
            return;
          }

          if (isEdit.value) {
            await store.dispatch('userModule/updateUser', user);
            alertMessage.value = 'Cập nhật người dùng thành công!';
            alertType.value = 'success';
          } else {
            await store.dispatch('userModule/addUser', user);
            alertMessage.value = 'Thêm người dùng thành công!';
            alertType.value = 'success';
          }
          closeModal();
          await loadData();
        }
      } catch (error) {
        alertMessage.value = 'Có lỗi xảy ra khi lưu người dùng!';
        alertType.value = 'error';
        console.error('Failed to save user:', error);
      } finally {
        alertVisible.value = true;
        setTimeout(() => {
          alertVisible.value = false;
        }, 3000);
      }
    };

    const showDeleteConfirmation = (id: string) => {
      userToDelete.value = id;
      showConfirmationModal.value = true;
    };

    const confirmDelete = async () => {
      if (userToDelete.value) {
        await store.dispatch('userModule/deleteUser', userToDelete.value);
        showConfirmationModal.value = false;
        alertMessage.value = 'Xóa người dùng thành công!';
        alertType.value = 'success';
        alertVisible.value = true;
        loadData();
        setTimeout(() => {
          alertVisible.value = false;
        }, 1000);
      }
    };

    const cancelDelete = () => {
      userToDelete.value = null;
      showConfirmationModal.value = false;
    };

    const onPageChanged = (page: number) => {
      store.commit('userModule/setCurrentPage', page);
      store.dispatch('userModule/fetchUsersWithPagination', { pageNumber: page, pageSize: pageSize.value });
    };

    const loadData = () => {
      store.dispatch('userModule/fetchUsersWithPagination', { pageNumber: currentPage.value, pageSize: pageSize.value });
    };

    const reloadData = () => {
      loadData();
    };

    loadData();

    return {
      showModal,
      isEdit,
      isView,
      currentUser,
      users,
      currentPage,
      totalUsers,
      pageSize,
      openAddModal,
      editUser,
      viewUser,
      closeModal,
      handleUserSubmit,
      showDeleteConfirmation,
      confirmDelete,
      cancelDelete,
      showConfirmationModal,
      onPageChanged,
      reloadData,
      alertVisible,
      alertMessage,
      alertType,
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

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}

.name-column {
  width: 20%;
}

.email-column {
  width: 20%;
}

.phone-column {
  width: 15%;
}

.address-column {
  width: 20%;
}

.department-column {
  width: 15%;
}

.actions-column {
  width: 10%;
}

.actions-column-content {
  display: flex;
  justify-content: center;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-button {
  background-color: #4caf50;
  color: white;
}

.reload-button {
  background-color: #2196f3;
  color: white;
}

.edit-button {
  background-color: #ffc107;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.text-left {
  text-align: left;
}

.success-message {
  color: green;
  margin-bottom: 10px;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}
</style>
