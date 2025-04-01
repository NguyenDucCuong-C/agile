<template>
  <div class="order-history">
    <h2>Lịch sử đơn hàng</h2>
    <div v-if="!$store.state.orders || $store.state.orders.length === 0" class="no-orders">
      <p>Bạn chưa có đơn hàng nào.</p>
      <router-link to="/products" class="continue-shopping">Tiếp tục mua sắm</router-link>
    </div>
    <div v-else class="orders-list">
      <div v-for="order in $store.state.orders" :key="order.id" class="order-card">
        <div class="order-header">
          <div class="order-info">
            <h3>Đơn hàng #{{ order.id }}</h3>
            <p class="order-date">Ngày đặt: {{ order.date }}</p>
          </div>
          <div class="order-status" :class="order.status.toLowerCase()">
            {{ order.status }}
          </div>
        </div>
        <div class="order-items">
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <img :src="item.image" :alt="item.name" class="item-image">
            <div class="item-info">
              <h4>{{ item.name }}</h4>
              <p class="item-price">{{ formatPrice(item.price) }}đ</p>
              <p class="item-quantity">Số lượng: {{ item.quantity }}</p>
              <p class="item-subtotal">Thành tiền: {{ formatPrice(item.price * item.quantity) }}đ</p>
            </div>
          </div>
        </div>
        <div class="order-summary">
          <div class="summary-row">
            <span>Tạm tính:</span>
            <span>{{ formatPrice(calculateSubtotal(order.items)) }}đ</span>
          </div>
          <div class="summary-row">
            <span>Phí vận chuyển:</span>
            <span>30,000đ</span>
          </div>
          <div class="summary-row total">
            <span>Tổng cộng:</span>
            <span>{{ formatPrice(calculateSubtotal(order.items) + 30000) }}đ</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderHistory',
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    calculateSubtotal(items) {
      return items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  }
}
</script>

<style scoped>
.order-history {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
}

.no-orders {
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.no-orders p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
}

.continue-shopping {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.continue-shopping:hover {
  background-color: var(--secondary-color);
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.order-info h3 {
  margin: 0;
  color: var(--primary-color);
}

.order-date {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0 0;
}

.order-status {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
}

.order-status.chờ-xác-nhận {
  background-color: #fff3cd;
  color: #856404;
}

.order-status.đang-xử-lý {
  background-color: #cce5ff;
  color: #004085;
}

.order-status.đang-giao-hàng {
  background-color: #d1ecf1;
  color: #0c5460;
}

.order-status.đã-hoàn-thành {
  background-color: #d4edda;
  color: #155724;
}

.order-status.đã-hủy {
  background-color: #f8d7da;
  color: #721c24;
}

.order-items {
  padding: 1rem;
}

.order-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.item-info {
  flex: 1;
}

.item-info h4 {
  margin: 0 0 0.5rem;
  color: var(--primary-color);
}

.item-price {
  color: var(--accent-color);
  font-weight: 500;
  margin: 0.5rem 0;
}

.item-quantity {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.item-subtotal {
  color: var(--accent-color);
  font-weight: 500;
  margin: 0.5rem 0;
}

.order-summary {
  padding: 1rem;
  background: #f8f9fa;
  border-top: 1px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #666;
}

.summary-row.total {
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #ddd;
}

@media (max-width: 768px) {
  .order-history {
    padding: 1rem;
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .order-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .item-image {
    width: 120px;
    height: 120px;
  }
}
</style> 