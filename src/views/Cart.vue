<template>
  <div class="cart">
    <Toast 
      :show="$store.state.toast.show"
      :message="$store.state.toast.message"
      :type="$store.state.toast.type"
    />
    <div class="container">
      <h1>Giỏ hàng của bạn</h1>
      <div v-if="!cartItems.length" class="empty-cart">
        <p>Giỏ hàng trống</p>
        <router-link to="/products" class="continue-shopping">Tiếp tục mua sắm</router-link>
      </div>
      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="item-image">
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p class="price">{{ formatPrice(item.price) }}đ</p>
            </div>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
            <p class="item-total">{{ formatPrice(item.price * item.quantity) }}đ</p>
            <button @click="removeItem(item)" class="remove-btn">
              <i class="fas fa-trash"></i> Xóa
            </button>
          </div>
        </div>
        <div class="cart-summary">
          <h2>Tổng đơn hàng</h2>
          <div class="summary-item">
            <span>Tạm tính:</span>
            <span>{{ formatPrice(subtotal) }}đ</span>
          </div>
          <div class="summary-item">
            <span>Phí vận chuyển:</span>
            <span>{{ formatPrice(shippingFee) }}đ</span>
          </div>
          <div class="summary-item total">
            <span>Tổng cộng:</span>
            <span>{{ formatPrice(total) }}đ</span>
          </div>
          <button @click="checkout" class="checkout-btn">Thanh toán</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'

export default {
  name: 'Cart',
  components: {
    Toast
  },
  computed: {
    cartItems() {
      return this.$store.state.cart
    },
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    shippingFee() {
      return this.cartItems.length > 0 ? 30000 : 0
    },
    total() {
      return this.subtotal + this.shippingFee
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('vi-VN')
    },
    increaseQuantity(item) {
      this.$store.commit('updateQuantity', {
        id: item.id,
        quantity: item.quantity + 1
      })
      this.$store.commit('showToast', {
        message: `Đã tăng số lượng ${item.name} lên ${item.quantity + 1}`,
        type: 'success'
      })
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.$store.commit('updateQuantity', {
          id: item.id,
          quantity: item.quantity - 1
        })
        this.$store.commit('showToast', {
          message: `Đã giảm số lượng ${item.name} xuống ${item.quantity - 1}`,
          type: 'success'
        })
      }
    },
    removeItem(item) {
      if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
        this.$store.commit('removeFromCart', item.id)
        this.$store.commit('showToast', {
          message: `Đã xóa ${item.name} khỏi giỏ hàng`,
          type: 'success'
        })
      }
    },
    async checkout() {
      if (!this.$store.state.isAuthenticated) {
        this.$store.commit('showToast', {
          message: 'Vui lòng đăng nhập để thanh toán',
          type: 'error'
        })
        this.$router.push('/login')
        return
      }

      if (confirm('Bạn có chắc chắn muốn đặt hàng?')) {
        try {
          const order = {
            id: Date.now(),
            items: [...this.cartItems],
            subtotal: this.subtotal,
            shippingFee: this.shippingFee,
            total: this.total,
            status: 'Đang xử lý',
            date: new Date().toLocaleString('vi-VN'),
            customer: this.$store.state.user
          }

          this.$store.commit('addOrder', order)
          this.$store.commit('clearCart')
          this.$store.commit('showToast', {
            message: 'Đặt hàng thành công! Cảm ơn bạn đã mua sắm.',
            type: 'success'
          })
          this.$router.push('/orders')
        } catch (error) {
          console.error('Lỗi khi đặt hàng:', error)
          this.$store.commit('showToast', {
            message: 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.',
            type: 'error'
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.cart {
  padding: 20px;
  min-height: calc(100vh - 60px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.cart-items {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 20px;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.item-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.price {
  color: #e74c3c;
  font-weight: 600;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: none;
  background: #f7f7f7;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.quantity-controls button:hover:not(:disabled) {
  background: #e0e0e0;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls span {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

.item-total {
  font-weight: 600;
  color: #2c3e50;
}

.remove-btn {
  border: none;
  background: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s;
}

.remove-btn:hover {
  background: #fee;
  color: #c0392b;
}

.cart-summary {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: fit-content;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  color: #666;
}

.total {
  font-weight: 600;
  font-size: 1.2rem;
  color: #2c3e50;
  border-top: 1px solid #eee;
  padding-top: 15px;
  margin-top: 15px;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.checkout-btn:hover {
  background: #2980b9;
}

.continue-shopping {
  display: inline-block;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s;
}

.continue-shopping:hover {
  background: #2980b9;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 10px;
  }

  .item-image {
    margin: 0 auto;
  }

  .quantity-controls {
    justify-content: center;
  }

  .item-total {
    margin: 10px 0;
  }

  .remove-btn {
    justify-content: center;
  }
}
</style> 