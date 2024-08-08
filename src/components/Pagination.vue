<template>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Trước</button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Sau</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  export default defineComponent({
    name: 'PaginationComponent',
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      pageSize: {
        type: Number,
        required: true,
      },
    },
    setup(props, { emit }) {
      const totalPages = computed(() => Math.ceil(props.total / props.pageSize));
  
      const prevPage = () => {
        if (props.currentPage > 1) {
          emit('page-changed', props.currentPage - 1);
        }
      };
  
      const nextPage = () => {
        if (props.currentPage < totalPages.value) {
          emit('page-changed', props.currentPage + 1);
        }
      };
  
      return {
        totalPages,
        prevPage,
        nextPage,
      };
    },
  });
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  button {
    margin: 0 10px;
    padding: 5px 10px;
  }
  </style>
  