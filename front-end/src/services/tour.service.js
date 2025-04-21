import api from '../api/api.config';

class TourService {
    // Lấy danh sách tour
    async getAllTours() {
        try {
            const response = await api.get('/tours');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Lấy chi tiết một tour
    async getTourById(id) {
        try {
            const response = await api.get(`/tours/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Tạo tour mới
    async createTour(tourData) {
        try {
            const response = await api.post('/tours', tourData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Cập nhật tour
    async updateTour(id, tourData) {
        try {
            const response = await api.put(`/tours/${id}`, tourData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Xóa tour
    async deleteTour(id) {
        try {
            const response = await api.delete(`/tours/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new TourService(); 