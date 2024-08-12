<template>
    <div class="function-table">
      <h2>Danh Sách Chức Năng</h2>
  
      <!-- Table to display functions -->
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
  
      <!-- Modal for viewing function details -->
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
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    setup() {
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
  
      return {
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

  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th, .table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  .table th {
    background-color: #f4f4f4;
  }
  
  .btn-info {
    background-color: #17a2b8;
    color: white;
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
  