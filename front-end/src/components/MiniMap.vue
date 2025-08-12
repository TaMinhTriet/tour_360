<template>
  <div class="viewer-wrapper">
    <!-- Pannellum Viewer Container -->
    <div id="panorama-container"></div>

    <!-- MiniMap Component -->
    <div class="mini-map-overlay">
      <img :src="mapImage" alt="Minimap" class="map-image" @click="handleClick($event)" />
      <div
        v-for="point in points"
        :key="point.id"
        class="map-point"
        :style="{
          left: point.x + '%',
          top: point.y + '%'
        }"
        @click.stop="goToPoint(point)"
        :title="point.name"
      ></div>
    </div>

    <!-- Chatbot (placeholder) -->
    <div class="chatbot">
      <p><strong>Hướng dẫn viên ảo:</strong> Xin chào! Bấm vào sơ đồ để bắt đầu tham quan.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const mapImage = 'https://res.cloudinary.com/dku2deoem/image/upload/v1745389520/frame_0001_ft8gav.jpg';

const points = [
  {
    id: '1',
    name: 'Cổng chính',
    x: 85,
    y: 75,
    panoramaId: 'gate'
  },
  {
    id: '2',
    name: 'Chính điện',
    x: 50,
    y: 50,
    panoramaId: 'main-hall'
  },
  {
    id: '3',
    name: 'Hậu điện',
    x: 30,
    y: 35,
    panoramaId: 'back-hall'
  }
];

const goToPoint = (point) => {
  loadPanorama(point.panoramaId);
};

function loadPanorama(panoramaId) {
  if (window.viewer) {
    window.viewer.loadScene(panoramaId);
  } else {
    console.warn('Pannellum viewer not found');
  }
}

function handleClick(e) {
  const rect = e.target.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  console.log(`Clicked at x: ${x.toFixed(2)}%, y: ${y.toFixed(2)}%`);
}
</script>

<style scoped>
.viewer-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
}

#panorama-container {
  width: 100%;
  height: 100%;
  background: #000;
}

.mini-map-overlay {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 280px;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.map-image {
  width: 100%;
  display: block;
}

.map-point {
  position: absolute;
  width: 14px;
  height: 14px;
  background-color: red;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
}

.chatbot {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 1rem;
  font-size: 14px;
  z-index: 1001;
}
</style>
