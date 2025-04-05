<template>
  <div class="register">
    <div class="register-background"></div>
    <div class="container">
      <div class="register-container">
        <div class="register-header">
          <h1>Đăng ký</h1>
          <p class="subtitle">Tạo tài khoản mới để mua sắm</p>
        </div>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label for="name">Họ và tên</label>
            <div class="input-group">
              <i class="fas fa-user"></i>
              <input 
                type="text" 
                id="name" 
                v-model="name" 
                :class="['form-control', {'is-invalid': errors.name}]"
                @blur="validateName"
                placeholder="Nhập họ và tên của bạn"
              >
            </div>
            <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
          </div>
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
          <div class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu</label>
            <div class="input-group">
              <i class="fas fa-lock"></i>
              <input 
                type="password" 
                id="confirmPassword" 
                v-model="confirmPassword" 
                :class="['form-control', {'is-invalid': errors.confirmPassword}]"
                @blur="validateConfirmPassword"
                placeholder="Nhập lại mật khẩu"
              >
            </div>
            <span v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</span>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
              <span>Đăng ký</span>
              <i class="fas fa-arrow-right"></i>
            </button>
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
      confirmPassword: '',
      error: null,
      errors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.name &&
             this.email &&
             this.password &&
             this.confirmPassword &&
             !this.errors.name &&
             !this.errors.email &&
             !this.errors.password &&
             !this.errors.confirmPassword
    }
  },
  methods: {
    validateName() {
      if (!this.name) {
        this.errors.name = 'Vui lòng nhập họ và tên'
      } else if (this.name.length < 2) {
        this.errors.name = 'Tên phải có ít nhất 2 ký tự'
      } else {
        this.errors.name = ''
      }
    },
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
      if (this.confirmPassword) {
        this.validateConfirmPassword()
      }
    },
    validateConfirmPassword() {
      if (!this.confirmPassword) {
        this.errors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
      } else if (this.confirmPassword !== this.password) {
        this.errors.confirmPassword = 'Mật khẩu xác nhận không khớp'
      } else {
        this.errors.confirmPassword = ''
      }
    },
    validateForm() {
      this.validateName()
      this.validateEmail()
      this.validatePassword()
      this.validateConfirmPassword()
      return !this.errors.name &&
             !this.errors.email &&
             !this.errors.password &&
             !this.errors.confirmPassword
    },
    async handleRegister() {
      if (!this.validateForm()) {
        this.$store.commit('showToast', {
          message: 'Vui lòng điền đầy đủ thông tin',
          type: 'error'
        })
        return
      }

      try {
        await this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        
        this.$store.commit('showToast', {
          message: 'Đăng ký thành công!',
          type: 'success'
        })
        
        this.$router.push('/login')
      } catch (error) {
        this.error = error.message || 'Lỗi đăng ký'
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
.register {
  padding: 2rem 0;
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.register-background {
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

.register-container {
  max-width: 450px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.register-container:hover {
  transform: translateY(-5px);
}

.register-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.register-header h1 {
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
  position: relative;
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
  height: 48px;
  padding: 0 1rem 0 3rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
  line-height: 48px;
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
  height: 48px;
  padding: 0 1rem;
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

.login-link {
  text-align: center;
  color: #7f8c8d;
  font-size: 0.95rem;
}

.login-link a {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.login-link a:hover {
  color: #2980b9;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-container {
    margin: 1rem;
    padding: 2rem;
  }

  .register-header h1 {
    font-size: 2rem;
  }
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
</style> 