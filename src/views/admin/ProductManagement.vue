<template>
  <div class="product-management">
    <div class="container">
      <h1>Quản lý sản phẩm</h1>

      <!-- Form thêm sản phẩm -->
      <div class="add-product-form">
        <h2>Thêm sản phẩm mới</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Tên sản phẩm:</label>
            <input type="text" id="name" v-model="newProduct.name" required>
          </div>
          <div class="form-group">
            <label for="price">Giá:</label>
            <input type="number" id="price" v-model="newProduct.price" required>
          </div>
          <div class="form-group">
            <label for="description">Mô tả:</label>
            <textarea id="description" v-model="newProduct.description" required></textarea>
          </div>
          <div class="form-group">
            <label for="image">URL ảnh:</label>
            <input type="text" id="image" v-model="newProduct.image" required>
          </div>
          <div class="form-group">
            <label for="category">Danh mục:</label>
            <select id="category" v-model="newProduct.category" required>
              <option value="ao">Áo</option>
              <option value="quan">Quần</option>
            </select>
          </div>
          <div class="form-group">
            <label for="size">Kích thước:</label>
            <select id="size" v-model="newProduct.size" required>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          <button type="submit" class="submit-btn">Thêm sản phẩm</button>
        </form>
      </div>

      <!-- Danh sách sản phẩm -->
      <div class="products-list">
        <h2>Danh sách sản phẩm</h2>
        <div class="products-grid">
          <div v-for="product in products" :key="product.id" class="product-card">
            <img :src="product.image" :alt="product.name">
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="price">{{ product.price }}đ</p>
              <p class="description">{{ product.description }}</p>
              <p class="size">Size: {{ product.size }}</p>
            </div>
            <button @click="deleteProduct(product.id)" class="delete-btn">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductManagement',
  data() {
    return {
      newProduct: {
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'ao',
        size: 'M'
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch('addProduct', {
        ...this.newProduct,
        id: Date.now(),
        price: Number(this.newProduct.price)
      })
      // Reset form
      this.newProduct = {
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'ao',
        size: 'M'
      }
    }
  }
}
</script>

<style scoped>
.size {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0.5rem 0;
}
</style> 