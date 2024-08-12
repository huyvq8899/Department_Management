<template>
  <div>
    <h1>Quản Lý Vai Trò</h1>
    <button class="add-button" @click="openAddModal">
      <i class="fas fa-plus"></i> Thêm Vai Trò
    </button>
    <button class="reload-button" @click="reloadData">
      <i class="fas fa-sync"></i> Tải lại
    </button>

    <AlertMessageModal
      class="flex-center"
      :visible="alertVisible"
      :message="alertMessage"
      :alertType="alertType"
      @close="alertVisible = false"
    />

    <table>
      <thead>
        <tr>
          <th class="code-column">Mã</th>
          <th class="name-column">Tên</th>
          <th class="description-column">Mô tả</th>
          <th class="actions-column">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id" @dblclick="viewRole(role)">
          <td class="code-column text-left">{{ role.code }}</td>
          <td class="name-column text-left">{{ role.name }}</td>
          <td class="description-column text-left">{{ role.description }}</td>
          <td class="actions-column-content">
            <button class="edit-button" @click.stop="editRole(role)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="delete-button" @click.stop="showDeleteConfirmation(role.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <pagination
      class="flex-right"
      :current-page="currentPage"
      :total="totalRoles"
      :page-size="pageSize"
      @page-changed="onPageChanged"
    />

    <RoleModal
      :visible="showModal"
      :roleData="currentRole"
      :isEdit="isEdit"
      :isView="isView"
      @close="closeModal"
      @submit="handleRoleSubmit"
    />
    
    <ConfirmationModal
      :visible="showConfirmationModal"
      message="Bạn có chắc chắn muốn xóa vai trò này không?"
      :onConfirm="confirmDelete"
      :onCancel="cancelDelete"
    />
  </div>

  <div class="function-table">
      <h2>Danh Sách Chức Năng</h2>
  
      <table class="table table-striped mt-3">
        <thead>
          <tr>
            <th>Tên Chức Năng</th>
            <th>Xem</th>
            <th>Thêm</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="func in functions" :key="func.id">
            <td class="text-left">{{ func.name }}</td>
            <td >
              <input  
              type="checkbox" 
              v-model="func.permissions.view"  
              @change="updatePermission(func.id, 'view')" 
            />
            </td>
            <td>
              <input 
              type="checkbox" 
              v-model="func.permissions.add" 
              @change="updatePermission(func.id, 'add')" 
            />
            </td>
            <td>
              <input 
                type="checkbox" 
                v-model="func.permissions.edit" 
                @change="updatePermission(func.id, 'edit')" 
              />
            </td>
            <td>
              <input 
                type="checkbox" 
                v-model="func.permissions.delete" 
                @change="updatePermission(func.id, 'delete')" 
              />
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="showViewModal" class="modal">
        <div class="modal-content">
          <span class="close-button" @click="closeViewModal">&times;</span>
          <h3>{{ currentFunction.name }}</h3>
          <p><strong>ID:</strong> {{ currentFunction.id }}</p>
          <p><strong>Quyền Xem:</strong> {{ currentFunction.permissions.view ? 'Có' : 'Không' }}</p>
          <p><strong>Quyền Sửa:</strong> {{ currentFunction.permissions.edit ? 'Có' : 'Không' }}</p>
          <p><strong>Quyền Xóa:</strong> {{ currentFunction.permissions.delete ? 'Có' : 'Không' }}</p>
        </div>
      </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import RoleModal from '@/components/Role/RoleModal.vue';
import Pagination from '@/components/Pagination.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import AlertMessageModal from '@/components/AlertMessageModal.vue'; 
import { Role } from '@/models/Role';

export default defineComponent({
  components: {
    RoleModal,
    Pagination,
    ConfirmationModal,
    AlertMessageModal, 
  },
  name: 'RoleManagement',
  setup() {
    const store = useStore();
    const showModal = ref(false);
    const isEdit = ref(false);
    const isView = ref(false);
    const currentRole = ref<Role | null>(null);
    const showConfirmationModal = ref(false);
    const roleToDelete = ref<string | null>(null);
    const alertVisible = ref(false); 
    const alertMessage = ref(''); 
    const alertType = ref('success'); 

    const roles = computed(() => store.state.rolesModule.roles);
    const currentPage = computed(() => store.state.rolesModule.currentPage);
    const totalRoles = computed(() => store.state.rolesModule.totalRoles);
    const pageSize = computed(() => store.state.rolesModule.pageSize);

    const functions = ref([
        { id: '1', name: 'Quản lý phòng ban'   , permissions: { view: true,add: true, edit: false, delete: false }},
        { id: '2', name: 'Quản lý nhân viên', permissions: { view: true, add: false, edit: true, delete: true } },
      ]);
  
      const showViewModal = ref(false);
      const currentFunction = ref<any>(null);
  
      const viewFunction = (func: any) => {
        currentFunction.value = func;
        showViewModal.value = true;
      };
  
      const closeViewModal = () => {
        showViewModal.value = false;
        currentFunction.value = null;
      };
  
      const updatePermission = (id: string, type: 'view' | 'add' | 'edit' | 'delete') => {
        const func = functions.value.find(f => f.id === id);
        if (func) {
          console.log(`Updated ${type} permission for ${func.name} to ${func.permissions[type]}`);
        }
      };

    const openAddModal = () => {
      currentRole.value = { id: '', code: '', name: '', description: '', permissions: [] };
      isEdit.value = false;
      isView.value = false;
      showModal.value = true;
    };

    const editRole = (role: Role) => {
      currentRole.value = { ...role };
      isEdit.value = true;
      isView.value = false;
      showModal.value = true;
    };

    const viewRole = (role: Role) => {
      currentRole.value = role;
      isEdit.value = false;
      isView.value = true;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const handleRoleSubmit = async (role: Role) => {
      try {
        if (role) {
          const isDuplicate = await store.dispatch('rolesModule/checkCodeDuplicate', role.code);
          if (isDuplicate) {
            alertMessage.value = 'Mã vai trò đã tồn tại!';
            alertType.value = 'error';
            alertVisible.value = true;
            return;
          }

          if (isEdit.value) {
            await store.dispatch('rolesModule/updateRole', role);
            alertMessage.value = 'Cập nhật vai trò thành công!';
            alertType.value = 'success';
          } else {
            await store.dispatch('rolesModule/addRole', role);
            alertMessage.value = 'Thêm vai trò thành công!';
            alertType.value = 'success';
          }
          closeModal();
          await loadData();
        }
      } catch (error) {
        alertMessage.value = 'Có lỗi xảy ra khi lưu vai trò!';
        alertType.value = 'error';
        console.error('Failed to save role:', error);
      } finally {
        alertVisible.value = true;
        setTimeout(() => {
          alertVisible.value = false;
        }, 3000);
      }
    };

    const showDeleteConfirmation = (id: string) => {
      roleToDelete.value = id;
      showConfirmationModal.value = true;
    };

    const confirmDelete = async () => {
      if (roleToDelete.value) {
        await store.dispatch('rolesModule/deleteRole', roleToDelete.value);
        showConfirmationModal.value = false;
        alertMessage.value = 'Xóa vai trò thành công!';
        alertType.value = 'success';
        alertVisible.value = true;
        await loadData();
        setTimeout(() => {
          alertVisible.value = false;
        }, 1000);
      }
    };

    const cancelDelete = () => {
      roleToDelete.value = null;
      showConfirmationModal.value = false;
    };

    const onPageChanged = (page: number) => {
      store.commit('rolesModule/setCurrentPage', page);
      store.dispatch('rolesModule/fetchRoles', { pageNumber: page, pageSize: pageSize.value });
    };

    const loadData = async () => {
      await store.dispatch('rolesModule/fetchRoles', { pageNumber: currentPage.value, pageSize: pageSize.value });
    };

    const reloadData = () => {
      loadData();
    };

    loadData();

    return {
      showModal,
      isEdit,
      isView,
      currentRole,
      roles,
      currentPage,
      totalRoles,
      pageSize,
      openAddModal,
      editRole,
      viewRole,
      closeModal,
      handleRoleSubmit,
      showDeleteConfirmation,
      confirmDelete,
      cancelDelete,
      showConfirmationModal,
      onPageChanged,
      reloadData,
      alertVisible,
      alertMessage,
      alertType,
      functions,
        showViewModal,
        currentFunction,
        viewFunction,
        closeViewModal,
        updatePermission,
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
  text-align: center; /* Center align text for all cells by default */
}

th {
  background-color: #f4f4f4;
}

.code-column {
  width: 20%;
}

.name-column {
  width: 30%;
}

.description-column {
  width: 30%;
}

.actions-column {
  width: 20%;
  justify-content: end;
  &-content {
    display: flex;
    justify-content: end;
  }
}

button {
  margin: 0 5px;
}

.add-button,
.reload-button {
  margin-bottom: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.flex-right {
  display: flex;
  justify-content: flex-end;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 600px;
  max-width: 100%;
  margin: auto;
  border-radius: 0;
}

.modal-header {
  text-align: center;
  padding: 10px;
  background-color: #f4f4f4;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  text-align: right;
  padding: 10px;
}
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    max-width: 100%;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
</style>
