import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // 状态
  const cartItems = ref([])

  // 计算属性
  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })

  const selectedItems = computed(() => {
    return cartItems.value.filter(item => item.selected)
  })

  const selectedTotalPrice = computed(() => {
    return selectedItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })

  // 方法
  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({
        ...product,
        quantity,
        selected: true
      })
    }
    saveToStorage()
  }

  const removeFromCart = (productId) => {
    const index = cartItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
      saveToStorage()
    }
  }

  const updateQuantity = (productId, quantity) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
      saveToStorage()
    }
  }

  const toggleSelection = (productId) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      item.selected = !item.selected
      saveToStorage()
    }
  }

  const selectAll = () => {
    cartItems.value.forEach(item => {
      item.selected = true
    })
    saveToStorage()
  }

  const unselectAll = () => {
    cartItems.value.forEach(item => {
      item.selected = false
    })
    saveToStorage()
  }

  const removeSelected = () => {
    cartItems.value = cartItems.value.filter(item => !item.selected)
    saveToStorage()
  }

  const clearCart = () => {
    cartItems.value = []
    saveToStorage()
  }

  const saveToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  const initFromStorage = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      cartItems.value = JSON.parse(savedCart)
    }
  }

  return {
    cartItems,
    totalItems,
    totalPrice,
    selectedItems,
    selectedTotalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleSelection,
    selectAll,
    unselectAll,
    removeSelected,
    clearCart,
    saveToStorage,
    initFromStorage
  }
}) 