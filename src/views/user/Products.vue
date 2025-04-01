<template>
  <div class="products">
    <div class="container">
      <div class="categories">
        <button 
          class="category-btn"
          :class="{ active: selectedCategory === '' }"
          @click="selectedCategory = ''"
        >
          Tất cả
        </button>
        <button 
          v-for="category in categories" 
          :key="category.id"
          class="category-btn"
          :class="{ active: selectedCategory === category.name }"
          @click="selectedCategory = category.name"
        >
          {{ category.name }}
        </button>
      </div>

      <div class="products-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <router-link :to="'/products/' + product.id">
            <img :src="product.image" :alt="product.name">
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="price">{{ product.price }}đ</p>
              <p class="category">{{ product.category }}</p>
              <p class="size">Size: {{ product.size }}</p>
            </div>
          </router-link>
          <button @click="addToCart(product)" class="add-to-cart">
            Thêm vào giỏ
          </button>
        </div>
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
      newProduct: {
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'ao',
        size: 'M'  // Giá trị mặc định là M
      }
    }
  },
  computed: {
    products() {
      return this.$store.state.products
    },
    filteredProducts() {
      if (!this.selectedCategory) return this.products
      return this.products.filter(product => product.category === this.selectedCategory)
    }
  },
  methods: {
    addToCart(product) {
      this.$store.commit('addToCart', product)
    }
  }
}
</script>

<style scoped>
.products {
  padding: 2rem 0;
  background-color: var(--light-gray);
  min-height: calc(100vh - 60px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.category-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: white;
  color: var(--text-color);
  cursor: pointer;
  transition: var(--transition);
}

.category-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.category-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
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
}

.size {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.add-to-cart {
  width: 100%;
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
}

.add-to-cart:hover {
  background: var(--secondary-color);
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  .categories {
    justify-content: center;
  }
}
</style> 