<template>
  <div>
    <AppHeaderAdmin />
    <div style="height: 150px"></div> <!-- Thêm khoảng trống để dời nội dung xuống -->
    <div class="admin-dashboard">
      <div class="dashboard-header">
        <h1>>Quản lý người dùng</h1>
        <div class="user-info">
          <b><span>Xin chào, {{ adminUser.username }}</span></b>
          <button @click="handleLogout" class="logout-btn">Đăng xuất</button>
        </div>
      </div>

      <div class="dashboard-content">
        <div class="user-management">
          <div class="section-header">
            <h2>Danh sách người dùng</h2>
            <button @click="showAddUserModal = true" class="add-user-btn">
              Thêm người dùng mới
            </button>
          </div>

          <div class="user-filters">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Tìm kiếm người dùng..." 
              class="search-input"
            />
          </div>

          <!-- Hiển thị thông báo khi đang tải dữ liệu -->
          <div v-if="isLoading" class="loading-message">
            Đang tải dữ liệu...
          </div>

          <!-- Hiển thị thông báo khi có lỗi -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
            <button @click="fetchUsers" class="retry-btn">Thử lại</button>
          </div>

          <!-- Hiển thị thông báo khi không có dữ liệu -->
          <div v-if="!isLoading && !errorMessage && filteredUsers.length === 0" class="no-data-message">
            Không có người dùng nào.
          </div>

          <!-- Hiển thị bảng dữ liệu -->
          <div v-if="!isLoading && !errorMessage && filteredUsers.length > 0" class="users-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in filteredUsers" :key="user._id">
                  <td>
                    <div class="user-info-row">
                      <div class="profile-picture">
                        <img src="https://res.cloudinary.com/dku2deoem/image/upload/v1745221275/avatar_admin_ok1hjk.jpg" alt="Avatar" />
                       
                      </div>
                      <span>{{ user._id }}</span>
                    </div>
                    
                  </td>
                  <td>{{ user.username }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ formatDate(user.createdAt) }}</td>
                  <td class="actions">
                    <button @click="editUser(user)" class="edit-btn">Sửa</button>
                    <button @click="deleteUser(user)" class="delete-btn">Xóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal thêm/sửa người dùng -->
      <div v-if="showAddUserModal || showEditUserModal" class="modal">
        <div class="modal-content">
          <div class="d-flex justify-content-center">
            <div class="profile-picture-change">
              <img src="https://res.cloudinary.com/dku2deoem/image/upload/v1745221276/avatar_change_twlyie.jpg" alt="Avatar" />
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <h3>{{ showEditUserModal ? 'Thay đổi thông tin người dùng' : 'Thêm người dùng mới' }}</h3>
          </div>
          
          <form @submit.prevent="handleSubmitUser">
            <div class="form-group">
              <label for="username">Tên người dùng:</label>
              <input 
                type="text" 
                id="username" 
                v-model="userForm.username" 
                required 
              />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                v-model="userForm.email" 
                required 
              />
            </div>
            <div class="form-group">
              <label for="password">Mật khẩu:</label>
              <input 
                type="password" 
                id="password" 
                v-model="userForm.password" 
                :required="!showEditUserModal" 
              />
              <small v-if="showEditUserModal">Để trống nếu không muốn thay đổi mật khẩu</small>
            </div>
            <div class="modal-actions">
              <button type="button" @click="closeModal" class="cancel-btn">Hủy</button>
              <button type="submit" class="save-btn">
                {{ showEditUserModal ? 'Cập nhật' : 'Thêm mới' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal xác nhận xóa -->
      <div v-if="showDeleteModal" class="modal">
        <div class="modal-content">
          <h3>Xác nhận xóa</h3>
          <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
          <div class="modal-actions">
            <button @click="showDeleteModal = false" class="cancel-btn">Hủy</button>
            <button @click="confirmDeleteUser" class="delete-btn">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
import AppHeaderAdmin from '@/components/AppHeaderAdmin.vue';

export default {
  name: 'AdminDashboard',
  components: {
    AppHeaderAdmin
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    
    // Sử dụng computed để lấy thông tin admin từ store
    const adminUser = computed(() => store.getters.currentAdmin);
    
    const users = ref([]);
    const searchQuery = ref('');
    const showAddUserModal = ref(false);
    const showEditUserModal = ref(false);
    const showDeleteModal = ref(false);
    const isLoading = ref(false);
    const errorMessage = ref('');
    const userForm = ref({
      username: '',
      email: '',
      password: ''
    });
    const userToDelete = ref(null);

    // Kiểm tra đăng nhập
    onMounted(() => {
      if (!store.getters.isAdminLoggedIn) {
        router.push('/admin/login');
        return;
      }
      fetchUsers();
    });

    // Lọc người dùng theo tìm kiếm
    const filteredUsers = computed(() => {
      return users.value.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                             user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesSearch;
      });
    });

    // Lấy danh sách người dùng
    const fetchUsers = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = '';
        
        const response = await axios.get('http://localhost:3000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${store.state.adminToken}`
          }
        });
        
        if (response.data.success) {
          users.value = response.data.data;
        } else {
          errorMessage.value = 'Không thể tải danh sách người dùng. Vui lòng thử lại sau.';
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        errorMessage.value = error.response?.data?.message || 'Không thể tải danh sách người dùng. Vui lòng thử lại sau.';
      } finally {
        isLoading.value = false;
      }
    };

    // Xử lý đăng xuất
    const handleLogout = () => {
      store.dispatch('adminLogout');
      router.push('/admin/login');
    };

    // Mở modal sửa người dùng
    const editUser = (user) => {
      userForm.value = { ...user, password: '' };
      showEditUserModal.value = true;
    };

    // Mở modal xóa người dùng
    const deleteUser = (user) => {
      userToDelete.value = user;
      showDeleteModal.value = true;
    };

    // Xác nhận xóa người dùng
    const confirmDeleteUser = async () => {
      try {
        await axios.delete(`http://localhost:3000/api/admin/users/${userToDelete.value._id}`, {
          headers: {
            Authorization: `Bearer ${store.state.adminToken}`
          }
        });
        showDeleteModal.value = false;
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Không thể xóa người dùng. Vui lòng thử lại sau.');
      }
    };

    // Đóng modal
    const closeModal = () => {
      showAddUserModal.value = false;
      showEditUserModal.value = false;
      userForm.value = {
        username: '',
        email: '',
        password: ''
      };
    };

    // Xử lý thêm/sửa người dùng
    const handleSubmitUser = async () => {
      try {
        if (showEditUserModal.value) {
          // Cập nhật người dùng
          const updateData = { ...userForm.value };
          if (!updateData.password) {
            delete updateData.password;
          }
          
          await axios.put(
            `http://localhost:3000/api/admin/users/${userForm.value._id}`,
            updateData,
            {
              headers: {
                Authorization: `Bearer ${store.state.adminToken}`
              }
            }
          );
        } else {
          // Thêm người dùng mới
          await axios.post(
            'http://localhost:3000/api/admin/users',
            userForm.value,
            {
              headers: {
                Authorization: `Bearer ${store.state.adminToken}`
              }
            }
          );
        }
        
        closeModal();
        fetchUsers();
      } catch (error) {
        console.error('Error saving user:', error);
        alert('Không thể lưu thông tin người dùng. Vui lòng thử lại sau.');
      }
    };

    // Định dạng ngày tháng
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return {
      adminUser,
      users,
      searchQuery,
      filteredUsers,
      showAddUserModal,
      showEditUserModal,
      showDeleteModal,
      isLoading,
      errorMessage,
      userForm,
      handleLogout,
      editUser,
      deleteUser,
      confirmDeleteUser,
      closeModal,
      handleSubmitUser,
      formatDate,
      fetchUsers
    };
  }
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 64px); /* Trừ đi chiều cao của header */
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-weight: bold;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}
.profile-picture {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  /* width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  position: relative; */
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logout-btn {
  padding: 8px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-user-btn {
  padding: 8px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.user-filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
}

.loading-message, .error-message, .no-data-message {
  text-align: center;
  padding: 20px;
  margin: 20px 0;
  border-radius: 4px;
}

.loading-message {
  background-color: #e3f2fd;
  color: #0d47a1;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
}

.no-data-message {
  background-color: #f5f5f5;
  color: #616161;
}

.retry-btn {
  margin-left: 10px;
  padding: 4px 8px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.users-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 12px 20px;
  text-align: left;
  border-bottom: 2px solid #ddd;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.inactive {
  background-color: #ffebee;
  color: #c62828;
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center; /* Đảm bảo các nút nằm đúng hàng */
  justify-content: center; /* Căn giữa các nút trong cột */
  /* justify-content: flex-start; Đảm bảo các nút nằm cùng một hàng */
}

.edit-btn, .toggle-btn, .delete-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 20px;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
}

.toggle-btn {
  background-color: #FF9800;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn, .save-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
}
.user-info b{
  color:#4CAF50;
  
}
.user-info-row {
  display: flex;
  align-items: center;
  gap: 8px; /* khoảng cách giữa ảnh và chữ */
}

.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile-picture-change{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-picture-change img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style> 