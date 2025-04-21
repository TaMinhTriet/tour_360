<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
  <main class="main-trangchu">
    
    <div class="container phancach">
        <div clas="pchr" >
            <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
        </div>
        <h2 class=" mb-2 text-dathang">Bắt đầu quản lý trang của bạn từ đây</h2>
        <div clas="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
        </div>
    </div>

  </main>
      <AppFooterAdmin/>
    </div>
  </template>
  
  <script>
  import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
  import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
  import { RouterLink } from "vue-router";

  export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin,
      RouterLink
    },
    props: ["session_admin"],
    data (){
        return {
            doanhthu: {
                tongdoanhthu: 0,
                tongdoanhthutrongngay: 0,
                tongdoanhthutrongthang: 0
            }
        }
    },
    methods: {
        async getDoanhThu() {
        try {
            const danhSachDatHang = await DatHangService.getAll();
            this.doanhthu.tongdoanhthu = 0;
            this.doanhthu.tongdoanhthutrongngay = 0;
            this.doanhthu.tongdoanhthutrongthang = 0;
            danhSachDatHang.forEach((dathang) => {
            if (dathang.tinhtrang !== 'Đã huỷ') {
                this.doanhthu.tongdoanhthu = this.doanhthu.tongdoanhthu + dathang.tongtien;
                const ngaydat = dathang.ngaydat;
                console.log(ngaydat);
                const dngaydatform = new Date(ngaydat);
                const ngayHienTai = new Date();
                if (dngaydatform.getMonth() === ngayHienTai.getMonth() &&
                        dngaydatform.getFullYear() === ngayHienTai.getFullYear() && dngaydatform.getDate()=== ngayHienTai.getDate()) {
                    this.doanhthu.tongdoanhthutrongngay  = this.doanhthu.tongdoanhthutrongngay  + dathang.tongtien;
                } 
                if (dngaydatform.getMonth() === ngayHienTai.getMonth() &&
                    dngaydatform.getFullYear() === ngayHienTai.getFullYear()
                    )
                    {
                        this.doanhthu.tongdoanhthutrongthang  = this.doanhthu.tongdoanhthutrongthang  + dathang.tongtien;
                    }
                
            }
            });
            } catch (e) {
                console.log('Lỗi ' + e);
            }
            }
            ,
        formattedGia(gia) {
            if (gia) {
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(gia);
            }
            return "0 đ";
        },
        convertStringToDate(dateString) {
         const [day, month, year] = dateString.split('/');
            // Tháng trong JavaScript đếm từ 0, nên giảm giá trị tháng đi 1
         return new Date(year, month - 1, day);
        },
        checkLogin() {
            const user = localStorage.getItem("user");
            if(!user) {
                this.$router.push({path: "/admin/dangnhap"});
            }
        }
    },
    mounted() {
        // this.getDoanhThu();
       this.checkLogin();
        //    this.$store.commit('setSessionAdmin', null);
        // this.$store.commit('setSessionAdmin', this.$store.state.session_admin);
    }
   
  };
  </script>
<style scoped>
.main-trangchu{
    margin-bottom: 24.5rem;
}
.fa-2x {
  font-size: 2em;
  color: #539590;
}
.tien h2{
    margin-bottom: 1rem;
}
</style>
  