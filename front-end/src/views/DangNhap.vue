<template>
    <!-- <AppHeader :session_user="session_user"/> -->
      <!-- <div class="login-page">
          <div class="container">
              <div class="row">
                  <div class="col-6">
                      <div class="container quangcao">
                          <div class="row">
                              <h1>ĐĂNG NHẬP ĐỂ TRẢI NGHIỆM TOUR 360°</h1>
                          </div>
                          <div class="row">
                              <h4>Khám phá di tích lịch sử Bình Thủy qua góc nhìn toàn cảnh</h4>
                              <h4>Trải nghiệm tour ảo 360° độc đáo</h4>
                              <h4>Nhiều ưu đãi hấp dẫn</h4>
                          </div>
                      </div>
                  </div>
                  <div class="col-6">
                  <FormDangNhap @login="handleLogin" />
              </div>
          </div>
          </div>
      </div> -->
      <!-- <AppFooter :session_user="session_user"/> -->
  <div class="row mt-5 ">
    <div class="col-md-2 mt-3 mb-3"></div>
      <div class="col">
        <div class="card bg-white" id="login-form-user">
          <!-- <h2 class="fw-bold fs-2" id="login-title-user">ĐĂNG NHẬP</h2> -->
          <FormDangNhap @login="handleLogin" />
          <!-- <div id="register-link">
            <p>Chưa có tài khoản <span><router-link to="/register">Đăng ký</router-link></span></p>
          </div> -->
          <div class="error-text">
            <p v-if="error" class="text-danger">{{ error }}</p>
          </div>
        </div>
      </div>
    <div class="col-md-2"></div>
  </div>
</template>
<style scoped>
.login-page {
  padding: 2rem 0;
}

.quangcao {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  height: 100%;
}

.quangcao h1 {
  color: #4CAF50;
  margin-bottom: 2rem;
  text-align: center;
}

.quangcao h4 {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}
</style>
<script>
import FormDangNhap from "@/components/FormDangNhap.vue";
import UserService from "@/services/user.service";
import store from '@/store'; 
export default {
  name: 'DangNhap',
  components: {
    FormDangNhap,
  },
  data() {
    return {
      error: ''      
    };
  },
  methods: {
      async handleLogin(credentials) {
        try {
          console.log('Đang gửi yêu cầu đăng nhập với:', credentials); // Log dữ liệu đăng nhập
          
          const response = await UserService.login(credentials);
          console.log('Phản hồi từ server:', response); // Log phản hồi từ server
          
          if (!response || !response.token) {
            throw new Error('Token không hợp lệ từ server');
          }

          // Lưu token
          localStorage.setItem('token', response.token);
          localStorage.setItem('User_token', 'true');
          
          // Kiểm tra xem token đã được lưu chưa
          const savedToken = localStorage.getItem('token');
          console.log('Token đã lưu:', savedToken);

          // Lấy thông tin user từ API thay vì sử dụng dữ liệu từ form
          try {
            // Gọi API trực tiếp bằng axios để debug
            const axios = require('axios');
            const userResponse = await axios.get('http://localhost:3000/api/user/me', {
              headers: {
                'Authorization': `Bearer ${response.token}`,
                'Content-Type': 'application/json'
              }
            });
            
            console.log('Thông tin user từ API:', userResponse);
            
            if (userResponse && userResponse.data && userResponse.data.success) {
              // Lưu thông tin user đầy đủ từ API vào store
              this.$store.commit('setSessionUser', userResponse.data.data);
              console.log('Đã lưu thông tin user vào store:', userResponse.data.data);
            } else {
              console.warn('Không nhận được thông tin user đầy đủ từ API');
              // Fallback: sử dụng thông tin từ form đăng nhập
              this.$store.commit('setSessionUser', {
                username: credentials.username,
                email: credentials.email,
              });
            }
          } catch (userError) {
            console.error('Lỗi khi lấy thông tin user:', userError);
            // Fallback: sử dụng thông tin từ form đăng nhập
            this.$store.commit('setSessionUser', {
              username: credentials.username,
              email: credentials.email,
            });
          }

          this.showAlert("Bạn đã đăng nhập thành công", "success");
          this.$router.push({ name: 'trangchu' }); 
        } catch (error) {
          console.error('Lỗi đăng nhập:', error);
          this.error = error.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng.';
        }
    },

    showAlert(message, type) {
      const icon = {
        success: "✅",
        error: "❌"
      }[type];

      alert(`${icon} ${message}`);
    }
  },
}
</script>