<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ modalTitle }}</h2>
      <form @submit.prevent="submit">
        <div class="input-group">
          <label for="userName">Tên đăng nhập:</label>
          <div class="input-with-icon">
            <i class="fas fa-user"></i>
            <input
              id="userName"
              v-model="user.userName"
              placeholder="Tên đăng nhập"
              :disabled="isView"
              required
            />
          </div>
        </div>
        <div class="input-group">
          <label for="fullName">Họ và tên:</label>
          <div class="input-with-icon">
            <i class="fas fa-user-tie"></i>
            <input
              id="fullName"
              v-model="user.fullName"
              placeholder="Họ và tên"
              :disabled="isView"
              required
            />
          </div>
        </div>
        <div class="input-group">
          <label for="email">Email:</label>
          <div class="input-with-icon">
            <i class="fas fa-envelope"></i>
            <input
              id="email"
              v-model="user.email"
              type="email"
              placeholder="Email"
              :disabled="isView"
            />
          </div>
        </div>
        <div class="input-group">
          <label for="phoneNumber">Số điện thoại:</label>
          <div class="input-with-icon">
            <i class="fas fa-phone"></i>
            <input
              id="phoneNumber"
              v-model="user.phoneNumber"
              type="tel"
              placeholder="Số điện thoại"
              :disabled="isView"
            />
          </div>
        </div>
        <div class="input-group">
          <label for="address">Địa chỉ:</label>
          <div class="input-with-icon">
            <i class="fas fa-home"></i>
            <input
              id="address"
              v-model="user.address"
              placeholder="Địa chỉ"
              :disabled="isView"
            />
          </div>
        </div>
        <div class="input-group">
          <label for="departmentId">Mã phòng ban:</label>
          <div class="input-with-icon">
            <i class="fas fa-briefcase"></i>
            <input
              id="departmentId"
              v-model="user.departmentId"
              placeholder="Mã phòng ban"
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
import { User } from '@/models/User';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    userData: {
      type: Object as () => User | null,
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
    const user = ref<User>({
      id: '',
      userName: '', // Add userName field
      fullName: '',
      email: null,
      phoneNumber: null,
      address: null,
      departmentId: null,
    });

    watch(() => props.userData, (newVal) => {
      if (newVal) {
        user.value = { ...newVal };
      } else {
        user.value = {
          id: '',
          userName: '',
          fullName: '',
          email: null,
          phoneNumber: null,
          address: null,
          departmentId: null,
        }; // Reset to default if no data
      }
    }, { immediate: true });

    const modalTitle = computed(() => {
      if (props.isView) return 'Xem Người Dùng';
      return props.isEdit ? 'Chỉnh Sửa Người Dùng' : 'Thêm Mới Người Dùng';
    });

    const submit = () => {
      if (user.value.userName && user.value.fullName) {
        emit('submit', user.value);
      } else {
        // Optionally handle validation or errors
        console.log('Form is incomplete');
      }
    };

    const close = () => {
      emit('close');
    };

    return { user, modalTitle, submit, close };
  }
});
</script>

<style lang="scss">
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
