<template>
  <div class="products">
    <div class="container">
      <!-- Categories filter -->
      <div class="categories-filter">
        <button 
          class="category-btn"
          :class="{ active: selectedCategory === '' }"
          @click="selectCategory('')"
        >
          Tất cả sản phẩm
        </button>
        <button 
          v-for="category in categories" 
          :key="category"
          class="category-btn"
          :class="{ active: selectedCategory === category }"
          @click="selectCategory(category)"
        >
          {{ category }}
        </button>
      </div>

      <!-- Products grid -->
      <div class="products-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <router-link :to="'/products/' + product.id">
            <img :src="product.image" :alt="product.name">
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="price">{{ formatPrice(product.price) }}đ</p>
              <p class="category">{{ product.category }}</p>
              <p class="size">Size: {{ product.size }}</p>
            </div>
          </router-link>
          <button @click="addToCart(product)" class="add-to-cart">
            Thêm vào giỏ
          </button>
        </div>
      </div>

      <!-- No products message -->
      <div v-if="filteredProducts.length === 0" class="no-products">
        <h3>Không tìm thấy sản phẩm nào phù hợp</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      selectedCategory: '',
      searchQuery: '',
      newProduct: {
        name: '',
        price: '',
        description: '',
        image: '',
        category: '',
        size: 'M'
      }
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    },
    products() {
      return this.$store.state.products
    },
    filteredProducts() {
      let filtered = this.products;
      
      // Lọc theo danh mục nếu có
      if (this.selectedCategory) {
        filtered = filtered.filter(product => 
          product.category.toLowerCase() === this.selectedCategory.toLowerCase()
        );
      }
      
      // Lọc theo từ khóa tìm kiếm nếu có
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
        );
      }
      
      return filtered;
    }
  },
  created() {
    // Lấy category và search query từ URL khi component được tạo
    const { category, search } = this.$route.query;
    if (category) {
      this.selectedCategory = category;
    }
    if (search) {
      this.searchQuery = search;
    }
  },
  watch: {
    // Theo dõi thay đổi của route để cập nhật category và search
    '$route.query': {
      handler(newQuery) {
        this.selectedCategory = newQuery.category || '';
        this.searchQuery = newQuery.search || '';
      },
      immediate: true
    }
  },
  methods: {
    addToCart(product) {
      this.$store.commit('addToCart', product);
      this.$store.commit('showToast', {
        message: 'Đã thêm sản phẩm vào giỏ hàng',
        type: 'success'
      });
    },
    selectCategory(category) {
      this.selectedCategory = category;
      // Cập nhật URL khi chọn category
      this.$router.push({
        path: '/products',
        query: {
          ...(category && { category }),
          ...(this.searchQuery && { search: this.searchQuery })
        }
      });
    },
    formatPrice(price) {
      return price.toLocaleString('vi-VN');
    }
  }
}
</script>

<style scoped>
.products {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Add styles for router links */
a {
  text-decoration: none;
  color: inherit;
}

.product-card a {
  display: block;
  color: inherit;
  text-decoration: none;
}

.categories-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.category-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.category-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
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
  font-size: 1.1rem;
  color: #333;
}

.price {
  color: var(--primary-color);
  font-weight: bold;
  margin: 0.5rem 0;
}

.category {
  color: #666;
  font-size: 0.9rem;
}

.size {
  color: #666;
  font-size: 0.9rem;
}

.add-to-cart {
  width: 100%;
  padding: 0.8rem;
  background: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-to-cart:hover {
  background: var(--secondary-color);
}

.no-products {
  text-align: center;
  padding: 2rem;
  color: #666;
}

@media (max-width: 768px) {
  .categories-filter {
    justify-content: center;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style> 