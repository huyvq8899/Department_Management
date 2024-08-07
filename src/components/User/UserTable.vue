<template>
  <div>
    <div class="header">
      <button class="add-button" @click="handleOpenModal">
        <i class="fas fa-plus"></i> Thêm Người Dùng
      </button>
      <button class="reload-button" @click="reloadData">
        <i class="fas fa-sync"></i> Tải Lại
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th class="id-column">ID</th>
          <th class="username-column">Tên Đăng Nhập</th>
          <th class="name-column">Họ và Tên</th>
          <th class="email-column">Email</th>
          <th class="phone-column">Số Điện Thoại</th>
          <th class="address-column">Địa Chỉ</th>
          <th class="department-column">ID Phòng Ban</th>
          <th class="actions-column">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="id-column">{{ user.id }}</td>
          <td class="username-column">{{ user.userName }}</td>
          <td class="name-column">{{ user.fullName }}</td>
          <td class="email-column">{{ user.email || 'Không có' }}</td>
          <td class="phone-column">{{ user.phoneNumber || 'Không có' }}</td>
          <td class="address-column">{{ user.address || 'Không có' }}</td>
          <td class="department-column">{{ user.departmentId || 'Không có' }}</td>
          <td class="actions-column">
            <button class="edit-button" @click="() => handleEditUser(user)">
              <i class="fas fa-edit"></i> Sửa
            </button>
            <button class="delete-button" @click="() => handleDeleteUser(user.id)">
              <i class="fas fa-trash"></i> Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, PropType } from 'vue';
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
      type: Function as PropType<(id: string) => void>, // Thay đổi thành string
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    // Lấy danh sách người dùng từ Vuex store
    const users = computed(() => store.state.userModule.users as User[]);

    // Gọi API để tải dữ liệu người dùng khi thành phần được tạo ra
    onMounted(() => {
      store.dispatch('userModule/fetchUsers');
    });

    // Phương thức mở modal thêm người dùng
    const handleOpenModal = () => {
      props.openAddModal();
    };

    // Phương thức chỉnh sửa người dùng
    const handleEditUser = (user: User) => {
      props.editUser(user);
    };

    // Phương thức xóa người dùng
    const handleDeleteUser = async (id: string) => {
      try {
        await store.dispatch('userModule/deleteUser', id);
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
      }
    };

    // Phương thức tải lại dữ liệu
    const reloadData = () => {
      store.dispatch('userModule/fetchUsers');
    };

    return {
      users,
      handleOpenModal,
      handleEditUser,
      handleDeleteUser,
      reloadData,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

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
  font-weight: bold;
}

.id-column {
  width: 10%;
}

.username-column {
  width: 20%;
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
  width: 15%;
}

.department-column {
  width: 15%;
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
  display: inline-flex;
  align-items: center;
}

.reload-button {
  background-color: #FFC107;
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
