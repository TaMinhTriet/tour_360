<template>
  <div class="tour-list">
    <h2>Danh sách Tour</h2>
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="tour in tours" :key="tour._id">
        <div class="card">
          <img :src="tour.thumbnail" class="card-img-top" alt="Tour thumbnail">
          <div class="card-body">
            <h5 class="card-title">{{ tour.name }}</h5>
            <p class="card-text">{{ tour.description }}</p>
            <router-link :to="'/tour/' + tour._id" class="btn btn-primary">
              Xem chi tiết
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TourService from '@/services/tour.service';

export default {
  name: 'TourList',
  data() {
    return {
      tours: [],
      error: null
    };
  },
  async created() {
    try {
      this.tours = await TourService.getAllTours();
    } catch (error) {
      this.error = 'Không thể tải danh sách tour. Vui lòng thử lại sau.';
      console.error('Error loading tours:', error);
    }
  }
};
</script>

<style scoped>
.tour-list {
  padding: 20px;
}

.card {
  height: 100%;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style> 