<template>
  <div id="app">
    <AppHeader v-if="!isAdminRoute" />
    <!-- <router-view :session_user="session_user" :session_admin="session_admin"></router-view>  -->
    <router-view :session_user="session_user"></router-view> 
    <AppFooter v-if="!isAdminRoute" />
  </div>
</template>

<script>
import store from '@/store';
import AppHeader from "@/components/AppHeader.vue";  // Import Header
import AppFooter from "@/components/AppFooter.vue";  // Import Footer
import { useRoute } from 'vue-router';

export default {
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    session_user() {
      return store.state.session_user; // Thay vì this.$store, 
    },
    isAdminRoute() {
      const route = this.$route.path;
      return route.startsWith('/admin');
    }
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app > * {
  flex: 1;
}

.content {
  flex: 1;
}

.page {
  max-width: 500px;
  margin: auto;
}
</style>
