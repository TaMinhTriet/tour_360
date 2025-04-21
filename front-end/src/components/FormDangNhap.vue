<template>
  <div class="login-form">
    <h2>Đăng nhập</h2>
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
        <label for="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          required
          placeholder="Nhập mật khẩu"
        />
      </div>
      <div class="error-message" v-if="error">
        {{ error }}
      </div>
      <button type="submit" class="submit-button" :disabled="loading">
        {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
      </button>
      <div class="register-link">
        Chưa có tài khoản? 
        <router-link to="/dang-ky">Đăng ký ngay</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormDangNhap',
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      error: null,
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.formData.username || !this.formData.password) {
        this.error = 'Vui lòng nhập đầy đủ thông tin'
        return
      }

      this.loading = true
      this.error = null

      try {
        await this.$emit('login', this.formData)
      } catch (error) {
        this.error = error.message || 'Đăng nhập thất bại'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 2rem auto;
  margin-top: 100px;
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

.submit-button {
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

.submit-button:hover {
  background-color: #45a049;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #f44336;
  margin-bottom: 1rem;
  text-align: center;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
}

.register-link a {
  color: #4CAF50;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
