<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ modalTitle }}</h2>
      <form @submit.prevent="submit">
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

        <div v-if="(!isEdit && !isView)" class="input-group" >
          <label for="password">Mật khẩu:</label>
          <div class="input-with-icon">
            <i class="fas fa-lock"></i>
            <input
              id="password"
              v-model="user.password"
              type="password"
              placeholder="Mật khẩu"
              :disabled="isView"
              :required="false"
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
          <label for="departmentId">Phòng ban:</label>
          <div class="input-with-icon">
            <i class="fas fa-briefcase"></i>
            <div >
              <select  required class="custom-select-wrapper" id="departmentId" v-model="user.departmentId" :disabled="isView">
                <option class="custom-option" v-for="department in departments" :key="department.id" :value="department.id">
                  {{ department.name }}
                </option>
              </select>
            </div>
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
import { User } from '@/models/User'
import { Department } from '@/models/Department';

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
    },
    departments: {
      type: Array as () => Department[],
      required: true
    },
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    // const user = ref<User>({
    //   id: '',
    //   fullName: 'Vux Quang Huyvq123',
    //   email: 'huyvq123@gmail',
    //   phoneNumber: null,
    //   address: null,
    //   departmentId: null,
    //   password: 'Abcd@1234', 
    // });

    const user = ref<User>({
      id: '',
      fullName: '',
      email: null,
      phoneNumber: null,
      address: null,
      departmentId: null,
      password: '', // Thêm trường password
    });
    
    watch(() => props.userData, (newVal) => {
      if (newVal) {
        user.value = { ...newVal };
      } else {
        user.value = {
          id: '',
          fullName: '',
          email: null,
          phoneNumber: null,
          address: null,
          departmentId: null,
          password: '', // Reset lại trường password
        };
      }
    }, { immediate: true });

    const modalTitle = computed(() => {
      if (props.isView) return 'Xem Người Dùng';
      return props.isEdit ? 'Chỉnh Sửa Người Dùng' : 'Thêm Mới Người Dùng';
    });

    const submit = () => {
      if (user.value.email && user.value.fullName) {
        emit('submit', user.value);
      } else {
        console.log('Form is incomplete');
      }
    };

    const close = () => {
      emit('close');
    };
    console.log("🚀 ~ departments:", props.departments)

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
  border-radius: 0;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.custom-select-wrapper {
  position: relative;
  display: inline-block;
  width: 19.5vw;

    padding: 10px 15px 10px 10px; // Space for the icon
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ced4da;
    background-color: #fff;
    color: #495057;
    appearance: none; // Remove default dropdown arrow
    cursor: pointer;

    // Add custom arrow
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px 16px;
  

  // Remove default arrow
  select::-ms-expand {
    display: none;
  }
}

.custom-option {
  background-color: #f8f9fa; // Light background for options
  color: #333; // Text color
  padding: 6px;
  font-size: 15px;
  margin: 2px;

  &:hover {
    background-color: #e9ecef; // Hover background color
    color: #495057; // Hover text color
  }

  &:selected {
    background-color: #007bff; // Selected background color
    color: #fff; // Selected text color
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

  .label {
    font-weight: bold;
    margin-bottom: 8px;
    display: inline-block;
    color: #333;
  }

  .input-group {
    margin-bottom: 16px;
  

  
    .input-with-icon {
      position: relative;
  
      i {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        color: #007bff; // Adjust the color to match your theme
        font-size: 18px;
      }
  
     
    }
  }
  
  
}
</style>
