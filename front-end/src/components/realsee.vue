<template>
    <div class="viewer-wrapper">
      <div class="iframe-container" v-if="canEmbed">
        <iframe
          :src="realseeUrl"
          frameborder="0"
          allowfullscreen
          class="viewer-iframe"
          ref="iframeRef"
        ></iframe>
      </div>
  
      <div v-else class="fallback">
        <p>Trình duyệt không cho phép nhúng Realsee vào trang này.</p>
        <button @click="openInNewTab" class="open-btn">Mở trong tab mới</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const realseeUrl = 'https://realsee.ai/preview/GoXNr5QWATEPzrH4mk/1qOpByrkpYktvSNSj/daec?entry=share';
  const canEmbed = ref(true);
  const iframeRef = ref(null);
  
  const openInNewTab = () => {
    window.open(realseeUrl, '_blank');
  };
  
  // Kiểm tra xem iframe có bị chặn không
  onMounted(() => {
    setTimeout(() => {
      try {
        // Nếu không cùng origin, truy cập sẽ bị lỗi
        const iframeDoc = iframeRef.value?.contentWindow?.document;
        if (!iframeDoc) throw new Error('Blocked');
      } catch (e) {
        canEmbed.value = false;
      }
    }, 1000); // đợi iframe load
  });
  </script>
  
  <style scoped>
  .viewer-wrapper {
    width: 80%;
    height: 100%;
    background: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    box-sizing: border-box;
  }
  
  .iframe-container {
    width: 100%;
    height: 100%;
    max-width: 1280px;
    aspect-ratio: 16 / 9;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
  }
  
  .viewer-iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  
  .fallback {
    text-align: center;
  }
  
  .open-btn {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease;
  }
  
  .open-btn:hover {
    background-color: #0056b3;
  }
  </style>
  