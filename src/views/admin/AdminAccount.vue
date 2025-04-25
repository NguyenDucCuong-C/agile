<template>
  <div class="admin-accounts">
    <div class="container">
      <h1 class="page-title">Quản lý tài khoản</h1>

      <!-- Danh sách tài khoản -->
      <div class="section">
        <h2 class="section-title">Danh sách tài khoản</h2>
        <div class="table-wrapper">
          <table class="accounts-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Quyền</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account in accounts" :key="account.id">
                <td>{{ account.name }}</td>
                <td>{{ account.email }}</td>
                <td>{{ account.role === 'admin' ? 'Quản trị viên' : 'Người dùng' }}</td>
                <td>
                  <span :class="account.is_active ? 'status active' : 'status inactive'">
                    {{ account.is_active ? 'Hoạt động' : 'Đã khóa' }}
                  </span>
                </td>
                <td>
                  <button @click="toggleAccountStatus(account)" class="btn btn-toggle">
                    {{ account.is_active ? 'Khóa' : 'Mở khóa' }}
                  </button>
                  <button @click="editAccount(account)" class="btn btn-edit">
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Form chỉnh sửa tài khoản -->
      <div v-if="editingAccount" class="section">
        <h2 class="section-title">Chỉnh sửa tài khoản</h2>
        <form @submit.prevent="handleUpdateAccount">
          <div class="form-group">
            <label>Tên</label>
            <input v-model="editingAccount.name" type="text" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="editingAccount.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Quyền</label>
            <select v-model="editingAccount.role" required>
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-update">Cập nhật</button>
            <button type="button" @click="cancelEdit" class="btn btn-cancel">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminAccounts',
  data() {
    return {
      editingAccount: null
    }
  },
  computed: {
    accounts() {
      return this.$store.state.users
    }
  },
  methods: {
    toggleAccountStatus(account) {
      const updated = { ...account, is_active: !account.is_active }
      this.$store.dispatch('updateAccountStatus', updated)
      this.$store.commit('showToast', {
        message: updated.is_active ? 'Mở khóa tài khoản thành công' : 'Khóa tài khoản thành công',
        type: 'success'
      })
    },
    editAccount(account) {
      this.editingAccount = { ...account }
    },
    handleUpdateAccount() {
      this.$store.dispatch('updateAccount', this.editingAccount);
      
      // Đảm bảo rằng danh sách tài khoản được cập nhật sau khi cập nhật tài khoản
      this.$nextTick(() => {
        this.editingAccount = null;
        this.$store.commit('showToast', {
          message: 'Cập nhật thông tin tài khoản thành công',
          type: 'success'
        });
      });
    },

    cancelEdit() {
      this.editingAccount = null
    }
  }
}
</script>

<style scoped>
.admin-accounts {
  padding: 2rem 0;
  background-color: var(--light-gray);
  min-height: calc(100vh - 60px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-title {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
}

.section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  text-align: left;
}

.table-wrapper {
  overflow-x: auto;
}

.accounts-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.accounts-table th,
.accounts-table td {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  text-align: center;
}

.accounts-table th {
  background-color: #f5f5f5;
  color: var(--text-color);
}

.status {
  font-weight: bold;
}

.status.active {
  color: green;
}

.status.inactive {
  color: red;
}

.btn {
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition);
  margin: 0 0.2rem;
}

.btn-toggle {
  background-color: var(--primary-color);
  color: white;
}

.btn-edit {
  background-color: var(--secondary-color);
  color: white;
}

.btn-update {
  background-color: var(--primary-color);
  color: white;
  margin-right: 1rem;
}

.btn-cancel {
  background-color: gray;
  color: white;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
}

input,
select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>
