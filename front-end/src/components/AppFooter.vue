<template>
  <footer class="footer bg-dark text-white mt-auto">
    <div class="container-fluid">
      <div class="row justify-content-center py-5">
        <!-- Về chúng tôi -->
        <div class="col-12 col-md-4 mb-4 mb-md-0 px-4">
          <h3 class="h5 mb-3">Về chúng tôi</h3>
          <p class="text-secondary">Tour 360° Bình Thủy - Khám phá di tích lịch sử Bình Thủy qua góc nhìn toàn cảnh.</p>
        </div>

        <!-- Liên hệ -->
        <div class="col-12 col-md-4 mb-4 mb-md-0 px-4">
          <h3 class="h5 mb-3">Liên hệ</h3>
          <div class="text-secondary">
            <p class="mb-2">
              <i class="fa-solid fa-address-card"></i>
              Địa chỉ: Bình Thủy, Cần Thơ
            </p>
            <p class="mb-2">
              <i class="fa-solid fa-address-book"></i>
              Điện thoại: (123) 456-7890
            </p>
            <p class="mb-0">
              <i class="fa-solid fa-envelope me-2"></i>
              Email: info@tour360binhthuy.com
            </p>
          </div>
        </div>

        <!-- Mạng xã hội -->
        <div class="col-12 col-md-4 px-4">
          <h3 class="h5 mb-3">Theo dõi chúng tôi</h3>
          <div class="d-flex gap-3">
            <a href="https://web.facebook.com/" class="text-white text-decoration-none">
              <i class="fab fa-facebook fa-lg"></i>
            </a>
            <a href="https://www.instagram.com/" class="text-white text-decoration-none">
              <i class="fab fa-instagram fa-lg"></i>
            </a>
            <a href="https://www.youtube.com/" class="text-white text-decoration-none">
              <i class="fab fa-youtube fa-lg"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Footer bottom -->
      <div class="row border-top border-secondary py-3">
        <div class="col-12 text-center">
          <p class="mb-0 text-secondary">
            &copy; {{ currentYear }} Tour 360° Bình Thủy. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

/* Hiệu ứng hover cho icon */
.fa-facebook:hover { color: #1877f2 !important; }
.fa-instagram:hover { color: #e4405f !important; }
.fa-youtube:hover { color: #cd201f !important; }
</style>