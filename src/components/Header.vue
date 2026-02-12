<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/">
            <h1>智车商城</h1>
          </router-link>
        </div>

        <!-- 导航菜单 -->
        <nav class="nav-menu">
          <router-link to="/" class="nav-item">首页</router-link>
          <router-link to="/products" class="nav-item">智车选购</router-link>
          <router-link to="/guide" class="nav-item">使用指南</router-link>
          <router-link to="/maintenance" class="nav-item">保养指南</router-link>
          <router-link to="/about" class="nav-item">关于我们</router-link>
        </nav>

        <!-- 用户操作区 -->
        <div class="user-actions">
          <!-- 搜索框 -->
          <div class="search-box">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索智能汽车品牌、车型、配置"
              @keyup.enter="handleSearch"
              clearable
            >
              <template #append>
                <el-button @click="handleSearch">
                  <el-icon><Search /></el-icon>
                </el-button>
              </template>
            </el-input>
          </div>

          <!-- 购物车 -->
          <router-link to="/cart" class="action-item">
            <el-badge :value="cartStore.totalItems" :hidden="cartStore.totalItems === 0">
              <el-icon size="24"><ShoppingCart /></el-icon>
            </el-badge>
          </router-link>

          <!-- 收藏夹 -->
          <router-link to="/favorites" class="action-item">
            <el-badge :value="favoritesStore.totalFavorites" :hidden="favoritesStore.totalFavorites === 0">
              <el-icon size="24"><Star /></el-icon>
            </el-badge>
          </router-link>

          <!-- 用户菜单 -->
          <div class="user-menu">
            <template v-if="userStore.isLoggedIn">
              <el-dropdown @command="handleUserCommand">
                <span class="user-info">
                  <el-icon size="20"><User /></el-icon>
                  <span>{{ userStore.user?.username || '智能汽车爱好者' }}</span>
                  <el-icon><ArrowDown /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                    <el-dropdown-item command="orders">我的订单</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <template v-else>
              <router-link to="/login" class="login-btn">
                <el-icon size="20"><User /></el-icon>
                <span>智能汽车爱好者</span>
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'
import { useFavoritesStore } from '../stores/favorites'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const searchKeyword = ref('')

// 搜索处理
const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchKeyword.value.trim() }
    })
  }
}

// 用户菜单命令处理
const handleUserCommand = (command) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'orders':
      router.push('/orders')
      break
    case 'logout':
      userStore.logout()
      ElMessage.success('已退出登录')
      router.push('/')
      break
  }
}
</script>

<style scoped>
.header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
}

.logo h1 {
  margin: 0;
  color: var(--primary-color);
  font-size: 24px;
  font-weight: bold;
}

.logo a {
  text-decoration: none;
  color: inherit;
}

.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-item {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: var(--primary-color);
}

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-color);
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-box {
  width: 300px;
}

.action-item {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s;
}

.action-item:hover {
  color: var(--primary-color);
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--text-color);
  transition: color 0.3s;
}

.user-info:hover {
  color: var(--primary-color);
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text-color);
  transition: color 0.3s;
}

.login-btn:hover {
  color: var(--primary-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .nav-menu {
    gap: 15px;
  }
  
  .search-box {
    width: 100%;
    max-width: 300px;
  }
  
  .user-actions {
    gap: 15px;
  }
}
</style> 