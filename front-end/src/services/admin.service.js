import createApiClient from "./api.service";

class AdminService {
    constructor(baseUrl = "http://localhost:3000/api/admin") {
        this.api = createApiClient(baseUrl);
    }

    // Lấy danh sách tất cả người dùng
    async getAllUsers() {
        try {
            const response = await this.api.get("/users");
            console.log("Fetched all users:", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    }

    // Lấy thông tin người dùng theo ID
    async getUserById(id) {
        try {
            const response = await this.api.get(`/users/${id}`);
            console.log("Fetched user by ID:", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    }

    // Tạo người dùng mới
    async createUser(data) {
        try {
            console.log("Creating new user:", data);
            const response = await this.api.post("/users", data);
            console.log("User created successfully:", response);
            return response.data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    // Cập nhật thông tin người dùng
    async updateUser(id, data) {
        try {
            console.log("Updating user with ID:", id);
            const response = await this.api.put(`/users/${id}`, data);
            console.log("User updated successfully:", response);
            return response.data;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }

    // Xóa người dùng theo ID
    async deleteUser(id) {
        try {
            const response = await this.api.delete(`/users/${id}`);
            console.log("User deleted successfully:", response);
            return response.data;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }

    // Cập nhật mật khẩu người dùng
    async updateUserPassword(id, currentPassword, newPassword) {
        try {
            const response = await this.api.put(`/users/${id}/password`, { 
                currentPassword, 
                newPassword, 
                confirmPassword: newPassword 
            });
            console.log("Password updated successfully:", response);
            return response.data;
        } catch (error) {
            console.error("Error updating password:", error);
            throw error;
        }
    }

    // Cập nhật trạng thái tài khoản người dùng (Kích hoạt/Khóa)
    async updateUserStatus(id, status) {
        try {
            const response = await this.api.put(`/users/${id}/status`, { status });
            console.log("User status updated successfully:", response);
            return response.data;
        } catch (error) {
            console.error("Error updating user status:", error);
            throw error;
        }
    }

    // Lấy danh sách thống kê hệ thống (ví dụ: tổng số người dùng, bài viết, v.v.)
    async getSystemStats() {
        try {
            const response = await this.api.get("/stats");
            console.log("System stats fetched:", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching system stats:", error);
            throw error;
        }
    }

    // Đăng xuất admin (xóa token)
    logout() {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
    }
}

export default new AdminService();
