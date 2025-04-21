<template>
    <form @submit.prevent="submitForm">
      <div class="form-group mb-3">
        <label for="username">Tên đăng nhập:</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="userForm.username"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="email">Email:</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="userForm.email"
          required
        />
      </div>
  
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary">
          Cập nhật
        </button>
        <!-- <button type="button" class="btn btn-danger" @click="deleteAccount">
          Xóa tài khoản
        </button> -->
      </div>
    </form>
  </template>
  
  <script>
  export default {
    name: 'FormCapNhatThongTinUser',
    props: {
      nguoidung: {
        type: Object,
        required: true
      },
      mode: {
        type: String,
        default: 'edit'
      }
    },
    data() {
      return {
        userForm: {
          username: '',
          email: ''
        }
      }
    },
    created() {
      // Khởi tạo form với dữ liệu từ props
      this.userForm = {
        ...this.nguoidung
      }
    },
    methods: {
      submitForm() {
        // Kiểm tra xem có _id hay id
        const userId = this.nguoidung._id || this.nguoidung.id;
        
        if (!userId) {
          console.error('Không tìm thấy ID người dùng:', this.nguoidung);
          alert('Không thể cập nhật thông tin: Thiếu ID người dùng');
          return;
        }
  
        this.$emit('submit:nguoidung', {
          ...this.userForm,
          _id: userId
        });
      },
      deleteAccount() {
        this.$emit('delete:nguoidung');
      }
    }
  }
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    font-weight: bold; 
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #4CAF50;
    color: white;
  }
  
  .btn-danger {
    background-color: #f44336;
    color: white;
  }
  </style>