<template>
  <div>
    <div class="header">
      <h1>Permissions</h1>
      <button @click="showAddModal" class="btn btn-primary">
        <i class="fas fa-plus"></i> Add Permission
      </button>
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="permission in permissions" :key="permission.id">
            <td>{{ permission.id }}</td>
            <td>{{ permission.name }}</td>
            <td>{{ permission.description }}</td>
            <td>
              <button @click="showEditModal(permission)" class="btn btn-warning">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button @click="deletePermission(permission.id)" class="btn btn-danger">
                <i class="fas fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Permission Modal -->
    <PermissionModal
      :visible="isModalVisible"
      :permission="currentPermission"
      :is-edit="isEditing"
      :is-view="isViewing"
      @close="closeModal"
      @save="savePermission"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Permission } from '@/models/Permission';
import PermissionModal from '@/components/Permission/PermissionModal.vue';

export default defineComponent({
  name: 'PermissionView',

  components: {
    PermissionModal,
  },

  setup() {
    const store = useStore();
    const permissions = ref<Permission[]>([]);
    const isModalVisible = ref(false);
    const isEditing = ref(false);
    const isViewing = ref(false);
    const currentPermission = ref<Permission | null>(null);

    const fetchPermissions = async () => {
      await store.dispatch('permissionModule/fetchPermissions');
      permissions.value = store.state.permissionModule.permissions;
    };

    const showAddModal = () => {
      currentPermission.value = null;
      isEditing.value = false;
      isViewing.value = false;
      isModalVisible.value = true;
    };

    const showEditModal = (permission: Permission) => {
      currentPermission.value = { ...permission };
      isEditing.value = true;
      isViewing.value = false;
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    const savePermission = async (permission: Permission) => {
      if (permission.id) {
        await store.dispatch('permissionModule/updatePermission', permission);
      } else {
        await store.dispatch('permissionModule/addPermission', permission);
      }
      await fetchPermissions();
      closeModal();
    };

    const deletePermission = async (id: number) => {
      await store.dispatch('permissionModule/deletePermission', id);
      await fetchPermissions();
    };

    onMounted(() => {
      fetchPermissions();
    });

    return {
      permissions,
      isModalVisible,
      isEditing,
      isViewing,
      currentPermission,
      showAddModal,
      showEditModal,
      closeModal,
      savePermission,
      deletePermission,
    };
  },
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table-container {
  margin-top: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f4f4f4;
}

.btn {
  border: none;
  padding: 8px 12px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #3498db;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-warning {
  background-color: #f39c12;
}

.btn-warning:hover {
  background-color: #e67e22;
}

.btn-danger {
  background-color: #e74c3c;
}

.btn-danger:hover {
  background-color: #c0392b;
}
</style>
