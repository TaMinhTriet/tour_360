<template>
    <form class="d-flex" id="form-search" @submit.prevent="submittimkiem()">
       <input class="form-control me-2 search" type="search" placeholder="Tìm sản phẩm" v-model="this.tenhh" aria-label="Search" >
       <button class="btn btn-ligth icon-search" type="submit"><i class="fa fa-search"></i></button>
     </form>
</template>
<script>
export default {
   data() {
     return {
       tenhh: ''
     };
   },
   methods: {
      submittimkiem(){
             if(this.tenhh=='' || this.tenhh==null){
                    alert("Bạn chưa nhập vào tên sản phẩm muốn tìm");
             }
             else{
             this.$router.push({ name: 'SanPhamTimKiem',
               query: {tenhh: this.tenhh} });
             }
      }
   }
}
</script>
<style scoped>
      @import "@/assets/style.css"; 

</style>