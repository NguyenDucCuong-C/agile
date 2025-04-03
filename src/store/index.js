import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    orders: [],
    products: [
      {
        id: 1,
        name: 'Áo thun nam basic',
        price: 199000,
        description: 'Áo thun nam chất liệu cotton 100%, thoáng mát, dễ giặt',
        image: '/images/products/ao-thun-nam.jpg',
        category: 'Áo thun',
        size: 'M',
        featured: true
      },
      {
        id: 2,
        name: 'Áo thun nam polo',
        price: 299000,
        description: 'Áo thun nam polo phong cách thể thao, chất liệu cotton pha',
        image: '/images/products/ao-thun-polo.jpg',
        category: 'Áo thun',
        size: 'L',
        featured: true
      },
      {
        id: 3,
        name: 'Áo sơ mi nam công sở',
        price: 399000,
        description: 'Áo sơ mi nam công sở chất liệu cotton, form slim fit',
        image: '/images/products/ao-so-mi-nam.jpg',
        category: 'Áo sơ mi',
        size: 'M',
        featured: true
      },
      {
        id: 4,
        name: 'Áo sơ mi nam kẻ sọc',
        price: 449000,
        description: 'Áo sơ mi nam kẻ sọc phong cách business casual',
        image: '/images/products/ao-so-mi-ke.jpg',
        category: 'Áo sơ mi',
        size: 'L',
        featured: false
      },
      {
        id: 5,
        name: 'Áo khoác nam jean',
        price: 599000,
        description: 'Áo khoác nam chất liệu jean, phong cách casual',
        image: '/images/products/ao-khoac-jean.jpg',
        category: 'Áo khoác',
        size: 'M',
        featured: false
      },
      {
        id: 6,
        name: 'Áo khoác nam bomber',
        price: 799000,
        description: 'Áo khoác nam bomber phong cách streetwear',
        image: '/images/products/ao-khoac-bomber.jpg',
        category: 'Áo khoác',
        size: 'L',
        featured: false
      },
      {
        id: 7,
        name: 'Quần jean nam slim fit',
        price: 499000,
        description: 'Quần jean nam slim fit ôm dáng, chất liệu cotton',
        image: '/images/products/quan-jean-nam.jpg',
        category: 'Quần jean',
        size: '30',
        featured: false
      },
      {
        id: 8,
        name: 'Quần jean nam regular fit',
        price: 459000,
        description: 'Quần jean nam regular fit thoải mái, dễ mặc',
        image: '/images/products/quan-jean-regular.jpg',
        category: 'Quần jean',
        size: '32',
        featured: false
      },
      {
        id: 9,
        name: 'Quần tây nam công sở',
        price: 399000,
        description: 'Quần tây nam công sở chất liệu polyester, form slim fit',
        image: '/images/products/quan-tay-nam.jpg',
        category: 'Quần tây',
        size: '30',
        featured: false
      },
      {
        id: 10,
        name: 'Quần tây nam kẻ sọc',
        price: 449000,
        description: 'Quần tây nam kẻ sọc phong cách business casual',
        image: '/images/products/quan-tay-ke.jpg',
        category: 'Quần tây',
        size: '32',
        featured: false
      },
      {
        id: 11,
        name: 'Quần short nam thể thao',
        price: 199000,
        description: 'Quần short nam thể thao chất liệu thun, thoáng mát',
        image: '/images/products/quan-short-nam.jpg',
        category: 'Quần short',
        size: 'M',
        featured: false
      },
      {
        id: 12,
        name: 'Quần short nam jean',
        price: 299000,
        description: 'Quần short nam jean phong cách casual',
        image: '/images/products/quan-short-jean.jpg',
        category: 'Quần short',
        size: 'L',
        featured: false
      },
      {
        id: 13,
        name: 'Váy đầm nữ hoa',
        price: 399000,
        description: 'Váy đầm nữ họa tiết hoa, chất liệu voan',
        image: '/images/products/vay-hoa.jpg',
        category: 'Váy',
        size: 'S',
        featured: false
      },
      {
        id: 14,
        name: 'Váy đầm nữ trơn',
        price: 349000,
        description: 'Váy đầm nữ trơn phong cách tối giản',
        image: '/images/products/vay-tron.jpg',
        category: 'Váy',
        size: 'M',
        featured: false
      },
      {
        id: 15,
        name: 'Đầm nữ công sở',
        price: 499000,
        description: 'Đầm nữ công sở chất liệu cotton, form dáng ôm',
        image: '/images/products/dam-cong-so.jpg',
        category: 'Đầm',
        size: 'S',
        featured: false
      },
      {
        id: 16,
        name: 'Đầm nữ dự tiệc',
        price: 799000,
        description: 'Đầm nữ dự tiệc phong cách sang trọng',
        image: '/images/products/dam-du-tiec.jpg',
        category: 'Đầm',
        size: 'M',
        featured: false
      },
      {
        id: 17,
        name: 'Thắt lưng nam da',
        price: 199000,
        description: 'Thắt lưng nam da thật, phong cách công sở',
        image: '/images/products/that-lung-nam.jpg',
        category: 'Phụ kiện',
        size: 'Free size',
        featured: false
      },
      {
        id: 18,
        name: 'Túi xách nữ da',
        price: 599000,
        description: 'Túi xách nữ da thật, thiết kế tối giản',
        image: '/images/products/tui-xach-nu.jpg',
        category: 'Phụ kiện',
        size: 'Free size',
        featured: false
      }
    ],
    user: null,
    isAuthenticated: false,
    users: [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        id: 2,
        name: 'Nguyễn Văn A',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      }
    ],
    toast: {
      show: false,
      message: '',
      type: 'success'
    }
  },
  mutations: {
    addToCart(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.push({
          ...product,
          quantity: 1
        })
      }
      // Lưu giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart))
      
      // Hiển thị thông báo mới
      state.toast = {
        show: true,
        message: `Đã thêm ${product.name} vào giỏ hàng${existingItem ? ' (số lượng: ' + (existingItem.quantity) + ')' : ''}`,
        type: 'success'
      }
      // Đặt lại show thành true sau 100ms để đảm bảo thông báo mới hiển thị
      setTimeout(() => {
        state.toast.show = true
      }, 100)
    },
    updateQuantity(state, { product, quantity }) {
      const item = state.cart.find(item => item.id === product.id)
      if (item) {
        item.quantity = quantity
        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    removeFromCart(state, product) {
      state.cart = state.cart.filter(item => item.id !== product.id)
      // Lưu giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart(state) {
      state.cart = []
      // Xóa giỏ hàng khỏi localStorage
      localStorage.removeItem('cart')
    },
    addOrder(state, order) {
      // Thêm đơn hàng mới vào đầu mảng với trạng thái mặc định là "Chờ xác nhận"
      state.orders.unshift({
        ...order,
        id: Date.now(),
        date: new Date().toLocaleString('vi-VN'),
        status: 'Chờ xác nhận'  // Luôn đặt trạng thái mặc định là "Chờ xác nhận"
      })
    },
    updateOrderStatus(state, { orderId, status }) {
      const order = state.orders.find(o => o.id === orderId)
      if (order) {
        order.status = status || 'Chờ xác nhận'  // Nếu không có status thì mặc định là "Chờ xác nhận"
      }
    },
    addProduct(state, product) {
      state.products.push({
        ...product,
        size: product.size || 'M' // Thêm size mặc định nếu không có
      })
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    deleteProduct(state, productId) {
      state.products = state.products.filter(p => p.id !== productId)
      localStorage.setItem('products', JSON.stringify(state.products))
      // Xóa sản phẩm khỏi giỏ hàng nếu có
      state.cart = state.cart.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setUser(state, user) {
      state.user = user
      state.isAuthenticated = !!user
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
    },
    addUser(state, user) {
      state.users.push(user)
    },
    hideToast(state) {
      state.toast.show = false
    },
    showToast(state, { message, type = 'success' }) {
      state.toast = {
        show: true,
        message,
        type
      }
    }
  },
  actions: {
    addProduct({ commit }, product) {
      commit('addProduct', product)
    },
    deleteProduct({ commit }, productId) {
      commit('deleteProduct', productId)
    },
    async checkout({ commit, state }) {
      try {
        // Tạo đơn hàng mới
        const order = {
          id: Date.now(),
          date: new Date().toLocaleDateString('vi-VN'),
          items: [...state.cart],
          status: 'pending',
          subtotal: state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
          shipping: 30000, // Phí vận chuyển cố định 30,000đ
          total: state.cart.reduce((total, item) => total + item.price * item.quantity, 0) + 30000
        };

        // Thêm đơn hàng vào danh sách
        commit('addOrder', order);
        
        // Xóa giỏ hàng
        commit('clearCart');
        
        // Hiển thị thông báo thành công
        commit('showToast', {
          message: 'Đặt hàng thành công! Cảm ơn bạn đã mua sắm.',
          type: 'success'
        });

        return true;
      } catch (error) {
        commit('showToast', {
          message: 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.',
          type: 'error'
        });
        return false;
      }
    },
    async login({ commit, state }, credentials) {
      // Tìm tài khoản trong danh sách
      const user = state.users.find(
        u => u.email === credentials.email && u.password === credentials.password
      )

      if (!user) {
        throw new Error('Email hoặc mật khẩu không chính xác')
      }

      // Tạo bản sao của user không chứa mật khẩu
      // eslint-disable-next-line no-unused-vars
      const { password: _password, ...userWithoutPassword } = user
      
      commit('setUser', userWithoutPassword)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      return userWithoutPassword
    },
    async register({ commit, state }, userData) {
      // Kiểm tra email đã tồn tại chưa
      const existingUser = state.users.find(u => u.email === userData.email)
      if (existingUser) {
        throw new Error('Email đã được sử dụng')
      }

      // Tạo tài khoản mới
      const newUser = {
        id: state.users.length + 1,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: 'user'
      }

      commit('addUser', newUser)
      
      // Tạo bản sao không chứa mật khẩu
      // eslint-disable-next-line no-unused-vars
      const { password: _password, ...userWithoutPassword } = newUser
      commit('setUser', userWithoutPassword)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      
      return userWithoutPassword
    },
    logout({ commit }) {
      commit('logout')
      localStorage.removeItem('user')
    },
    checkAuth({ commit }) {
      const user = localStorage.getItem('user')
      if (user) {
        commit('setUser', JSON.parse(user))
      }
    }
  },
  getters: {
    cartItemCount: state => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    categories: state => {
      // Get unique categories from products
      return [...new Set(state.products.map(product => product.category))]
    },
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user,
    isAdmin: state => state.user && state.user.role === 'admin'
  }
}) 