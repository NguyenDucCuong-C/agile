<template>
  <div v-if="show" class="toast" :class="type">
    <div class="toast-content">
      <i class="fas" :class="icon"></i>
      <span>{{ message }}</span>
    </div>
    <button class="toast-close" @click="close">&times;</button>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success'
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      show: true,
      icon: {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
      }[this.type]
    }
  },
  watch: {
    message: {
      handler() {
        this.show = true
        if (this.duration > 0) {
          setTimeout(() => {
            this.close()
          }, this.duration)
        }
      },
      immediate: true
    }
  },
  methods: {
    close() {
      this.show = false
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 24px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toast-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0 0 0 12px;
  color: #666;
}

.toast-close:hover {
  color: #333;
}

.success {
  border-left: 4px solid #4CAF50;
}

.error {
  border-left: 4px solid #f44336;
}

.warning {
  border-left: 4px solid #ff9800;
}

.info {
  border-left: 4px solid #2196F3;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style> 