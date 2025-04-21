<template>
    <div id="video-container" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mousemove="handleMouseMove">
      <video
        ref="videoRef"
        autoplay
        muted
        @loadedmetadata="handleLoadedMetadata"
        style="width: 80%; height: 60%; object-fit: cover; outline: none; cursor: grab;"
      >
        <source src="https://res.cloudinary.com/dku2deoem/video/upload/v1745226153/video_ok_qeenx7.mp4" type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const videoRef = ref(null);
  const isDragging = ref(false);
  const startX = ref(0);
  const sensitivity = 0.01;
  const targetTime = ref(0);
  const lastUpdateTime = ref(0);
  
  const handleLoadedMetadata = () => {
    if (videoRef.value) {
      targetTime.value = videoRef.value.currentTime;
    }
  };
  
  const handleMouseDown = (e) => {
    if (!videoRef.value) return;
    isDragging.value = true;
    startX.value = e.clientX;
    targetTime.value = videoRef.value.currentTime;
    videoRef.value.pause();
    videoRef.value.style.cursor = 'grabbing';
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging.value || !videoRef.value) return;
  
    const deltaX = e.clientX - startX.value;
    targetTime.value -= deltaX * sensitivity;
    startX.value = e.clientX;
  
    const duration = videoRef.value.duration;
  
    // Tua vòng
    if (targetTime.value < 0) {
      targetTime.value = duration + targetTime.value;
    } else if (targetTime.value > duration) {
      targetTime.value = targetTime.value - duration;
    }
  
    const currentTime = Date.now();
    if (currentTime - lastUpdateTime.value > 16) {
      videoRef.value.currentTime = targetTime.value;
      lastUpdateTime.value = currentTime;
    }
  };
  
  const handleMouseUp = () => {
    if (!videoRef.value || !isDragging.value) return;
    isDragging.value = false;
    videoRef.value.style.cursor = 'grab';
    videoRef.value.play();
  };
  </script>
  
  <style scoped>
  #video-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  </style>
  