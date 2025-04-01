<template>
  <div class="cart">
    <div class="container">
      <h1>Giỏ hàng</h1>
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Giỏ hàng của bạn đang trống</p>
        <router-link to="/products" class="continue-shopping">Tiếp tục mua sắm</router-link>
      </div>
      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name">
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="price">{{ item.price }}đ</p>
            </div>
            <div class="quantity">
              <button @click="decreaseQuantity(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
            <button @click="removeFromCart(item.id)" class="remove-item">Xóa</button>
          </div>
        </div>
        <div class="cart-summary">
          <h2>Tổng đơn hàng</h2>
          <div class="summary-item">
            <span>Tạm tính:</span>
            <span>{{ subtotal }}đ</span>
          </div>
          <div class="summary-item">
            <span>Phí vận chuyển:</span>
            <span>{{ shipping }}đ</span>
          </div>
          <div class="summary-item total">
            <span>Tổng cộng:</span>
            <span>{{ total }}đ</span>
          </div>
          <button @click="checkout" class="checkout-button">
            {{ isAuthenticated ? 'Thanh toán' : 'Đăng nhập để thanh toán' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  computed: {
    cartItems() {
      return this.$store.state.cart
    },
    subtotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    shipping() {
      return this.subtotal > 0 ? 30000 : 0
    },
    total() {
      return this.subtotal + this.shipping
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    increaseQuantity(item) {
      this.$store.commit('updateQuantity', { id: item.id, quantity: item.quantity + 1 })
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.$store.commit('updateQuantity', { id: item.id, quantity: item.quantity - 1 })
      }
    },
    removeFromCart(productId) {
      this.$store.commit('removeFromCart', productId)
    },
    async checkout() {
      if (!this.isAuthenticated) {
        this.$router.push('/login')
        return
      }

      // Hiển thị hộp thoại xác nhận
      if (confirm('Bạn có chắc chắn muốn đặt hàng?')) {
        try {
          const success = await this.$store.dispatch('checkout')
          if (success) {
            // Hiển thị thông báo thành công
            alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.')
          }
        } catch (error) {
          // Hiển thị thông báo lỗi
          alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.')
        }
      }
    }
  }
}
</script>

<style scoped>
.cart {
  padding: 2rem 0;
  min-height: calc(100vh - 60px);
  background-color: var(--light-gray);
}

.cart h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
  font-size: 2rem;
  font-weight: 600;
}

.empty-cart {
  text-align: center;
  padding: 3rem 0;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.empty-cart p {
  color: var(--text-color);
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.continue-shopping {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.8rem 2rem;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 1rem;
  transition: var(--transition);
}

.continue-shopping:hover {
  background-color: #34495e;
  transform: translateY(-2px);
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: var(--shadow);
}

.item-details h3 {
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  font-size: 1.1rem;
}

.price {
  color: var(--accent-color);
  font-weight: 500;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  transition: var(--transition);
}

.quantity button:hover {
  background-color: #34495e;
  transform: translateY(-2px);
}

.quantity span {
  min-width: 30px;
  text-align: center;
  font-weight: 500;
}

.remove-item {
  background-color: var(--danger-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: var(--transition);
}

.remove-item:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}

.cart-summary {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  height: fit-content;
}

.cart-summary h2 {
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 600;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  color: #666;
}

.total {
  font-weight: bold;
  font-size: 1.2rem;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
  color: var(--primary-color);
}

.checkout-button {
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  font-weight: 500;
  transition: var(--transition);
}

.checkout-button:hover {
  background-color: #34495e;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
  }

  .cart-item img {
    margin: 0 auto;
  }

  .quantity {
    justify-content: center;
  }

  .remove-item {
    width: 100%;
  }
}
</style> 