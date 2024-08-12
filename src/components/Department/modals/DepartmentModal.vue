<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ modalTitle }}</h2>
      <form @submit.prevent="submit">
        <div class="input-group">
          <label for="departmentCode">Mã:</label>
          <div class="input-with-icon">
            <i class="fas fa-code"></i>
            <input
              id="departmentCode"
              v-model="department.code"
              placeholder="Mã"
              :disabled="isView" 
              required
              :maxlength="51"
              @change="validateCode"
              :class="{ 'input-error': errors.code }"
            />
          </div>
          <span v-if="errors.code" class="error-message">{{ errors.code }}</span>

        </div>
        <div class="input-group">
          <label for="departmentName">Tên:</label>
          <div class="input-with-icon">
            <i class="fas fa-building"></i>
            <input
              id="departmentName"
              v-model="department.name"
              placeholder="Tên"
              :disabled="isView" 
              required
              :maxlength="251"
              @change="validateName"
              :class="{ 'input-error': errors.name }"
            />
          </div>
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>

        </div>
        <div class="input-group">
          <label for="departmentDescription">Mô tả:</label>
          <div class="input-with-icon">
            <i class="fas fa-info-circle"></i>
            <input
              id="departmentDescription"
              v-model="department.description"
              placeholder="Mô tả"
              :disabled="isView" 
            />
          </div>
        </div>
        <div class="button-group">
          <button v-if="!isView" type="submit" class="submit-button">
            <i class="fas fa-save"></i> {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
          </button>
          <button v-if="!isView" type="button" class="cancel-button" @click="close">
            <i class="fas fa-times"></i> Hủy
          </button>
          <button v-if="isView" type="button" class="close-button" @click="close">
            <i class="fas fa-times"></i> Đóng
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { Department } from '@/models/Department';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    departmentData: {
      type: Object as () => Department | null,
      default: null
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    isView: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    const department = ref<Department>({
      id: '',
      code: '',
      name: '',
      description: ''
    });

    const errors = ref({
      code: '',
      name: ''
    });

    watch(() => props.departmentData, (newVal) => {
      if (newVal) {
        department.value = { ...newVal };
      } else {
        department.value = { id: '', code: '', name: '', description: '' };
      }
    }, { immediate: true });

    const modalTitle = computed(() => {
      if (props.isView) return 'Xem Phòng Ban';
      return props.isEdit ? 'Chỉnh Sửa Phòng Ban' : 'Thêm Mới Phòng Ban';
    });
   // Validation functions
   const validateCode = () => {
    console.log("🚀 ~ validateCode ~ department.value.code.length:", department.value.code.length)

      errors.value.code = department.value.code.length <= 50 ? '' : 'Mã không được vượt quá 50 ký tự';
    };

    const validateName = () => {
      console.log("🚀 ~ validateName ~ department.value.name.length:", department.value.name.length)

      errors.value.name = department.value.name.length <= 250 ? '' : 'Tên không được vượt quá 250 ký tự';
    };

    // Validation on form submit
    const validate = () => {
      validateCode();
      validateName();
      return !errors.value.code && !errors.value.name;
    };

    const submit = () => {
      if (validate()) {
        emit('submit', department.value);
      }
    };

    const close = () => {
      emit('close');
    };

    return { department, modalTitle, submit, close, errors, validateCode,  validateName, validate};
  }
});
</script>

<style lang="scss">
.input-error {
  border-color: #f44336; /* Red border for errors */
}

.error-message {
  color: #f44336; /* Red color for error messages */
  font-size: 12px;
}

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
  border-radius: 0; /* Remove rounded corners */
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
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
      margin-right: 10px; /* Space between icon and input */
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
    background-color: #4CAF50; /* Green */
  }

  .cancel-button {
    background-color: #f44336; /* Red */
  }

  .close-button {
    background-color: #2196F3; /* Blue */
  }
}
</style>
