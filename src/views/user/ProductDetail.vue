<template>
  <div class="product-detail">
    <div class="container">
      <button @click="$router.back()" class="back-button">
        <i class="fas fa-arrow-left"></i> Quay lại
      </button>
      
      <div v-if="product" class="product-content">
        <div class="product-gallery">
          <div class="main-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="thumbnails">
            <img v-for="(img, index) in product.images" 
                 :key="index" 
                 :src="img" 
                 :alt="product.name"
                 @click="product.image = img">
          </div>
        </div>
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <div class="price">{{ product.price }}đ</div>
          <div class="description">
            <h3>Mô tả sản phẩm</h3>
            <p>{{ product.description }}</p>
          </div>
          <div class="size">
            <h3>Kích thước</h3>
            <p>{{ product.size }}</p>
          </div>
          <div class="specifications">
            <h3>Thông số kỹ thuật</h3>
            <ul>
              <li v-for="(spec, key) in product.specifications" :key="key">
                <strong>{{ key }}:</strong> {{ spec }}
              </li>
            </ul>
          </div>
          <div class="quantity">
            <label>Số lượng:</label>
            <input type="number" v-model="quantity" min="1" max="10">
          </div>
          <button @click="addToCart" class="add-to-cart">Thêm vào giỏ hàng</button>
        </div>
      </div>
      <div v-else class="not-found">
        <h2>Không tìm thấy sản phẩm</h2>
        <router-link to="/products" class="back-button">Quay lại danh sách sản phẩm</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null,
      quantity: 1
    }
  },
  created() {
    // Lấy sản phẩm từ store dựa vào ID
    const productId = parseInt(this.$route.params.id)
    this.product = this.$store.state.products.find(p => p.id === productId)
  },
  methods: {
    addToCart() {
      // Thêm sản phẩm vào giỏ hàng với số lượng đã chọn
      for (let i = 0; i < this.quantity; i++) {
        this.$store.commit('addToCart', this.product)
      }
      
      // Hiển thị thông báo
      this.$store.commit('showToast', {
        message: `Đã thêm ${this.quantity} sản phẩm vào giỏ hàng`,
        type: 'success'
      })
    }
  },
  computed: {
    userOrders() {
      // Lọc đơn hàng của user đang đăng nhập
      return this.$store.state.orders.filter(order => 
        order.customer && order.customer.id === this.$store.state.user.id
      )
    }
  }
}
</script>

<style scoped>
.product-detail {
  padding: 2rem 0;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  border-radius: 5px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: auto;
  display: block;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
}

.thumbnails img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.thumbnails img:hover {
  opacity: 0.8;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-info h1 {
  margin: 0;
  font-size: 2rem;
}

.price {
  font-size: 1.5rem;
  color: #e44d26;
  font-weight: bold;
}

.description, .specifications {
  margin-top: 1rem;
}

.description h3, .specifications h3 {
  margin-bottom: 0.5rem;
}

.specifications ul {
  list-style: none;
  padding: 0;
}

.specifications li {
  margin-bottom: 0.5rem;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.quantity input {
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.add-to-cart {
  background-color: #333;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #444;
}

.not-found {
  text-align: center;
  padding: 2rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: var(--transition);
}

.back-button:hover {
  background-color: var(--secondary-color);
  transform: translateX(-2px);
}

.back-button i {
  font-size: 0.9rem;
}

.size {
  margin: 1.5rem 0;
}

.size h3 {
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.size p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .product-content {
    grid-template-columns: 1fr;
  }
}
</style> 