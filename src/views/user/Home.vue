<template>
  <div class="home">
    <div class="container">
      <!-- Hero Section with Carousel -->
      <div class="hero-carousel">
        <div class="carousel-container">
          <div class="carousel-slide">
            <div class="hero hero-1">
              <router-link to="/products" class="cta-button">
                Xem tất cả sản phẩm
              </router-link>
            </div>
            <div class="hero hero-2">
            </div>
            <div class="hero hero-3">
              
            </div>
            <div class="hero hero-4">
              
            </div>
          </div>
        </div>
      </div>

    <!-- Benefits Section -->
    <div class="benefits">
      <div class="container">
        <div class="benefits-grid">
          <div class="benefit-item">
            <div class="benefit-icon">
              <img src="https://img.icons8.com/ios/50/free-shipping.png" alt="free-shipping"/>
            </div>
            <div class="benefit-content">
              <h4>Miễn phí vận chuyển</h4>
              <p>Đơn hàng từ 800k</p>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <img src="https://img.icons8.com/ios/50/gift--v1.png" alt="gift"/>
            </div>
            <div class="benefit-content">
              <h4>Ưu đãi hấp dẫn</h4>
              <p>Nhiều khuyến mãi</p>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <img src="https://img.icons8.com/ios/50/medal--v1.png" alt="medal"/>
            </div>
            <div class="benefit-content">
              <h4>100% chính hãng</h4>
              <p>Bảo đảm chất lượng</p>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <img src="https://img.icons8.com/ios/50/phone--v1.png" alt="phone"/>
            </div>
            <div class="benefit-content">
              <h4>Hotline: 0906 773 723</h4>
              <p>Gọi ngay để mua hàng nhanh hơn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
          <!-- Categories Section -->
      <div class="categories">
        <h2>Danh mục sản phẩm</h2>
        <div class="categories-grid">
          <router-link 
            v-for="category in categories" 
            :key="category.id"
            :to="{
              path: '/products',
              query: { category: category.name }
            }"
            class="category-card"
          >
            <div class="category-icon">
              <img :src="category.icon" :alt="category.name">
            </div>
            <h3>{{ category.name }}</h3>
          </router-link>
        </div>
      </div>
      <!-- Featured Products Section -->
      <div class="featured-products">
        <h2>Sản phẩm nổi bật</h2>
        <div class="products-grid">
          <div v-for="product in featuredProducts" :key="product.id" class="product-card">
            <img :src="product.image" :alt="product.name">
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="price">{{ formatPrice(product.price) }}đ</p>
              <p class="category">{{ product.category }}</p>
              <p class="size">Size: {{ product.size }}</p>
            </div>
            <div class="product-actions">
              <router-link :to="'/products/' + product.id" class="view-product">
                Xem sản phẩm
              </router-link>
              <button @click="addToCart(product)" class="add-to-cart">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Section -->
      <!-- <div class="categories">
        <h2>Danh mục sản phẩm</h2>
        <div class="categories-grid">
          <router-link 
            v-for="category in categories" 
            :key="category.id" 
            :to="'/products?category=' + category.name"
            class="category-card"
          >
            <h3>{{ category.name }}</h3>
          </router-link>
        </div>
      </div> -->
    </div>
    <!-- Footer Section -->
    <footer class="footer">
      <div class="container">
        <div class="footer-top">
          <div class="brand-section">
            <h2 class="brand-name">FASHION SHOP</h2>
            <p class="brand-description">Định nghĩa phong cách thời trang của riêng bạn</p>
          </div>
        </div>

        <div class="footer-content">
          <!-- About Column -->
          <div class="footer-column">
            <h3>Về chúng tôi</h3>
            <p>Chúng tôi tự hào mang đến những bộ sưu tập thời trang cao cấp, kết hợp giữa xu hướng hiện đại và phong cách timeless.</p>
            <div class="social-links">
              <a href="#" class="social-link">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fa-brands fa-tiktok"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links Column -->
          <div class="footer-column">
            <h3>Khám phá</h3>
            <ul class="footer-links">
              <li><router-link to="/products">Bộ sưu tập mới</router-link></li>
              <li><router-link to="/about">Câu chuyện thương hiệu</router-link></li>
              <li><router-link to="/blog">Blog phong cách</router-link></li>
              <li><router-link to="/size-guide">Hướng dẫn chọn size</router-link></li>
              <li><router-link to="/care-guide">Hướng dẫn bảo quản</router-link></li>
            </ul>
          </div>


          <!-- Newsletter Column -->
          <div class="footer-column">
            <h3>Đăng ký nhận tin</h3>
            <p>Là người đầu tiên nhận thông tin về BST mới & ưu đãi đặc biệt</p>
            <form class="newsletter-form">
              <div class="input-group">
                <input type="email" placeholder="Email của bạn" required>
                <button type="submit" class="submit-btn">
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="payment-methods">
            <span class="payment-label">Phương thức thanh toán</span>
            <div class="payment-icons">
              <img src="https://img.icons8.com/color/48/000000/visa.png" alt="visa">
              <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="mastercard">
              <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="paypal">
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      categories: [
        { id: 1, name: 'Áo thun' },
        { id: 2, name: 'Áo sơ mi' },
        { id: 3, name: 'Áo khoác' },
        { id: 4, name: 'Quần jean' },
        { id: 5, name: 'Quần tây' },
        { id: 6, name: 'Quần short' },
        { id: 7, name: 'Váy' },
        { id: 8, name: 'Đầm' },
        { id: 9, name: 'Phụ kiện' }
      ],
      searchQuery: '',
      searchResults: []
    }
  },
  computed: {
    featuredProducts() {
      return this.$store.state.products.filter(product => product.featured)
    },
    filteredProducts() {
      if (!this.searchQuery) return [];
      const query = this.searchQuery.toLowerCase();
      return this.$store.state.products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      ).slice(0, 5);
    }
  },
  methods: {
    handleSearch() {
      this.searchResults = this.filteredProducts;
    },
    clearSearch() {
      this.searchQuery = '';
      this.searchResults = [];
    },
    formatPrice(price) {
      return price.toLocaleString('vi-VN');
    },
    addToCart(product) {
      this.$store.commit('addToCart', product);
      this.$store.commit('showToast', {
        message: 'Đã thêm sản phẩm vào giỏ hàng',
        type: 'success'
      });
      // Chuyển hướng đến trang giỏ hàng
      this.$router.push('/cart');
    }
  }
}
</script>

<style scoped>
.home {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
/* Benefits Styles */
.benefits {
  padding: 2rem 0;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0 1rem;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.benefit-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFF5E5;
  border-radius: 50%;
  padding: 12px;
}

.benefit-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.8;
}

.benefit-item:hover .benefit-icon {
  background-color: #FFE4B8;
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

.benefit-item:hover .benefit-icon img {
  opacity: 1;
}

.benefit-content {
  text-align: center;
}

.benefit-content h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: #333;
  font-weight: 600;
}

.benefit-content p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

/* Categories Styles */
.categories {
  margin: 3rem 0;
}

.categories h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.8rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.category-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

.category-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.category-card h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
  text-align: center;
}
.hero-carousel {
  position: relative;
  height: 450px;
  margin-bottom: 3rem;
  border-radius: 8px;
  overflow: hidden;
}

.carousel-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-slide {
  display: flex;
  width: 400%;
  height: 100%;
  animation: slideShow 20s infinite;
}

.hero {
  position: relative;
  width: 25%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-1 {
  background-image: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop');
}

.hero-2 {
  background-image: url('https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop');
}

.hero-3 {
  background-image: url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop');
}

.hero-4 {
  background-image: url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop');
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

@keyframes slideShow {
  0%, 20% {
    transform: translateX(0);
  }
  25%, 45% {
    transform: translateX(-25%);
  }
  50%, 70% {
    transform: translateX(-50%);
  }
  75%, 95% {
    transform: translateX(-75%);
  }
  100% {
    transform: translateX(0);
  }
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  letter-spacing: 0.5px;
}

.cta-button:hover {
  background-color: rgba(255, 255, 255, 0.9);
  color: #1e3c72;
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  border-color: transparent;
}

.featured-products {
  margin-bottom: 3rem;
}

.featured-products h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 2rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: var(--transition);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-card a {
  text-decoration: none;
  color: inherit;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

.product-info h3 {
  margin: 0;
  color: var(--primary-color);
  font-size: 1.1rem;
}

.price {
  color: var(--accent-color);
  font-weight: 500;
  margin: 0.5rem 0;
}

.category {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.size {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.categories {
  margin-bottom: 3rem;
}

.categories h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 2rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.category-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: var(--primary-color);
}

.category-card h3 {
  margin: 0;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.category-card:hover h3 {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .hero-carousel {
    height: 300px;
  }
}

/* Footer Styles */
.footer {
  background-color: var(--primary-color);
  color: #fff;
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}

.footer-top {
  text-align: center;
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.brand-name {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--secondary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-description {
  color: var(--light-gray);
  font-size: 1.1rem;
  font-style: italic;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;
}

.footer-column h3 {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  font-weight: 600;
}

.footer-column h3::after {
  display: none;
}

.footer-column p {
  color: var(--light-gray);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1.2rem;
}

.social-link {
  color: #fff;
  font-size: 1.2rem;
  transition: var(--transition);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-link:hover {
  background: var(--secondary-color);
  transform: translateY(-3px);
  color: #fff;
}

.social-link i {
  line-height: 1;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 1rem;
}

.footer-links a {
  color: var(--light-gray);
  text-decoration: none;
  transition: var(--transition);
  display: block;
}

.footer-links a:hover {
  color: var(--accent-color);
  transform: translateX(5px);
}

.newsletter-form {
  margin-top: 1.5rem;
}

.input-group {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
}

.input-group input {
  flex: 1;
  padding: 1rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 0.95rem;
}

.input-group input::placeholder {
  color: var(--light-gray);
}

.submit-btn {
  padding: 0.8rem 1.5rem;
  background: var(--accent-color);
  border: none;
  color: #fff;
  cursor: pointer;
  transition: var(--transition);
  font-weight: 500;
  min-width: 100px;
}

.submit-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-methods {
  text-align: center;
}

.payment-label {
  color: var(--light-gray);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: block;
}

.payment-icons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.payment-icons img {
  height: 30px;
  width: auto;
  opacity: 0.7;
  transition: var(--transition);
}

.payment-icons img:hover {
  opacity: 1;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    text-align: center;
  }

  .payment-icons {
    justify-content: center;
  }
}

/* Search Styles */
.search-container {
  position: relative;
  max-width: 600px;
  margin: 2rem auto;
  z-index: 100;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.search-bar input {
  flex: 1;
  padding: 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--text-color);
}

.search-bar input::placeholder {
  color: #999;
}

.search-button {
  padding: 1rem 1.5rem;
  background: var(--primary-color);
  border: none;
  color: white;
  cursor: pointer;
  transition: var(--transition);
}

.search-button:hover {
  background: var(--secondary-color);
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  text-decoration: none;
  color: var(--text-color);
  transition: var(--transition);
  border-bottom: 1px solid var(--border-color);
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background: var(--light-gray);
}

.search-result-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
}

.product-info h4 {
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-color);
}

.product-info .price {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: var(--accent-color);
  font-weight: 500;
}

.no-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  text-align: center;
  color: #666;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .search-container {
    margin: 1rem;
  }
  
  .search-bar input {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
  
  .search-button {
    padding: 0.8rem 1.2rem;
  }
}

.product-actions {
  display: flex;
  gap: 0.3rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-top: 1px solid #eee;
}

.view-product,
.add-to-cart {
  flex: 1;
  padding: 0.4rem 0.6rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.75rem;
  text-align: center;
  transition: all 0.2s ease;
  text-decoration: none;
  font-weight: 500;
}

.view-product {
  background: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.view-product:hover {
  background: var(--primary-color);
  color: white;
}

.add-to-cart {
  background: var(--primary-color);
  color: white;
}

.add-to-cart:hover {
  background: var(--secondary-color);
}
</style> 
