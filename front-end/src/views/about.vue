<template>
  <div class="contact-wrapper">
    <div class="header">
      <span class="icon">📌</span>
      <span class="title">Liên hệ</span>
    </div>
    <div class="contact-container">
      <div class="content">
        <h1>Liên hệ</h1>
        <p class="date">{{ currentDate }}</p>
        <p class="contact-info">
          <strong>Ủy ban nhân dân Quận Bình Thủy - Thành phố Cần Thơ</strong>
        </p>
        <p class="contact-info">
          <strong>Địa chỉ:</strong> Khu dân cư Ngân Thuận, phường Bình Thủy, Quận Bình Thủy - Thành phố Cần Thơ
        </p>
        <p class="contact-info">
          <strong>Điện thoại:</strong> 02923.880.444 Bộ phận Tiếp nhận và Trả kết quả; 02923825829 Bộ phận Hành Chính
        </p>
        <p class="contact-info">
          <strong>Email:</strong> <a href="mailto:binhthuy@cantho.gov.vn">binhthuy@cantho.gov.vn</a>
        </p>
      </div>
      <div class="actions">
        <a :href="facebookShareUrl" target="_blank" class="share"><i class="fab fa-facebook fa-lg"></i> Chia sẻ</a>
        <a :href="zaloShareUrl" target="_blank" class="share zalo">💬 Chia sẻ Zalo</a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ContactComponent",
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      shareUrl: "https://facebook.com", // Thay URL trang web cần chia sẻ
    };
  },
  computed: {
    facebookShareUrl() {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareUrl)}`;
    },
    zaloShareUrl() {
      return `https://zalo.me/share?url=${encodeURIComponent(this.shareUrl)}`;
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};
</script>

<style scoped>
.contact-wrapper {
  position: relative;
  width: 100%;
  margin: 150px auto 100px;
}
.contact-container {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background: #fff;
  font-family: Arial, sans-serif;
  position: relative;
}

.header {
  background: #e6e6e6; /* Màu nền xám nhạt */
  color: #002060; /* Màu chữ xanh đậm */
  font-weight: bold;
  font-size: 16px;
  padding: 8px 16px;
  position: relative;
  display: inline-block;
  border-radius: 3px;
  margin-bottom: 20px;
}

.header::before {
  content: "";
  position: absolute;
  top: 0;
  left: -5px;
  width: 5px;
  height: 100%;
  background: #002060; /* Viền trái màu xanh đậm */
}

.header::after {
  content: "";
  position: absolute;
  top: 0;
  right: -10px;
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 10px solid #e6e6e6; /* Tạo mũi tên bằng màu nền */
}

.icon {
  margin-right: 8px;
}

.title {
  font-size: 18px;
}

.content h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.date {
  font-size: 14px;
  color: gray;
}

.contact-info {
  color: red;
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 8px;
}

button {
  padding: 8px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.share {
  background: #1877f2;
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
}
.share:hover {
  background: #125ab6;
}
.print {
  background: #ddd;
}

.top {
  background: #888;
  color: white;
}
</style>
