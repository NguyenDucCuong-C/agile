<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <div class="nav-left">
          <router-link to="/" class="logo">BlueShop</router-link>
        </div>
        <div class="nav-right">
          <!-- Search Bar -->
          <div class="search-wrapper" :class="{ 'is-expanded': isSearchExpanded }">
            <div class="search-container">
              <input 
                type="text" 
                v-model="searchQuery" 
                @input="handleSearch"
                @focus="showResults = true"
                @blur="handleBlur"
                @keyup.enter="handleSearchSubmit"
                placeholder="Tìm kiếm sản phẩm..."
                ref="searchInput"
              >
              <button class="search-button" @click="handleSearchClick">
                <i class="fas fa-search"></i>
              </button>
            </div>
            <!-- Search Results Dropdown -->
            <div class="search-results" v-if="showResults && searchQuery && filteredProducts.length > 0">
              <div class="search-results-list">
                <router-link 
                  v-for="product in filteredProducts" 
                  :key="product.id"
                  :to="'/products/' + product.id"
                  class="search-result-item"
                  @click="clearSearch"
                >
                  <img :src="product.image" :alt="product.name">
                  <div class="result-info">
                    <h4>{{ product.name }}</h4>
                    <p class="price">{{ formatPrice(product.price) }}đ</p>
                    <span class="category">{{ product.category }}</span>
                  </div>
                </router-link>
              </div>
              <div class="view-all" @click="handleSearchSubmit">
                Xem tất cả kết quả
              </div>
            </div>
            <div class="no-results" v-else-if="showResults && searchQuery && filteredProducts.length === 0">
              Không tìm thấy sản phẩm phù hợp
            </div>
          </div>
          <div class="nav-links">
            <!-- Menu cho Admin -->
            <template v-if="isAdmin">
              <router-link to="/admin">Quản lý đơn hàng</router-link>
              <router-link to="/admin/products">Quản lý sản phẩm</router-link>
              <router-link to="/admin/accounts">Quản lý tài khoản</router-link>
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
                <i class="fas fa-shopping-cart"></i>
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
      </div>
    </nav>
    <main class="main-content">
      <router-view></router-view>
    </main>
    <Toast 
      v-if="toast.show"
      :message="toast.message"
      :type="toast.type"
      :id="toast.id"
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
  data() {
    return {
      searchQuery: '',
      showResults: false,
      searchTimeout: null,
      isSearchExpanded: false
    }
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
    },
    filteredProducts() {
      if (!this.searchQuery) return [];
      const query = this.searchQuery.toLowerCase().trim();
      return this.$store.state.products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      ).slice(0, 6); // Limit to 6 results
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    hideToast() {
      this.$store.commit('hideToast')
    },
    handleSearch() {
      // Debounce search
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.showResults = true;
      }, 300);
    },
    handleSearchClick() {
      if (this.isSearchExpanded && this.searchQuery) {
        this.handleSearchSubmit();
      } else {
        this.toggleSearch();
      }
    },
    handleSearchSubmit() {
      if (this.searchQuery) {
        this.$router.push({
          path: '/products',
          query: { search: this.searchQuery }
        });
        this.showResults = false;
      }
    },
    handleBlur() {
      // Delay hiding results to allow for link clicking
      setTimeout(() => {
        this.showResults = false;
        // Only collapse if empty and not clicking search button
        if (!this.searchQuery && !document.activeElement.classList.contains('search-button')) {
          this.isSearchExpanded = false;
        }
      }, 200);
    },
    clearSearch() {
      this.searchQuery = '';
      this.showResults = false;
    },
    formatPrice(price) {
      return price.toLocaleString('vi-VN');
    },
    toggleSearch() {
      this.isSearchExpanded = !this.isSearchExpanded;
      if (this.isSearchExpanded) {
        // Focus input when expanded
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
        });
      } else {
        // Clear search when collapsed
        this.clearSearch();
      }
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
  gap: 2rem;
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
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.cart-link:hover {
  background-color: #f5f5f5;
}

.cart-link i {
  font-size: 1.3rem;
  color: var(--text-color);
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e44d26;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 50%;
  min-width: 18px;
  text-align: center;
  font-weight: 600;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-wrapper {
  position: relative;
  width: 45px;
  transition: width 0.3s ease;
}

.search-wrapper.is-expanded {
  width: 300px;
}

.search-container {
  position: relative;
  width: 100%;
  height: 45px;
  background: #f5f5f5;
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.search-container input {
  position: absolute;
  left: 0;
  width: calc(100% - 45px);
  height: 100%;
  border: none;
  outline: none;
  padding: 0 15px;
  font-size: 14px;
  color: #333;
  background: transparent;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease;
}

.search-wrapper.is-expanded .search-container input {
  opacity: 1;
  transform: translateX(0);
}

.search-button {
  position: absolute;
  right: 0;
  width: 45px;
  height: 45px;
  border: none;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  z-index: 2;
}

.search-button:hover {
  background: var(--secondary-color);
}

.search-button i {
  font-size: 16px;
}

.search-results {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s ease;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background: #f8f9fa;
}

.search-result-item img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 10px;
}

.result-info h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.result-info .price {
  margin: 2px 0;
  font-size: 13px;
  color: var(--accent-color);
}

.result-info .category {
  font-size: 12px;
  color: #666;
}

.view-all {
  padding: 10px 15px;
  text-align: center;
  background: #f8f9fa;
  color: var(--primary-color);
  cursor: pointer;
  border-top: 1px solid #eee;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.view-all:hover {
  background: #e9ecef;
}

@media (max-width: 1024px) {
  .search-wrapper {
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .navbar .container {
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .nav-right {
    flex: 1;
    justify-content: flex-end;
  }

  .logo {
    flex-shrink: 0;
  }

  .search-wrapper.is-expanded {
    position: absolute;
    top: 100%;
    left: 1rem;
    right: 1rem;
    width: calc(100% - 2rem);
    z-index: 1000;
    margin-top: 0.5rem;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
    order: 2;
  }
}
</style> 