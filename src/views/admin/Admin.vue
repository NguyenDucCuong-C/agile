<template>
  <div class="admin">
    <div class="container">
      <h1>Quản lý đơn hàng</h1>
      <div class="orders-list">
        <div v-if="orders.length === 0" class="empty-orders">
          <p>Chưa có đơn hàng nào</p>
        </div>
        <div v-else>
          <div v-for="order in orders" :key="order.id" class="order-item">
            <div class="order-header">
              <h3>Đơn hàng #{{ order.id }}</h3>
              <span class="order-date">{{ order.date }}</span>
            </div>
            <div class="order-products">
              <div v-for="item in order.items" :key="item.id" class="product-item">
                <img :src="item.image" :alt="item.name">
                <div class="product-details">
                  <h4>{{ item.name }}</h4>
                  <p>Số lượng: {{ item.quantity }}</p>
                  <p>Giá: {{ item.price }}đ</p>
                </div>
              </div>
            </div>
            <div class="order-summary">
              <p>Tạm tính: {{ order.subtotal }}đ</p>
              <p>Phí vận chuyển: {{ order.shipping }}đ</p>
              <p class="total">Tổng cộng: {{ order.total }}đ</p>
            </div>
            <div class="order-actions">
              <select v-model="order.status" @change="updateOrderStatus(order)">
                <option value="pending">Chờ xác nhận</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipping">Đang giao hàng</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  computed: {
    orders() {
      return this.$store.state.orders
    }
  },
  methods: {
    updateOrderStatus(order) {
      this.$store.commit('updateOrderStatus', {
        orderId: order.id,
        status: order.status
      })
      this.$store.commit('showToast', {
        message: `Đã cập nhật trạng thái đơn hàng #${order.id}`,
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.admin {
  padding: 2rem 0;
  min-height: calc(100vh - 60px);
  background-color: var(--light-gray);
}

.admin h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
}

.orders-list {
  max-width: 1000px;
  margin: 0 auto;
}

.empty-orders {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.order-item {
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.order-date {
  color: var(--text-secondary);
}

.order-products {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

.product-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 1rem;
  padding: 1rem;
  background: var(--light-gray);
  border-radius: 8px;
}

.product-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.product-details h4 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-color);
}

.product-details p {
  margin: 0.25rem 0;
  color: var(--text-secondary);
}

.order-summary {
  margin: 1rem 0;
  padding: 1rem;
  background: var(--light-gray);
  border-radius: 8px;
}

.order-summary p {
  margin: 0.5rem 0;
}

.order-summary .total {
  font-weight: bold;
  color: var(--primary-color);
}

.order-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

select {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: white;
  color: var(--text-color);
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .product-item {
    grid-template-columns: 1fr;
  }

  .product-item img {
    width: 100%;
    height: 200px;
  }
}
</style> 