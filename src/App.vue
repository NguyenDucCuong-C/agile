<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="logo">BanQuanAo</router-link>
        <div class="nav-links">
          <!-- Menu cho Admin -->
          <template v-if="isAdmin">
            <router-link to="/admin">Quản lý đơn hàng</router-link>
            <router-link to="/admin/products">Quản lý sản phẩm</router-link>
            <div class="user-menu">
              <span>{{ currentUser.name }}</span>
              <button @click="handleLogout" class="btn btn-link">Đăng xuất</button>
            </div>
          </template>

          <!-- Menu cho User thông thường -->
          <template v-else>
            <router-link to="/">Trang chủ</router-link>
            <router-link to="/products">Sản phẩm</router-link>
            <router-link to="/cart" class="cart-link">
              Giỏ hàng
              <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
            </router-link>
            <template v-if="isAuthenticated">
              <router-link to="/orders">Đơn hàng</router-link>
              <div class="user-menu">
                <span>{{ currentUser.name }}</span>
                <button @click="handleLogout" class="btn btn-link">Đăng xuất</button>
              </div>
            </template>
            <template v-else>
              <router-link to="/login">Đăng nhập</router-link>
              <router-link to="/register">Đăng ký</router-link>
            </template>
          </template>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-view></router-view>
    </main>
    <Toast 
      v-if="toast.show"
      :message="toast.message"
      :type="toast.type"
      @close="hideToast"
    />
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Shop Quần Áo. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Toast from './components/Toast.vue'

export default {
  name: 'App',
  components: {
    Toast
  },
  computed: {
    cartItemCount() {
      return this.$store.getters.cartItemCount
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    currentUser() {
      return this.$store.getters.currentUser
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    toast() {
      return this.$store.state.toast
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    hideToast() {
      this.$store.commit('hideToast')
    }
  },
  created() {
    this.$store.dispatch('checkAuth')
  }
}
</script>

<style>
@import './assets/styles/main.css';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: white;
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
}

.logo:hover {
  color: var(--secondary-color);
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-links a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  position: relative;
}

.nav-links a:hover {
  color: var(--secondary-color);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--secondary-color);
  transition: var(--transition);
}

.nav-links a:hover::after {
  width: 100%;
}

.cart-link {
  position: relative;
  text-decoration: none;
  color: inherit;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e44d26;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 50%;
  min-width: 18px;
  text-align: center;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;
}

.user-name {
  color: var(--primary-color);
  font-weight: 500;
}

.footer {
  background-color: var(--primary-color);
  color: white;
  padding: 2rem 0;
  margin-top: auto;
}

.footer .container {
  text-align: center;
}

@media (max-width: 768px) {
  .navbar .container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .user-menu {
    flex-direction: column;
    margin-left: 0;
  }
}
</style> 