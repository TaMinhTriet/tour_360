import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = import.meta.env.VITE_API_BASE_URL + "/api/user") {
        this.api = createApiClient(baseUrl);
    }
    async getMe() {
        return (await this.api.get("/")).data;
    }
    async getUserById(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getUserByUsername(name) {
        return (await this.api.get(`?name=${name}`)).data;
    }
    async getUserEmail(id) {
        return (await this.api.get(`/${id}/email`)).data;
    }
    async getCurrentUser() {
        try {
            // Lấy thông tin user từ token hiện tại
            const response = await this.api.get("/me");
            console.log("Raw response from /me endpoint:", response);
            
            // Kiểm tra và trả về response
            if (response && response.data) {
                console.log("User data from /me endpoint:", response.data);
                return response;  // Trả về toàn bộ response
            } else {
                console.error("Invalid response format:", response);
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
    }
    async login(credentials) {
        try {
            const response = await this.api.post("/login", credentials);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async register(data) {
        try {
            console.log('UserService register data:', data); // Log dữ liệu trước khi gửi
            const response = await this.api.post("/register", data);
            console.log('UserService register response:', response); // Log response
            return response.data;
        } catch (error) {
            console.log('UserService register error:', error); // Log lỗi
            throw error; // Ném lỗi để component xử lý
        }
    }

    // async create(data) {
    //     return (await this.api.post("/", data)).data;
    // }

    // async deleteAll() {
    //     return (await this.api.delete("/")).data;
    // }

    async update(id, data) {
        console.log("Updating user with ID:", id);
        console.log("Update data:", data);
        return (await this.api.put(`/${id}`, data)).data;
    }
    
    async updatePassword(currentPassword, newPassword) {
        try {
            console.log("Updating password");
            // Lấy thông tin người dùng hiện tại
            const currentUser = await this.getCurrentUser();
            console.log("Current user data:", currentUser);
            
            if (!currentUser || !currentUser.data || !currentUser.data.id) {
                console.error("Không thể lấy thông tin người dùng:", currentUser);
                throw new Error('Không thể lấy thông tin người dùng');
            }
            
            const userId = currentUser.data.id;
            console.log("Updating password for user ID:", userId);
            
            // Gọi API trực tiếp đến endpoint cập nhật mật khẩu
            // Gửi đầy đủ thông tin mà backend mong đợi
            const response = await this.api.put(`/${userId}/password`, { 
                currentPassword: currentPassword || "dummy-password", // Gửi một giá trị mặc định nếu không có
                newPassword, 
                confirmPassword: newPassword 
            });
            
            console.log("Password update response:", response);
            return response.data;
        } catch (error) {
            console.error("Error in updatePassword service:", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
            }
            throw error;
        }
    }

    async updatePasswordWithoutVerification(newPassword) {
        try {
            console.log("Updating password without verification");
            // Lấy thông tin người dùng hiện tại
            const currentUser = await this.getCurrentUser();
            console.log("Current user data:", currentUser);
            
            if (!currentUser || !currentUser.data) {
                console.error("Không thể lấy thông tin người dùng:", currentUser);
                throw new Error('Không thể lấy thông tin người dùng');
            }
            
            // Lấy ID từ đúng vị trí trong response
            const userData = currentUser.data;
            console.log("User data structure:", userData);
            
            // Kiểm tra các vị trí có thể chứa ID
            const userId = userData._id || userData.id || (userData.data && (userData.data._id || userData.data.id));
            console.log("User ID for password update:", userId);
            
            if (!userId) {
                console.error("User data structure:", userData);
                throw new Error('Không tìm thấy ID người dùng');
            }
            
            // Gọi API mới để cập nhật mật khẩu mà không cần kiểm tra mật khẩu hiện tại
            const response = await this.api.put(`/${userId}/password-no-verify`, { 
                newPassword, 
                confirmPassword: newPassword 
            });
            
            console.log("Password update response:", response);
            return response.data;
        } catch (error) {
            console.error("Error in updatePasswordWithoutVerification service:", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
                throw error;
            } else if (error.request) {
                console.error("No response received:", error.request);
                throw new Error('Không nhận được phản hồi từ máy chủ');
            } else {
                console.error("Error:", error.message);
                throw error;
            }
        }
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('User_token');
    }
}

export default new UserService();