<template>
  <div class="product-card">
    <!-- 产品图片 -->
    <div class="product-image">
      <img :src="product.image" :alt="product.name" @click="handleImageClick">
      <div class="product-tags">
        <el-tag v-if="product.originalPrice > product.price" type="danger" size="small">优惠</el-tag>
        <el-tag v-if="product.rating >= 4.8" type="warning" size="small">推荐</el-tag>
      </div>
    </div>

    <!-- 产品信息 -->
    <div class="product-info">
      <div class="product-category">{{ product.category }}</div>
      <h3 class="product-name" @click="handleNameClick">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      
      <!-- 产品规格 -->
      <div class="product-specs">
        <span class="spec-item">{{ product.specs.driveType }}</span>
        <span class="spec-item">{{ product.specs.range }}</span>
        <span class="spec-item">{{ product.specs.acceleration }}</span>
      </div>

      <!-- 评分和销量 -->
      <div class="product-rating">
        <el-rate v-model="product.rating" disabled show-score text-color="#ff9900" />
        <span class="sold-count">已售 {{ product.sold }} 件</span>
      </div>

      <!-- 产品标签 -->
      <div class="product-tags-list">
        <el-tag 
          v-for="tag in product.tags.slice(0, 3)" 
          :key="tag" 
          size="small" 
          type="info"
        >
          {{ tag }}
        </el-tag>
      </div>

      <!-- 库存信息 -->
      <div class="product-stock">
        <span class="stock-text">库存: {{ product.stock }}件</span>
      </div>

      <!-- 价格信息 -->
      <div class="product-price">
        <span class="current-price">¥{{ formatPrice(product.price) }}</span>
        <span v-if="product.originalPrice > product.price" class="original-price">
          ¥{{ formatPrice(product.originalPrice) }}
        </span>
        <span v-if="product.originalPrice > product.price" class="discount">
          节省: ¥{{ formatPrice(product.originalPrice - product.price) }}
        </span>
      </div>

      <!-- 操作按钮 -->
      <div class="product-actions">
        <el-button 
          type="primary" 
          @click="handleAddToCart"
          :disabled="product.stock === 0"
        >
          <el-icon><ShoppingCart /></el-icon>
          加入购物车
        </el-button>
        
        <el-button 
          :type="isInFavorites ? 'danger' : 'default'"
          @click="handleToggleFavorite"
        >
          <el-icon><Star /></el-icon>
          {{ isInFavorites ? '已收藏' : '收藏' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useFavoritesStore } from '../stores/favorites'
import { ElMessage } from 'element-plus'

// 定义props
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// 定义emits
const emit = defineEmits(['add-to-cart', 'toggle-favorite', 'product-click'])

const router = useRouter()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

// 计算属性
const isInFavorites = computed(() => {
  return favoritesStore.isInFavorites(props.product.id)
})

// 方法
const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0'
  }
  return price.toLocaleString()
}

const handleImageClick = () => {
  emit('product-click', props.product)
  router.push(`/product/${props.product.id}`)
}

const handleNameClick = () => {
  emit('product-click', props.product)
  router.push(`/product/${props.product.id}`)
}

const handleAddToCart = () => {
  if (props.product.stock === 0) {
    ElMessage.warning('该商品库存不足')
    return
  }
  
  cartStore.addToCart(props.product)
  emit('add-to-cart', props.product)
  ElMessage.success('已添加到购物车')
}

const handleToggleFavorite = () => {
  if (isInFavorites.value) {
    favoritesStore.removeFromFavorites(props.product.id)
    ElMessage.success('已取消收藏')
  } else {
    favoritesStore.addToFavorites(props.product)
    ElMessage.success('已添加到收藏')
  }
  emit('toggle-favorite', props.product)
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-tags {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 5px;
}

.product-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-category {
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
}

.product-name {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: bold;
  color: var(--text-color);
  cursor: pointer;
  transition: color 0.3s;
}

.product-name:hover {
  color: var(--primary-color);
}

.product-description {
  color: var(--text-color-regular);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
  flex: 1;
}

.product-specs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.spec-item {
  background: #f5f7fa;
  color: var(--text-color-secondary);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.sold-count {
  color: var(--text-color-secondary);
  font-size: 12px;
}

.product-tags-list {
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.product-stock {
  margin-bottom: 15px;
}

.stock-text {
  color: var(--text-color-secondary);
  font-size: 12px;
}

.product-price {
  margin-bottom: 20px;
}

.current-price {
  font-size: 24px;
  font-weight: bold;
  color: #f56c6c;
  margin-right: 10px;
}

.original-price {
  font-size: 14px;
  color: var(--text-color-secondary);
  text-decoration: line-through;
  margin-right: 10px;
}

.discount {
  font-size: 12px;
  color: #67c23a;
  background: #f0f9ff;
  padding: 2px 6px;
  border-radius: 4px;
}

.product-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.product-actions .el-button {
  flex: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .product-info {
    padding: 15px;
  }
  
  .product-name {
    font-size: 16px;
  }
  
  .current-price {
    font-size: 20px;
  }
  
  .product-actions {
    flex-direction: column;
  }
}
</style> 