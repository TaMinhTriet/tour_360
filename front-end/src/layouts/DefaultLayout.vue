<template>
  <div class="layout">
    <AppHeader :session_user="session_user" />
    <main class="main-content">
      <slot></slot>
    </main>
    <AppFooter :session_user="session_user" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppFooter
  },
  props: {
    session_user: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: 72px; /* Height of the header */
  padding: 2rem 1rem;
}
</style> 