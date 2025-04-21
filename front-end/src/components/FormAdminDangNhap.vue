<template>
  <div>
    <AppHeaderAdmin />
    <div class="admin-login-container">
      <div class="login-box">
        <h2>Đăng nhập Admin</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              v-model="username"
              required
              placeholder="Nhập tên đăng nhập"
            />
          </div>
          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Nhập mật khẩu"
            />
          </div>
          <div class="error-message" v-if="errorMessage">
            {{ errorMessage }}
          </div>
          <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppHeaderAdmin from './AppHeaderAdmin.vue'

export default {
  name: 'FormAdminDangNhap',
  components: {
    AppHeaderAdmin
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const isLoading = ref(false)

    const handleLogin = async () => {
      try {
        isLoading.value = true
        errorMessage.value = ''
        
        console.log('Đang đăng nhập với:', { username: username.value, password: password.value })

        await store.dispatch('adminLogin', {
          username: username.value,
          password: password.value
        })
        
        console.log('Đăng nhập thành công, chuyển hướng đến dashboard')
        
        // Chuyển hướng đến trang admin dashboard
        router.push('/admin/dashboard')
      } catch (error) {
        console.error('Lỗi đăng nhập:', error)
        errorMessage.value = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
      } finally {
        isLoading.value = false
      }
    }

    return {
      username,
      password,
      errorMessage,
      isLoading,
      handleLogin
    }
  }
}
</script>

<style scoped>
.admin-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px); /* Trừ đi chiều cao của header */
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
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
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff0000;
  margin-bottom: 1rem;
  text-align: center;
}
</style> 