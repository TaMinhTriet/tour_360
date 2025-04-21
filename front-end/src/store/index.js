import { createStore } from 'vuex'
// Create a new store instance.
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;


const store = createStore({
  state: {
    session_user: null,
    admin: null,
    adminToken: null
  },
  mutations: {
    setSessionUser(state, user) {
      console.log('Setting session user:', user);
      state.session_user = user; 
    },
    setAdmin(state, admin) {
      state.admin = admin;
    },
    setAdminToken(state, token) {
      state.adminToken = token;
    },
    clearAdmin(state) {
      state.admin = null;
      state.adminToken = null;
    }
  },
  actions: {
    login({ commit }, userData) {
      // Không cần xử lý gì ở đây, vì việc lưu user vào store đã được xử lý trong component DangNhap.vue
      return new Promise((resolve) => {
        resolve({ success: true });
      });
    },
    register({ commit }, userData) {
      // Implement API call here
      return new Promise((resolve, reject) => {
        try {
          // Mock register
          resolve({ success: true })
        } catch (error) {
          reject(error)
        }
      })
    },
    logout({ commit }) {
      commit('setSessionUser', null)
    },
    // Admin actions
    async adminLogin({ commit }, { username, password }) {
      try {
        console.log('adminLogin action được gọi với:', { username, password })
        
        const response = await axios.post('${baseURL}/admin/login', {
          username,
          password
        });
        
        console.log('Response từ API login:', response.data)
        
        if (response.data.token) {
          commit('setAdminToken', response.data.token);
          // Lấy thông tin admin
          const adminResponse = await axios.get('${baseURL}/admin/me', {
            headers: {
              Authorization: `Bearer ${response.data.token}`
            }
          });
          
          console.log('Response từ API getAdminProfile:', adminResponse.data)
          
          if (adminResponse.data.success) {
            commit('setAdmin', adminResponse.data.data);
          }
          return { success: true };
        }
      } catch (error) {
        console.error('Lỗi trong adminLogin action:', error)
        throw error;
      }
    },
    async getAdminProfile({ commit, state }) {
      try {
        const response = await axios.get('${baseURL}/admin/me', {
          headers: {
            Authorization: `Bearer ${state.adminToken}`
          }
        });
        
        if (response.data.success) {
          commit('setAdmin', response.data.data);
          return response.data.data;
        }
      } catch (error) {
        throw error;
      }
    },
    adminLogout({ commit }) {
      commit('clearAdmin');
    }
  },
  getters: {
    isLoggedIn: state => !!state.session_user,
    currentUser: state => state.session_user,
    isAdminLoggedIn: state => !!state.adminToken,
    currentAdmin: state => state.admin
  },
  plugins: [createPersistedState()],
})

export default store;
