import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref(null)
  const token = ref('')

  // 计算属性
  const isLoggedIn = computed(() => !!user.value && !!token.value)

  // 方法
  const login = (userData, userToken) => {
    user.value = userData
    token.value = userToken
    saveToStorage()
  }

  const logout = () => {
    user.value = null
    token.value = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const register = (userData) => {
    // 模拟注册逻辑
    user.value = userData
    token.value = 'mock-token-' + Date.now()
    saveToStorage()
  }

  const saveToStorage = () => {
    if (user.value) {
      localStorage.setItem('user', JSON.stringify(user.value))
    }
    if (token.value) {
      localStorage.setItem('token', token.value)
    }
  }

  const initFromStorage = () => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
    if (savedToken) {
      token.value = savedToken
    }
  }

  return {
    user,
    token,
    isLoggedIn,
    login,
    logout,
    register,
    saveToStorage,
    initFromStorage
  }
}) 