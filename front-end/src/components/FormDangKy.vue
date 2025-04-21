<template>
  <div class="register-form">
    <h2>Đăng ký tài khoản</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Tên đăng nhập</label>
        <input
          type="text"
          id="username"
          v-model="formData.username"
          required
          placeholder="Nhập tên đăng nhập"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          required
          placeholder="Nhập email"
        />
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          required
          placeholder="Nhập mật khẩu"
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Xác nhận mật khẩu</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="formData.confirmPassword"
          required
          placeholder="Nhập lại mật khẩu"
        />
      </div>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Đang đăng ký...' : 'Đăng ký' }}
      </button>
      <div class="login-link">
        Đã có tài khoản? 
        <router-link to="/dang-nhap">Đăng nhập</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormDangKy',
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      error: '',
      isLoading: false
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.formData.username || !this.formData.email || !this.formData.password || !this.formData.confirmPassword) {
        this.error = 'Vui lòng nhập đầy đủ thông tin'
        return
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.error = 'Mật khẩu xác nhận không khớp'
        return
      }

      this.isLoading = true
      this.error = null

      try {
        await this.$emit('register', {
          username: this.formData.username,
          email: this.formData.email,
          password: this.formData.password
        })
      } catch (error) {
        this.error = error.message || 'Đăng ký thất bại'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.register-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 2rem auto;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover {
  background-color: #45a049;
}

.error-message {
  color: #f44336;
  margin-bottom: 1rem;
  text-align: center;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}

.login-link a {
  color: #4CAF50;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>