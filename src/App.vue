<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'
import { useCartStore } from './stores/cart'
import { useFavoritesStore } from './stores/favorites'

const userStore = useUserStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

onMounted(() => {
  // 从本地存储恢复数据
  userStore.initFromStorage()
  cartStore.initFromStorage()
  favoritesStore.initFromStorage()
})
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}
</style> 