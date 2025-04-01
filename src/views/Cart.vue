<template>
  <!-- No changes to template section -->
</template>

<script>
export default {
  methods: {
    removeFromCart(product) {
      this.$store.commit('removeFromCart', product)
    },
    updateQuantity(product, quantity) {
      this.$store.commit('updateQuantity', { product, quantity })
    },
    async checkout() {
      if (!this.$store.state.isAuthenticated) {
        alert('Vui lòng đăng nhập để thanh toán')
        this.$router.push('/login')
        return
      }

      if (confirm('Bạn có chắc chắn muốn đặt hàng?')) {
        try {
          // Tạo đơn hàng mới
          const order = {
            id: Date.now(), // Tạo ID đơn hàng từ timestamp
            items: [...this.cartItems],
            total: this.total,
            status: 'Đang xử lý',
            date: new Date().toLocaleString('vi-VN'),
            customer: this.$store.state.user
          }

          // Thêm đơn hàng vào store
          this.$store.commit('addOrder', order)

          // Xóa giỏ hàng
          this.$store.commit('clearCart')

          alert('Đặt hàng thành công!')
          this.$router.push('/orders')
        } catch (error) {
          console.error('Lỗi khi đặt hàng:', error)
          alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.')
        }
      }
    }
  }
}
</script>

<style>
  /* No changes to style section */
</style> 