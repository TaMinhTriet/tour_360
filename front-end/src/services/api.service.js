import axios from "axios"; // thư viện tạo và quản lý các yêu cầu http
const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};
export default (baseURL) => {
    const instance = axios.create({
        baseURL,
        ...commonConfig,
    });
    
    // Thêm interceptor để tự động thêm token vào header
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    
    return instance;
};