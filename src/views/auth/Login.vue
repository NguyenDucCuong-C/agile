<template>
  <div class="login">
    <div class="login-background"></div>
    <div class="container">
      <div class="login-container">
        <div class="login-header">
          <h1>Đăng nhập</h1>
          <p class="subtitle">Chào mừng bạn quay trở lại!</p>
        </div>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-group">
              <i class="fas fa-envelope"></i>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                :class="['form-control', {'is-invalid': errors.email}]"
                @blur="validateEmail"
                placeholder="Nhập email của bạn"
              >
            </div>
            <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <div class="input-group">
              <i class="fas fa-lock"></i>
              <input 
                type="password" 
                id="password" 
                v-model="password" 
                :class="['form-control', {'is-invalid': errors.password}]"
                @blur="validatePassword"
                placeholder="Nhập mật khẩu của bạn"
              >
            </div>
            <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
              <span>Đăng nhập</span>
              <i class="fas fa-arrow-right"></i>
            </button>
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
      error: null,
      errors: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.email && 
             this.password && 
             !this.errors.email && 
             !this.errors.password
    }
  },
  methods: {
    validateEmail() {
      if (!this.email) {
        this.errors.email = 'Vui lòng nhập email'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.errors.email = 'Email không hợp lệ'
      } else {
        this.errors.email = ''
      }
    },
    validatePassword() {
      if (!this.password) {
        this.errors.password = 'Vui lòng nhập mật khẩu'
      } else if (this.password.length < 6) {
        this.errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
      } else {
        this.errors.password = ''
      }
    },
    validateForm() {
      this.validateEmail()
      this.validatePassword()
      return !this.errors.email && !this.errors.password
    },
    async handleLogin() {
      if (!this.validateForm()) {
        this.$store.commit('showToast', {
          message: 'Vui lòng điền đầy đủ thông tin',
          type: 'error'
        })
        return
      }

      try {
        const user = await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        
        this.$store.commit('showToast', {
          message: 'Đăng nhập thành công!',
          type: 'success'
        })
        
        if (user.role === 'admin') {
          this.$router.push('/admin')
        } else {
          const redirectPath = this.$route.query.redirect || '/'
          this.$router.push(redirectPath)
        }
      } catch (error) {
        this.error = error.message || 'Đăng nhập thất bại'
        this.$store.commit('showToast', {
          message: this.error,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
.login {
  padding: 0;
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  opacity: 0.8;
  z-index: 0;
}

.container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.login-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 2.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.login-container:hover {
  transform: translateY(-5px);
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-header h1 {
  color: #2c3e50;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.form-group {
  margin-bottom: 1.8rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.7rem;
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.95rem;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group i {
  position: absolute;
  left: 15px;
  top: 38%;
  transform: translateY(-50%);
  color: #95a5a6;
  font-size: 1.1rem;
  line-height: 1;
  height: 1.1rem;
  width: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-control {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}

.form-control:focus {
  outline: none;
  border-color: #3498db;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.btn-primary {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2980b9 0%, #2471a3 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.btn-primary i {
  transition: transform 0.3s ease;
}

.btn-primary:hover i {
  transform: translateX(5px);
}

.register-link {
  text-align: center;
  color: #7f8c8d;
  font-size: 0.95rem;
}

.register-link a {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.register-link a:hover {
  color: #2980b9;
  text-decoration: underline;
}

.error-message {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #fecaca;
}

.error-text {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
}

.is-invalid {
  border-color: #dc2626 !important;
}

.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background: #95a5a6;
}

.btn-primary:disabled:hover {
  transform: none;
  box-shadow: none;
}

@media (max-width: 768px) {
  .login-container {
    margin: 1rem;
    padding: 2rem;
  }

  .login-header h1 {
    font-size: 2rem;
  }
}
</style> 