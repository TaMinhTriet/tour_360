<template>
  <!-- <AppHeader :session_user="session_user" /> -->
  <div class="register-page">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <FormDangKy @register="handleRegister" />
          <div class="error-text">
            <p v-if="error" class="text-danger">{{ error }}</p>
          </div>
        </div>
        <div class="col-6">
          <div class="container quangcao" style="margin-top: 2rem;">
            <div class="row">
              <h1>ĐĂNG KÝ TÀI KHOẢN MỚI</h1>
            </div>
            <div class="row">
              <h4>Khám phá di tích lịch sử Bình Thủy qua góc nhìn toàn cảnh</h4>
              <h4>Trải nghiệm tour ảo 360° độc đáo</h4>
              <h4>Nhiều ưu đãi hấp dẫn</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <AppFooter :session_user="session_user" /> -->
</template>

<script>
import FormDangKy from "@/components/FormDangKy.vue";
import UserService from "@/services/user.service";
import store from '@/store'

export default {
  name: 'DangKy',
  components: {
    FormDangKy,
  },
  data() {
    return {
      error: ''
    }
  },
  methods: {
    async handleRegister(registerData) {
      try {
        // Kiểm tra dữ liệu đầu vào
        if (!registerData.username || !registerData.password || !registerData.email) {
          this.error = 'Vui lòng điền đầy đủ thông tin';
          return;
        }

        // Log dữ liệu trước khi gửi để kiểm tra
        console.log("Dữ liệu đăng ký:", registerData);

        // Gọi API đăng ký
        const response = await UserService.register(registerData);
        
        // Log phản hồi từ server để kiểm tra
        console.log("Phản hồi từ server:", response);

        if (response && response.data) {
          this.showAlert("Đăng ký thành công! Vui lòng đăng nhập.", "success");
          this.$router.push({ name: "DangNhap" });
        } else {
          throw new Error('Không nhận được phản hồi hợp lệ từ server');
        }
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        this.error = error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
        this.showAlert(this.error, "error");
      }
    },

    showAlert(message, type) {
      const icon = {
        success: "✅",
        error: "❌"
      }[type];

      alert(`${icon} ${message}`);
    }
  }
}
</script>

<style scoped>
.register-page {
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

.error-text {
  margin-top: 1rem;
  text-align: center;
}
</style>
