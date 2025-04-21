<template>
  <header class="header">
    
    <nav class="nav-container">
      <div class="logo">
        <router-link to="/">
          <img src="https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/logo_xjkzpa.jpg " alt="Shop" width="80" height="80" class="logo-img" />
        </router-link>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Trang chủ</router-link>
        <router-link to="/360-product" class="nav-link">Tours 360</router-link>
        <router-link to="/3D-product" class="nav-link">Cổ vật 3D</router-link>
        <router-link to="/about" class="nav-link">Liên hệ</router-link>
      </div>
      <div class="user-buttons" v-if="!isLoggedIn">
        <router-link to="/dang-nhap" class="user-btn login">Đăng nhập</router-link>
        <router-link to="/dang-ky" class="user-btn register">Đăng ký</router-link>
      </div>
      <div class="user-menu" v-if="isLoggedIn">
        <div class="user-info">
          <router-link to="/canhan" class="nav-link">
            <span class="username" v-if="username">{{ username }}</span>
            <span v-else>Tài khoản</span>
          </router-link>
          <button @click="handleLogout" class="user-btn logout">Đăng xuất</button>
        </div>
      </div>
    </nav>
    
  </header>
</template>

<script>
import store from '@/store'

export default {
  name: 'AppHeader',
  data() {
    return {
      isLoggedIn: false,
      username: ''
    }
  },
  created() {
    this.checkLoginStatus()
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem('token')
      const userToken = localStorage.getItem('User_token')
      this.isLoggedIn = !!token && !!userToken
      
      if (store.state.session_user) {
        this.username = store.state.session_user.username
      }
    },
    handleLogout() {
      localStorage.removeItem('token')
      localStorage.removeItem('User_token')
      store.commit('setSessionUser', null)
      this.isLoggedIn = false
      this.username = ''
      
      this.$router.push('/dang-nhap')
    }
  },
  watch: {
    '$store.state.session_user'(newValue) {
      if (newValue) {
        this.isLoggedIn = true
        this.username = newValue.username
      }
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #8BCF92;
  /* background-color: #f9fffa; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-bottom: 100px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-img {
  height: 40px;
  width: auto;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #4CAF50;
}

.user-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.user-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login {
  color: #4CAF50;
  border: 1px solid #4CAF50;
}

.login:hover {
  background-color: #4CAF50;
  color: white;
}

.register {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.register:hover {
  background-color: #45a049;
}

.logout {
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
}

.logout:hover {
  background-color: #d32f2f;
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  font-weight: 500;
  color: #333;
  cursor: pointer;
  text-decoration: none;
}

.username:hover {
  color: #4CAF50;
}

@media (max-width: 768px) {
  .nav-container {
    flex-wrap: wrap;
  }

  .nav-links {
    order: 3;
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }

  .user-buttons {
    order: 2;
  }

  .user-menu {
    order: 2;
  }
}
</style> 