<template>
  <div class="home">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero">
        <h1>Chào mừng đến với Shop Thời Trang</h1>
        <p>Khám phá bộ sưu tập mới nhất với những thiết kế độc đáo và chất lượng cao</p>
        <router-link to="/products" class="cta-button">
          Xem tất cả sản phẩm
        </router-link>
      </div>

      <!-- Featured Products Section -->
      <div class="featured-products">
        <h2>Sản phẩm nổi bật</h2>
        <div class="products-grid">
          <div v-for="product in featuredProducts" :key="product.id" class="product-card">
            <router-link :to="'/products/' + product.id">
              <img :src="product.image" :alt="product.name">
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p class="price">{{ product.price }}đ</p>
                <p class="category">{{ product.category }}</p>
                <p class="size">Size: {{ product.size }}</p>
              </div>
            </router-link>
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
      ]
    }
  },
  computed: {
    featuredProducts() {
      return this.$store.state.products.filter(product => product.featured)
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

.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  border-radius: 8px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #fff;
  color: #1e3c72;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
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
  transition: var(--transition);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--primary-color);
  color: white;
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 1rem;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style> 