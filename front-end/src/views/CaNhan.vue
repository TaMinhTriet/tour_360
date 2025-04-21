<template>
  <div>
    <main>
      <div class="row mb-5 mt-9 thongtin">
        <div class="col-md-6 mt-3">
          <div class="card shadow mb-5">
            <div class="card-body text-center">
              <div class="d-flex justify-content-center">
                <div class="profile-picture">
                  <img src="https://res.cloudinary.com/dku2deoem/image/upload/v1745221277/avatar2_hds1d7.png" alt="Avatar" />
                </div>
              </div>
              <div class="header text-success mt-3">
                <h3><b>Thông tin người dùng</b></h3>
                <h6 class="text-primary hienchinh" @click="formhienthi">
                  <i class="fas fa-edit"></i> Thay đổi thông tin
                </h6>
                <hr>
              </div>
              <div class="info mt-4" v-if="user">
                <b>Tên người dùng:</b>
                <div class="name-display">
                  <span>{{ user.username || user.userName || user.name || 'Chưa có thông tin' }}</span>
                </div>
                <!-- <span>{{ user && (user.username || user.userName || user.name) || 'Chưa có thông tin' }}</span> -->
              </div>
              <div class="info mt-4" v-if="user">
                <b>Email:</b>
                <div class="name-display">
                  <span>{{ user && (user.email || user.mail) || 'Chưa có thông tin' }}</span>
                </div>
               
              </div>

              <div class="info mt-4">
                <b>Mật khẩu:</b>
                <div class="mt-2">
                  <button class="btn btn-primary btn-sm" @click="showPasswordForm = true" v-if="!showPasswordForm">
                    <!-- <i class="fas fa-key"></i>  -->
                    Đổi mật khẩu
                  </button>

                  <div v-if="showPasswordForm" class="password-form mt-2">
                    <div class="form-group">
                      <label for="newPassword">Mật khẩu mới:</label>
                      <input type="password" class="form-control" id="newPassword" v-model="newPassword">
                    </div>
                    <div class="form-group mt-2">
                      <label for="confirmPassword">Xác nhận mật khẩu mới:</label>
                      <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
                    </div>
                    <div class="mt-3">
                      <button class="btn btn-success btn-sm" @click="updatePassword">
                        <i class="fas fa-save"></i> Lưu mật khẩu mới
                      </button>
                      <button class="btn btn-secondary btn-sm ms-2" @click="cancelPasswordChange">
                        <i class="fas fa-times"></i> Hủy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>

        <div class="col-md-6" v-if="this.form">
          <div class="card shadow mb-3">
            <div class="card-body">
              <h4 class="mt-3 text-center text-blue"><i class="fas fa-edit"></i> Cập nhật thông tin</h4>
              <FormCapNhatThongTinUser
                :nguoidung="user"
                :mode="mode"
                @submit:nguoidung="updatenguoidung"
                @delete:nguoidung="deletenguoidung"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
  
  <script>
  // import AppHeader from "@/components/AppHeader.vue";
  // import AppFooter from "@/components/AppFooter.vue";
  
  import FormCapNhatThongTinUser from "@/components/FormCapNhatThongTinUser.vue";
  import UserService from "@/services/user.service";
  import store from '@/store';  // Thêm import store
  export default {
    components: {
      // AppHeader,
      // AppFooter,
      FormCapNhatThongTinUser
    },
    props: ["session_user"],
    data() {
      return {
        // user: null,
        user: {},
        form: false,
        mode: 'edit',
        showPassword: false,
        showPasswordForm: false,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
    },
        watch: {
            // Giám sát các thay đổi của biến searchText.
            // Bỏ chọn phần tử đang được chọn trong danh sách.
            searchText() {
              this.activeIndex = -1;
            },
        },
        methods: {
          async getusername() {
            try {
              const token = localStorage.getItem('token');
              if (!token) {
                this.$router.push("/dang-nhap");
                return;
              }

              // Luôn lấy thông tin user mới nhất từ API
              console.log('Fetching user from API...');
              try {
                // Sử dụng UserService thay vì axios trực tiếp
                const response = await UserService.getCurrentUser();
                
                console.log('Raw API response:', response);
                
                if (response && response.data) {
                  // Kiểm tra cấu trúc dữ liệu
                  const userData = response.data;
                  console.log('User data from API:', userData);
                  
                  // Kiểm tra nếu dữ liệu nằm trong data.data
                  const actualUserData = userData.data || userData;
                  console.log('Actual user data:', actualUserData);
                  
                  // Đảm bảo dữ liệu có đúng format
                  if (typeof actualUserData === 'object') {
                    this.user = {
                      _id: actualUserData._id || actualUserData.id,
                      username: actualUserData.username || actualUserData.userName || actualUserData.name || '',
                      email: actualUserData.email || actualUserData.mail || '',
                    };
                    console.log('Processed user data:', this.user);
                    store.commit('setSessionUser', this.user);
                  } else {
                    console.error('Invalid user data format:', actualUserData);
                    throw new Error('Invalid user data format');
                  }
                } else {
                  console.error('Invalid API response format:', response);
                  throw new Error('Invalid API response');
                }
              } catch (error) {
                console.error('API error:', error);
                // Fallback: sử dụng dữ liệu từ store nếu có
                const userFromStore = store.state.session_user;
                if (userFromStore && typeof userFromStore === 'object') {
                  console.log('Using user from store as fallback:', userFromStore);
                  this.user = {
                    _id: userFromStore._id || userFromStore.id,
                    username: userFromStore.username || userFromStore.userName || userFromStore.name || '',
                    email: userFromStore.email || userFromStore.mail || '',
                  };
                } else {
                  this.$router.push("/dang-nhap");
                }
              }
            } catch (e) {
              console.error('Error fetching user:', e);
              this.$router.push("/dang-nhap");
            }
          },
          async updatenguoidung(data) {
            try {
              console.log("Dữ liệu cập nhật:", data);
              console.log("ID người dùng:", data._id);

              // Kiểm tra nếu không có ID
              if (!data._id) {
                alert('Không thể cập nhật thông tin: Thiếu ID người dùng');
                return;
              }

              // Lấy token từ localStorage hoặc Vuex
              const token = localStorage.getItem('token'); 

              // Kiểm tra nếu không có token
              if (!token) {
                alert('Bạn cần đăng nhập trước khi cập nhật!');
                return;
              }

              // Gọi API cập nhật
              const resu = await UserService.update(data._id, data);

              // Kiểm tra phản hồi từ backend
              if (resu && resu.message === 'User updated successfully') {
                this.message = "Cập nhật thông tin thành công";
                alert(this.message);
                this.getusername();  // Cập nhật thông tin hiển thị
                this.formhienthi();  // Ẩn form sau khi cập nhật
                window.location.reload(); // Làm mới trang
              }
            } catch (error) {
              if (error.response) {
                if (error.response.status === 403) {
                  alert('Số điện thoại đã được sử dụng ở một tài khoản khác');
                } else {
                  alert(`Lỗi: ${error.response.data.message || 'Thử lại sau'}`);
                }
              } else {
                alert('Lỗi kết nối, vui lòng thử lại!');
              }
              console.error(error);
            }
          },
          async deletenguoidung() {  // ham cho phuong thuc delete
            if (confirm("Bạn muốn xóa tài khoản này?")) {
              try {
                  console.log(this.user._id);
                  const re =  await UserService.delete(this.user._id);
                  console.log('Đã gọi xoá khách hàng');
                  const resu =  await dathangService.deleteALLIdKhachhang(this.user._id);
                  const document =  await UserService.logout();
                  this.$store.commit('setSessionUser', document.token);
                  this.$router.push({ path: "/" });
              } catch (error) {
                  console.log(error);
              }
            }
          },
        formhienthi () {
          this.form = !this.form;
          if(this.form==false){
            this.getusername();
          }
        },
        async updatePassword() {
          try {
            // Kiểm tra đăng nhập
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Bạn cần đăng nhập trước khi thay đổi mật khẩu!');
                this.$router.push("/dang-nhap");
                return;
            }

            // Kiểm tra mật khẩu mới
            if (!this.newPassword || !this.confirmPassword) {
                alert('Vui lòng nhập đầy đủ thông tin mật khẩu mới');
                return;
            }

            // Kiểm tra mật khẩu khớp nhau
            if (this.newPassword !== this.confirmPassword) {
                alert('Mật khẩu mới và xác nhận mật khẩu không khớp');
                return;
            }

            // Kiểm tra độ dài mật khẩu
            if (this.newPassword.length < 6) {
                alert('Mật khẩu phải có ít nhất 6 ký tự');
                return;
            }

            // Kiểm tra ID người dùng
            if (!this.user) {
                console.error("User object is null or undefined");
                alert('Không tìm thấy thông tin người dùng, vui lòng đăng nhập lại');
                this.$router.push("/dang-nhap");
                return;
            }

            // Kiểm tra ID người dùng
            const userId = this.user._id || this.user.id;
            if (!userId) {
                console.error("User ID is missing:", this.user);
                alert('Không tìm thấy ID người dùng, vui lòng đăng nhập lại');
                this.$router.push("/dang-nhap");
                return;
            }

            console.log("Dữ liệu cập nhật mật khẩu:", {
                userId: userId,
                newPassword: this.newPassword,
                confirmPassword: this.confirmPassword
            });

            // Gọi API cập nhật mật khẩu
            const resu = await UserService.updatePasswordWithoutVerification(this.newPassword);
            console.log("Kết quả cập nhật mật khẩu:", resu);

            // Kiểm tra phản hồi từ backend
            if (resu && (resu.message === 'Password updated successfully' || resu.success)) {
                this.message = "Cập nhật mật khẩu thành công";
                alert(this.message);
                this.showPasswordForm = false;
                this.getusername();  // Cập nhật thông tin hiển thị
                
                // Xóa các trường mật khẩu
                this.newPassword = '';
                this.confirmPassword = '';
            } else {
                alert('Cập nhật mật khẩu không thành công: ' + (resu?.message || 'Lỗi không xác định'));
            }
          } catch (error) {
            console.error("Lỗi khi cập nhật mật khẩu:", error);
            if (error.response) {
                console.error("Chi tiết lỗi:", error.response.data);
                const errorMessage = error.response.data.message || 'Lỗi không xác định';
                if (error.response.status === 403) {
                    alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
                    this.$router.push("/dang-nhap");
                } else if (error.response.status === 404) {
                    alert('Không tìm thấy thông tin người dùng, vui lòng đăng nhập lại');
                    this.$router.push("/dang-nhap");
                } else {
                    alert(`Lỗi: ${errorMessage}`);
                }
            } else if (error.request) {
                console.error("Không nhận được phản hồi từ server:", error.request);
                alert('Không thể kết nối đến máy chủ, vui lòng thử lại sau');
            } else {
                console.error("Lỗi khi gửi yêu cầu:", error.message);
                alert(error.message || 'Lỗi kết nối, vui lòng thử lại!');
            }
          }
        },
        cancelPasswordChange() {
          this.showPasswordForm = false;
        }
      },
      created() {
        console.log('Store khi component được tạo:', JSON.stringify(store.state.session_user, null, 2));
        this.getusername(); // gọi làm mới danh sách khi trang được tải
      },
    };
  </script>
<style scoped>
body {
  background-color: #f5f7fa;
}
.name-display {
  margin-top: 10px; /* Khoảng cách giữa tiêu đề và khung */
  border: 1px solid #ced4da; /* Đường viền khung */
  border-radius: 5px; /* Bo góc */
  background-color: #f8f9fa; /* Màu nền */
  padding: 10px; /* Khoảng cách bên trong */
  font-size: 1rem; /* Kích thước chữ */
  color: #495057; /* Màu chữ */
}
.card {
  width: 100%; 
  border-radius: 10px;
}

.shadow {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.profile-picture {
  width: 150px;
  height: 150px;
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

.upload-btn {
  margin-top: 10px;
}

.header {
  text-align: center;
}

.text-success {
  color: #28a745;
}

.text-primary {
  color: #007bff;
}
.text-blue {
  font-weight: bold; /* Làm chữ đậm */
  color: blue; /* Màu chữ xanh dương */
}
.hienchinh {
  cursor: pointer;
  transition: color 0.3s;
}

.hienchinh:hover {
  color: #0056b3;
}

.info {
  margin-bottom: 15px;
}
.info b {
  text-align: left; /* Căn lề trái cho chữ "Email" */
  display: block; /* Đảm bảo chữ "Email" nằm trên một dòng riêng */
}
.btn {
  border-radius: 5px;
}

.btn-primary {
  background-color: #007bff;
}

.btn-success {
  background-color: #28a745;
}

.btn-secondary {
  background-color: #6c757d;
}

.password-form {
  margin-top: 1rem;
}
.thongtin {
  margin-top: 5rem; /* Giảm giá trị này để nâng lên trên */
  margin-left: 10rem;
}
</style>