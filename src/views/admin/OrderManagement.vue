<template>
  <div class="orders">
    <div class="container">
      <h1>Quản lý đơn hàng</h1>
      
      <div v-if="orders.length === 0" class="empty-orders">
        <p>Chưa có đơn hàng nào</p>
      </div>

      <div v-else class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <div class="order-header">
            <div class="order-info">
              <h3>Đơn hàng #{{ order.id }}</h3>
              <p class="order-date">{{ order.date }}</p>
            </div>
          </div>

          <div class="order-items">
            <div v-for="item in order.items" :key="item.id" class="order-item">
              <img :src="item.image" :alt="item.name">
              <div class="item-details">
                <h4>{{ item.name }}</h4>
                <p>Số lượng: {{ item.quantity }}</p>
                <p class="price">{{ formatPrice(item.price) }}đ</p>
              </div>
            </div>
          </div>

          <div class="order-summary">
            <div class="summary-item">
              <span>Tạm tính:</span>
              <span>{{ formatPrice(calculateSubtotal(order.items)) }}đ</span>
            </div>
            <div class="summary-item">
              <span>Phí vận chuyển:</span>
              <span>30,000đ</span>
            </div>
            <div class="summary-item total">
              <span>Tổng cộng:</span>
              <span>{{ formatPrice(calculateSubtotal(order.items) + 30000) }}đ</span>
            </div>
          </div>

          <div class="order-actions">
            <div class="status-control">
              <select 
                v-model="order.status"
                @change="updateStatus(order, $event.target.value)"
                class="status-select"
              >
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đang giao hàng">Đang giao hàng</option>
                <option value="Đã hoàn thành">Đã hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
              <div class="order-status" :class="order.status.toLowerCase().replace(/ /g, '-')">
                {{ order.status }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderManagement',
  computed: {
    orders() {
      return this.$store.state.orders
    }
  },
  methods: {
    updateStatus(order, newStatus) {
      if (!order.status) {
        order.status = 'Chờ xác nhận'
      }
      this.$store.commit('updateOrderStatus', { 
        orderId: order.id, 
        status: newStatus 
      })
    },
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
.orders {
  padding: 2rem 0;
  background-color: #f8f9fa;
  min-height: calc(100vh - 60px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2.5rem;
  font-size: 2rem;
  font-weight: 600;
}

.status-control {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.status-select {
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  background-color: white;
  font-size: 0.95rem;
  cursor: pointer;
  min-width: 180px;
  color: #495057;
  transition: all 0.3s ease;
  outline: none;
}

.status-select:hover {
  border-color: #4dabf7;
}

.status-select:focus {
  border-color: #339af0;
  box-shadow: 0 0 0 3px rgba(51, 154, 240, 0.1);
}

.order-status {
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  min-width: 140px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.order-status.chờ-xác-nhận {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.order-status.đang-xử-lý {
  background-color: #cce5ff;
  color: #004085;
  border: 1px solid #b8daff;
}

.order-status.đang-giao-hàng {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.order-status.đã-hoàn-thành {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.order-status.đã-hủy {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.empty-orders {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.empty-orders p {
  margin-bottom: 1rem;
  color: #6c757d;
  font-size: 1.1rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  padding: 1.8rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.8rem;
  padding-bottom: 1.2rem;
  border-bottom: 2px solid #f8f9fa;
}

.order-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
}

.order-date {
  margin: 0.5rem 0 0 0;
  color: #6c757d;
  font-size: 0.95rem;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.8rem;
}

.order-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 1.2rem;
  padding: 1.2rem;
  background: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.order-item:hover {
  transform: translateX(4px);
}

.order-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.item-details h4 {
  margin: 0 0 0.8rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.item-details p {
  margin: 0.4rem 0;
  color: #6c757d;
  font-size: 0.95rem;
}

.item-details .price {
  color: #e74c3c;
  font-weight: 600;
  font-size: 1.1rem;
}

.order-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin: 0.8rem 0;
  color: #495057;
  font-size: 1rem;
}

.summary-item.total {
  font-weight: 600;
  color: #2c3e50;
  border-top: 2px solid #e9ecef;
  padding-top: 1rem;
  margin-top: 1rem;
  font-size: 1.15rem;
}

.order-actions {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f8f9fa;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .order-header {
    flex-direction: column;
    gap: 1rem;
  }

  .order-item {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .order-item img {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

  .status-control {
    flex-direction: column;
    align-items: stretch;
  }

  .status-select {
    width: 100%;
  }

  .order-status {
    width: 100%;
    margin-top: 0.5rem;
  }
}

.status-select option {
  padding: 10px;
  font-size: 0.95rem;
}

.status-select option[value="Chờ xác nhận"] {
  font-weight: 600;
  color: #856404;
}
</style> 