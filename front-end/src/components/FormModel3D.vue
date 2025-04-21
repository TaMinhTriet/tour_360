<template>
  <div :id="modalId" ref="modal" class="modal fade" tabindex="-1" :aria-labelledby="modalId + 'Label'" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="modalId + 'Label'">{{ title }}</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- Cột trái: Nhúng iframe hoặc hình ảnh -->
            <div class="col-md-6" v-if="iframeSrc">
              <div class="modal-viewer-container" style="height: 300px;">
                <iframe
                  style="width: 100%; height: 100%;"
                  :src="iframeSrc"
                  frameborder="0"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true">
                </iframe>
              </div>
            </div>

            <!-- Cột phải: Nội dung mô tả -->
            <div :class="iframeSrc ? 'col-md-6' : 'col-12'">
              <h4>{{ subtitle }}</h4>
              <p v-for="(info, index) in infoList" :key="index">
                <strong>{{ info.label }}:</strong> {{ info.value }}
              </p>
              
              <div class="description mt-3" v-if="description">
                <h5>Mô tả:</h5>
                <p>{{ description }}</p>
              </div>

              <div class="features mt-3" v-if="features.length">
                <h5>Đặc điểm nổi bật:</h5>
                <ul>
                  <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  props: {
    modalId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Thông tin'
    },
    subtitle: {
      type: String,
      default: 'Chi tiết'
    },
    iframeSrc: {
      type: String,
      default: ''
    },
    infoList: {
      type: Array,
      default: () => []
    },
    description: {
      type: String,
      default: ''
    },
    features: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    closeModal() {
      const modalElement = document.getElementById(this.modalId);
      if (modalElement && modalElement.classList.contains('show')) {
        modalElement.classList.remove('show');
        modalElement.setAttribute('aria-hidden', 'true');
        modalElement.style.display = 'none';
        
        // Xóa backdrop nếu có
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
      }
    }
    // closeModal() {
    //   const modalElement = document.getElementById(this.modalId);
    //   if (modalElement) {
    //     // Chuyển focus ra khỏi modal trước khi đóng
    //     document.activeElement?.blur();  

    //     // Lấy instance của modal và đóng
    //     const modal = Modal.getOrCreateInstance(modalElement);
    //     modal.hide();
    //   }
    // }
    // closeModal() {
    //   const modalElement = document.getElementById(this.modalId);
    //   if (modalElement) {
    //     document.activeElement?.blur(); // Xóa focus khỏi phần tử bị ẩn

    //     // Lấy instance của modal hoặc tạo mới nếu chưa có
    //     let modal = bootstrap.Modal.getInstance(modalElement);
    //     if (!modal) {
    //       modal = new bootstrap.Modal(modalElement);
    //     }
    //     modal.hide();
    //   }
    // }
  
  },
};
</script>

<style scoped>
.modal-viewer-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
</style>
