<template>
  <header class="admin-header">
    <nav class="admin-nav">
      <div class="logo">
        <router-link to="/">
          <img src="https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/logo_xjkzpa.jpg " alt="Shop" width="80" height="80" class="logo-img" />
        </router-link>
      </div>
      <router-link to="/" class="home-button">
        <span>Trang chủ</span>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeaderAdmin'
};
</script>

<style scoped>
.admin-header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
 
}

.admin-nav {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

}

.home-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #24696a;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.home-button:hover {
  background-color: rgba(36, 105, 106, 0.1);
}

.home-button i {
  font-size: 1.1rem;
}
/* .logo{
  margin-bottom: 100px;
} */
.logo-img {
  height: 80px;
  width: auto;
  margin-bottom: 10x;
}


@media (max-width: 640px) {
  .admin-nav {
    padding: 0.75rem 1rem;
  }
}
</style> 