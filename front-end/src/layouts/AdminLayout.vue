<template>
  <div class="admin-layout">
    <AppHeaderAdmin />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeaderAdmin from '@/components/AppHeaderAdmin.vue'

export default {
  name: 'AdminLayout',
  components: {
    AppHeaderAdmin
  }
}
</script> 