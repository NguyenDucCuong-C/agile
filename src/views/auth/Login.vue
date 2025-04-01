<template>
  <div class="login">
    <div class="container">
      <div class="login-container">
        <h1>Đăng nhập</h1>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <form @submit.prevent="handleLogin" class="login-form">
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
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Đăng nhập</button>
            <p class="register-link">
              Chưa có tài khoản? 
              <router-link to="/register">Đăng ký ngay</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async handleLogin() {
      try {
        const user = await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        
        if (user.role === 'admin') {
          this.$router.push('/admin')
        } else {
          // Kiểm tra xem có URL chuyển hướng không
          const redirectPath = this.$route.query.redirect || '/'
          this.$router.push(redirectPath)
        }
      } catch (error) {
        this.error = error.message || 'Đăng nhập thất bại'
      }
    }
  }
}
</script>

<style scoped>
.login {
  padding: 2rem 0;
  min-height: calc(100vh - 60px);
  background-color: var(--light-gray);
  display: flex;
  align-items: center;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.login-container h1 {
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

.register-link {
  text-align: center;
  color: #666;
}

.register-link a {
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
}

.register-link a:hover {
  color: #2980b9;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-container {
    margin: 1rem;
    padding: 1.5rem;
  }
}

.error-message {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
}
</style> 