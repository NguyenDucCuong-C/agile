<template>
  <div class="register">
    <div class="container">
      <div class="register-container">
        <h1>Đăng ký</h1>
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label for="name">Họ và tên</label>
            <input 
              type="text" 
              id="name" 
              v-model="name" 
              class="form-control" 
              required
              placeholder="Nhập họ và tên của bạn"
            >
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              class="form-control" 
              required
              placeholder="Nhập email của bạn"
            >
          </div>
          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              class="form-control" 
              required
              placeholder="Nhập mật khẩu của bạn"
            >
          </div>
          <div class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu</label>
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="confirmPassword" 
              class="form-control" 
              required
              placeholder="Nhập lại mật khẩu"
            >
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Đăng ký</button>
            <p class="login-link">
              Đã có tài khoản? 
              <router-link to="/login">Đăng nhập</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!')
        return
      }

      try {
        await this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        this.$router.push('/login')
      } catch (error) {
        console.error('Lỗi đăng ký:', error)
      }
    }
  }
}
</script>

<style scoped>
.register {
  padding: 2rem 0;
  min-height: calc(100vh - 60px);
  background-color: var(--light-gray);
  display: flex;
  align-items: center;
}

.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.register-container h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
  font-size: 2rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  transition: var(--transition);
}

.form-control:focus {
  outline: none;
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-actions button {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
}

.login-link {
  text-align: center;
  color: #666;
}

.login-link a {
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
}

.login-link a:hover {
  color: #2980b9;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-container {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style> 