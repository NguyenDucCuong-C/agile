<template>
  <div class="admin-products">
    <div class="container">
      <h1>Quản lý sản phẩm</h1>
      
      <!-- Form thêm sản phẩm -->
      <div class="add-product-form">
        <h2>Thêm sản phẩm mới</h2>
        <form @submit.prevent="handleAddProduct">
          <div class="form-group">
            <label>Tên sản phẩm</label>
            <input 
              v-model="newProduct.name" 
              type="text" 
              required
              placeholder="Nhập tên sản phẩm"
            >
          </div>
          
          <div class="form-group">
            <label>Giá</label>
            <input 
              v-model.number="newProduct.price" 
              type="number" 
              required
              min="0"
              placeholder="Nhập giá sản phẩm"
            >
          </div>
          
          <div class="form-group">
            <label>Mô tả</label>
            <textarea 
              v-model="newProduct.description" 
              required
              placeholder="Nhập mô tả sản phẩm"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label>Hình ảnh URL</label>
            <input 
              v-model="newProduct.image" 
              type="url" 
              required
              placeholder="Nhập URL hình ảnh"
            >
          </div>
          
          <div class="form-group">
            <label>Danh mục</label>
            <select v-model="newProduct.category" required>
              <option value="">Chọn danh mục</option>
              <option v-for="category in categories" 
                      :key="category.id" 
                      :value="category.name">
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Kích thước</label>
            <select v-model="newProduct.size" required>
              <option value="">Chọn kích thước</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          
          <button type="submit" class="btn-add">Thêm sản phẩm</button>
        </form>
      </div>

      <!-- Danh sách sản phẩm -->
      <div class="products-list">
        <div class="products-header">
          <h2>Danh sách sản phẩm</h2>
          <div class="filter-section">
            <label>Lọc theo danh mục:</label>
            <select v-model="selectedCategory" class="filter-select">
              <option value="">Tất cả</option>
              <option v-for="category in categories" 
                      :key="category.id" 
                      :value="category.name">
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="products-grid">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card">
            <img :src="product.image" :alt="product.name">
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="price">{{ product.price }}đ</p>
              <p class="category">{{ product.category }}</p>
              <p class="size">Size: {{ product.size }}</p>
            </div>
            <div class="product-actions">
              <button @click="deleteProduct(product.id)" class="btn-delete">
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminProducts',
  data() {
    return {
      newProduct: {
        name: '',
        price: 0,
        description: '',
        image: '',
        category: '',
        size: ''
      },
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
      ]
    }
  },
  computed: {
    products() {
      return this.$store.state.products
    },
    filteredProducts() {
      if (!this.selectedCategory) {
        return this.products
      }
      return this.products.filter(product => product.category === this.selectedCategory)
    }
  },
  methods: {
    handleAddProduct() {
      this.$store.dispatch('addProduct', {
        ...this.newProduct,
        id: Date.now() // Tạo ID tạm thời
      })
      
      // Reset form
      this.newProduct = {
        name: '',
        price: 0,
        description: '',
        image: '',
        category: '',
        size: ''
      }

      // Hiển thị thông báo
      this.$store.commit('showToast', {
        message: 'Thêm sản phẩm thành công',
        type: 'success'
      })
    },
    deleteProduct(productId) {
      if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        this.$store.dispatch('deleteProduct', productId)
        this.$store.commit('showToast', {
          message: 'Xóa sản phẩm thành công',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped>
.admin-products {
  padding: 2rem 0;
  background-color: var(--light-gray);
  min-height: calc(100vh - 60px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 2rem;
}

h2 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.add-product-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
}

input, textarea, select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
}

select {
  background-color: white;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: var(--primary-color);
}

textarea {
  height: 100px;
  resize: vertical;
}

.btn-add {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: var(--transition);
}

.btn-add:hover {
  background-color: var(--secondary-color);
}

.products-list {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
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

.product-actions {
  padding: 1rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
}

.btn-delete {
  background-color: var(--danger-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition);
}

.btn-delete:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-section label {
  margin-bottom: 0;
}

.filter-select {
  width: 200px;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 0.9rem;
}
</style> 