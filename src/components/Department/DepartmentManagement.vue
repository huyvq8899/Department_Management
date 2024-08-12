<template>
  <div>
    <h1>Quản Lý Phòng Ban</h1>
    <button class="add-button" @click="openAddModal">
      <i class="fas fa-plus"></i> Thêm Phòng Ban
    </button>
    <button class="reload-button" @click="reloadData">
      <i class="fas fa-sync"></i> Tải lại
    </button>

    <AlertMessageModal class="flex-center"
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
        <tr v-for="department in departments" :key="department.id" @dblclick="viewDepartment(department)">
          <td class="code-column text-left">{{ department.code }}</td>
          <td class="name-column text-left">{{ department.name }}</td>
          <td class="description-column text-left">{{ department.description }}</td>
          <td class="actions-column-content">
            <button class="edit-button" @click.stop="editDepartment(department)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="delete-button" @click.stop="showDeleteConfirmation(department.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination class="flex-right"
      :current-page="currentPage"
      :total="totalDepartments"
      :page-size="pageSize"
      @page-changed="onPageChanged"
    />
    <DepartmentModal
      :visible="showModal"
      :departmentData="currentDepartment"
      :isEdit="isEdit"
      :isView="isView"
      @close="closeModal"
      @submit="handleDepartmentSubmit"
    />
    <ConfirmationModal
      :visible="showConfirmationModal"
      message="Bạn có chắc chắn muốn xóa phòng ban này không?"
      :onConfirm="confirmDelete"
      :onCancel="cancelDelete"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import DepartmentModal from '@/components/Department/modals/DepartmentModal.vue';
import Pagination from '@/components/Pagination.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import AlertMessageModal from '@/components/AlertMessageModal.vue'; // Import AlertMessageModal
import { Department } from '@/models/Department';

export default defineComponent({
    components: {
        DepartmentModal,
        Pagination,
        ConfirmationModal,
        AlertMessageModal, // Register AlertMessageModal
    },
    name: 'DepartmentManagement',
    setup() {
        const store = useStore();
        const showModal = ref(false);
        const isEdit = ref(false);
        const isView = ref(false);
        const currentDepartment = ref<Department | null>(null);
        const showConfirmationModal = ref(false);
        const departmentToDelete = ref<string | null>(null);
        const alertVisible = ref(false); // New state for alert visibility
        const alertMessage = ref(''); // New state for alert message
        const alertType = ref('success'); // New state for alert type (success/error)

        const departments = computed(() => store.state.departmentsModule.departments);
        const currentPage = computed(() => store.state.departmentsModule.currentPage);
        const totalDepartments = computed(() => store.state.departmentsModule.totalDepartments);
        const pageSize = computed(() => store.state.departmentsModule.pageSize);

        const openAddModal = () => {
            currentDepartment.value = { id: '', code: '', name: '', description: '' };
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
            isEdit.value = false;
            isView.value = true;
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const handleDepartmentSubmit = async (department: Department) => {
            try {
                if (department) {
                    const isDuplicate = await store.dispatch('departmentsModule/checkCodeDuplicate', department.code);
                    if (isDuplicate) {
                        alertMessage.value = 'Mã phòng ban đã tồn tại!';
                        alertType.value = 'error';
                        alertVisible.value = true;
                        return;
                    }

                    if (isEdit.value) {
                        await store.dispatch('departmentsModule/updateDepartment', department);
                        alertMessage.value = 'Cập nhật phòng ban thành công!';
                        alertType.value = 'success';
                    } else {
                        await store.dispatch('departmentsModule/addDepartment', department);
                        alertMessage.value = 'Thêm phòng ban thành công!';
                        alertType.value = 'success';
                    }
                    closeModal();
                    await loadData();
                }
            } catch (error) {
                alertMessage.value = 'Có lỗi xảy ra khi lưu phòng ban!';
                alertType.value = 'error';
                console.error('Failed to save department:', error);
            } finally {
                alertVisible.value = true;
                setTimeout(() => {
                    alertVisible.value = false;
                }, 3000);
            }
        };

        const showDeleteConfirmation = (id: string) => {
            departmentToDelete.value = id;
            showConfirmationModal.value = true;
        };

        const confirmDelete = async () => {
          const checkUsedDepartment = await store.dispatch('departmentsModule/checkUsedDepartment', departmentToDelete.value);
            console.log("🚀 ~ confirmDelete ~ checkUsedDepartment:", checkUsedDepartment)
            if (departmentToDelete.value) {
              if (!checkUsedDepartment) {  
                await store.dispatch('departmentsModule/deleteDepartment', departmentToDelete.value);
                showConfirmationModal.value = false;
                alertMessage.value = 'Xóa phòng ban thành công!';
                alertType.value = 'success';
                alertVisible.value = true;
                loadData();
                setTimeout(() => {
                    alertVisible.value = false;
                }, 1000);
              }
              else {
              showConfirmationModal.value = false;
                alertMessage.value = 'Phòng ban đang có tham chiếu nhân viên k thể xóa!';
                alertType.value = 'error';
                alertVisible.value = true;
                loadData();
                setTimeout(() => {
                    alertVisible.value = false;
                }, 1000);}
            } 
            
        };

        const cancelDelete = () => {
            departmentToDelete.value = null;
            showConfirmationModal.value = false;
        };

        const onPageChanged = (page: number) => {
            store.commit('departmentsModule/setCurrentPage', page);
            store.dispatch('departmentsModule/fetchDepartments', { pageNumber: page, pageSize: pageSize.value });
        };

        const loadData = () => {
            store.dispatch('departmentsModule/fetchDepartments', { pageNumber: currentPage.value, pageSize: pageSize.value });
        };

        const reloadData = () => {
            loadData();
        };

        loadData();

        return {
            showModal,
            isEdit,
            isView,
            currentDepartment,
            departments,
            currentPage,
            totalDepartments,
            pageSize,
            openAddModal,
            editDepartment,
            viewDepartment,
            closeModal,
            handleDepartmentSubmit,
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
