<template>
  <div class="product-detail-page">
    <Header />
    
    <div class="page-container">
      <div class="container">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/products' }">汽车商城</el-breadcrumb-item>
          <el-breadcrumb-item>{{ product?.category }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ product?.name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <div v-if="product" class="product-detail">
          <!-- 产品基本信息 -->
          <div class="product-main">
            <div class="product-gallery">
              <div class="main-image">
                <img :src="product.image" :alt="product.name">
                <div class="product-tags">
                  <el-tag v-if="product.originalPrice > product.price" type="danger" size="small">优惠</el-tag>
                  <el-tag v-if="product.rating >= 4.8" type="warning" size="small">推荐</el-tag>
                </div>
              </div>
            </div>

            <div class="product-info">
              <h1 class="product-name">{{ product.name }}</h1>
              <p class="product-slogan">{{ product.description }}</p>
              
              <!-- 评分和销量 -->
              <div class="product-rating">
                <el-rate v-model="product.rating" disabled show-score text-color="#ff9900" />
                <span class="sold-count">已售 {{ product.sold }} 件</span>
              </div>

              <!-- 价格信息 -->
              <div class="product-price">
                <div class="current-price">¥{{ formatPrice(product.price) }}</div>
                <div v-if="product.originalPrice > product.price" class="price-info">
                  <span class="original-price">¥{{ formatPrice(product.originalPrice) }}</span>
                  <span class="discount">节省: ¥{{ formatPrice(product.originalPrice - product.price) }}</span>
                </div>
              </div>

              <!-- 库存和数量 -->
              <div class="product-stock">
                <span class="stock-label">库存:</span>
                <span class="stock-count">{{ product.stock }}件</span>
              </div>

              <div class="product-quantity">
                <span class="quantity-label">数量:</span>
                <el-input-number 
                  v-model="quantity" 
                  :min="1" 
                  :max="product.stock"
                  size="large"
                />
              </div>

              <!-- 操作按钮 -->
              <div class="product-actions">
                <el-button 
                  type="primary" 
                  size="large" 
                  @click="handleAddToCart"
                  :disabled="product.stock === 0"
                >
                  <el-icon><ShoppingCart /></el-icon>
                  加入购物车
                </el-button>
                
                <el-button 
                  :type="isInFavorites ? 'danger' : 'default'"
                  size="large"
                  @click="handleToggleFavorite"
                >
                  <el-icon><Star /></el-icon>
                  {{ isInFavorites ? '已收藏' : '收藏' }}
                </el-button>
                
                <el-button size="large" @click="handleShare">
                  <el-icon><Share /></el-icon>
                  分享
                </el-button>
              </div>

              <!-- 产品标签 -->
              <div class="product-features">
                <el-tag 
                  v-for="feature in product.features" 
                  :key="feature" 
                  type="success" 
                  size="large"
                >
                  {{ feature }}
                </el-tag>
              </div>
            </div>
          </div>

          <!-- 产品详细信息 -->
          <div class="product-details">
            <el-tabs v-model="activeTab" class="product-tabs">
              <el-tab-pane label="详细介绍" name="description">
                <div class="tab-content">
                  <h3>产品介绍</h3>
                  <p>{{ product.description }}</p>
                  
                  <h3>基本信息</h3>
                  <el-descriptions :column="2" border>
                    <el-descriptions-item label="车型分类">{{ product.specs.type }}</el-descriptions-item>
                    <el-descriptions-item label="驱动类型">{{ product.specs.driveType }}</el-descriptions-item>
                    <el-descriptions-item label="续航里程">{{ product.specs.range }}</el-descriptions-item>
                    <el-descriptions-item label="百公里加速">{{ product.specs.acceleration }}</el-descriptions-item>
                    <el-descriptions-item label="电池类型">{{ product.specs.battery }}</el-descriptions-item>
                    <el-descriptions-item label="充电技术">{{ product.specs.charging }}</el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="保养指南" name="maintenance">
                <div class="tab-content">
                  <h3>保养周期</h3>
                  <el-timeline>
                    <el-timeline-item timestamp="每1周" placement="top">
                      <h4>日常检查</h4>
                      <p>检查轮胎气压、车身外观、清洁内饰</p>
                    </el-timeline-item>
                    <el-timeline-item timestamp="每1月" placement="top">
                      <h4>月度保养</h4>
                      <p>检查照明系统、清洁充电口、检查雨刷</p>
                    </el-timeline-item>
                    <el-timeline-item timestamp="每6月" placement="top">
                      <h4>半年保养</h4>
                      <p>更换空调滤芯、检查制动系统、软件系统更新</p>
                    </el-timeline-item>
                    <el-timeline-item timestamp="每1年" placement="top">
                      <h4>年度保养</h4>
                      <p>全面系统检查、电池健康检查、专业深度保养</p>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="用户评价" name="reviews">
                <div class="tab-content">
                  <div class="reviews-header">
                    <h3>用户评价</h3>
                    <el-button type="primary" @click="showReviewDialog = true">
                      写评价
                    </el-button>
                  </div>
                  
                  <div class="reviews-list">
                    <div v-for="review in reviews" :key="review.id" class="review-item">
                      <div class="review-header">
                        <div class="reviewer-info">
                          <el-avatar :size="40">{{ review.userName.charAt(0) }}</el-avatar>
                          <div class="reviewer-details">
                            <div class="reviewer-name">{{ review.userName }}</div>
                            <el-rate v-model="review.rating" disabled size="small" />
                          </div>
                        </div>
                        <div class="review-date">{{ review.date }}</div>
                      </div>
                      <div class="review-content">{{ review.content }}</div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="交付说明" name="delivery">
                <div class="tab-content">
                  <h3>交付流程</h3>
                  <el-steps :active="2" direction="vertical">
                    <el-step title="确认订单" description="确认车辆配置和价格" />
                    <el-step title="支付定金" description="支付车辆定金" />
                    <el-step title="车辆准备" description="车辆检测和准备" />
                    <el-step title="交付车辆" description="专业交付服务" />
                    <el-step title="售后服务" description="提供售后保障" />
                  </el-steps>
                  
                  <h3>交付时间</h3>
                  <p>一般情况下，车辆交付时间为订单确认后7-15个工作日，具体时间以实际情况为准。</p>
                  
                  <h3>交付地点</h3>
                  <p>我们提供全国范围内的专业交付服务，包括上门交付和到店自提两种方式。</p>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>

          <!-- 相关推荐 -->
          <div class="related-products">
            <h3>相关推荐</h3>
            <p>您可能还喜欢这些汽车</p>
            
            <div class="related-grid">
              <ProductCard 
                v-for="relatedProduct in relatedProducts" 
                :key="relatedProduct.id" 
                :product="relatedProduct"
                @add-to-cart="handleAddToCart"
                @toggle-favorite="handleToggleFavorite"
                @product-click="handleProductClick"
              />
            </div>
          </div>
        </div>

        <div v-else class="product-not-found">
          <el-empty description="产品不存在" />
        </div>
      </div>
    </div>

    <!-- 评价对话框 -->
    <el-dialog v-model="showReviewDialog" title="写评价" width="500px">
      <el-form :model="reviewForm" label-width="80px">
        <el-form-item label="评分">
          <el-rate v-model="reviewForm.rating" />
        </el-form-item>
        <el-form-item label="评价内容">
          <el-input 
            v-model="reviewForm.content" 
            type="textarea" 
            :rows="4"
            placeholder="请分享您的使用体验..."
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showReviewDialog = false">取消</el-button>
          <el-button type="primary" @click="submitReview">提交评价</el-button>
        </span>
      </template>
    </el-dialog>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useFavoritesStore } from '../stores/favorites'
import { products } from '../data/products'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ProductCard from '../components/ProductCard.vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

// 响应式数据
const quantity = ref(1)
const activeTab = ref('description')
const showReviewDialog = ref(false)
const reviewForm = ref({
  rating: 5,
  content: ''
})

// 模拟评价数据
const reviews = ref([
  {
    id: 1,
    userName: '张先生',
    rating: 5,
    content: '车辆性能非常出色，智能驾驶功能很实用，续航里程也很满意。',
    date: '2024-01-15'
  },
  {
    id: 2,
    userName: '李女士',
    rating: 4,
    content: '外观设计很漂亮，内饰做工精细，整体体验不错。',
    date: '2024-01-10'
  }
])

// 计算属性
const product = computed(() => {
  const productId = parseInt(route.params.id)
  return products.find(p => p.id === productId)
})

const isInFavorites = computed(() => {
  return product.value ? favoritesStore.isInFavorites(product.value.id) : false
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  
  return products
    .filter(p => p.id !== product.value.id && p.category === product.value.category)
    .slice(0, 3)
})

// 方法
const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0'
  }
  return price.toLocaleString()
}

const handleAddToCart = () => {
  if (!product.value) return
  
  if (product.value.stock === 0) {
    ElMessage.warning('该商品库存不足')
    return
  }
  
  cartStore.addToCart(product.value, quantity.value)
  ElMessage.success(`${product.value.name} 已添加到购物车`)
}

const handleToggleFavorite = () => {
  if (!product.value) return
  
  if (isInFavorites.value) {
    favoritesStore.removeFromFavorites(product.value.id)
    ElMessage.success('已取消收藏')
  } else {
    favoritesStore.addToFavorites(product.value)
    ElMessage.success('已添加到收藏')
  }
}

const handleShare = () => {
  ElMessage.info('分享功能开发中...')
}

const handleProductClick = (relatedProduct) => {
  router.push(`/product/${relatedProduct.id}`)
}

const submitReview = () => {
  if (!reviewForm.value.content.trim()) {
    ElMessage.warning('请填写评价内容')
    return
  }
  
  const newReview = {
    id: reviews.value.length + 1,
    userName: '匿名用户',
    rating: reviewForm.value.rating,
    content: reviewForm.value.content,
    date: new Date().toISOString().split('T')[0]
  }
  
  reviews.value.unshift(newReview)
  showReviewDialog.value = false
  reviewForm.value = { rating: 5, content: '' }
  ElMessage.success('评价提交成功')
}

onMounted(() => {
  if (!product.value) {
    ElMessage.error('产品不存在')
    router.push('/products')
  }
})
</script>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background: var(--background-color);
}

.page-container {
  padding: 20px 0;
}

.breadcrumb {
  margin-bottom: 20px;
}

.product-detail {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.product-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
}

.product-gallery {
  position: relative;
}

.main-image {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.product-tags {
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  gap: 8px;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-name {
  font-size: 32px;
  font-weight: bold;
  color: var(--text-color);
  margin: 0;
}

.product-slogan {
  font-size: 16px;
  color: var(--text-color-regular);
  line-height: 1.6;
  margin: 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 15px;
}

.sold-count {
  color: var(--text-color-secondary);
  font-size: 14px;
}

.product-price {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.current-price {
  font-size: 36px;
  font-weight: bold;
  color: #f56c6c;
}

.price-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.original-price {
  font-size: 18px;
  color: var(--text-color-secondary);
  text-decoration: line-through;
}

.discount {
  color: #67c23a;
  font-size: 14px;
  background: #f0f9ff;
  padding: 4px 8px;
  border-radius: 4px;
}

.product-stock,
.product-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stock-label,
.quantity-label {
  color: var(--text-color-regular);
  font-weight: 500;
}

.stock-count {
  color: var(--text-color);
  font-weight: bold;
}

.product-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.product-actions .el-button {
  flex: 1;
  min-width: 120px;
}

.product-features {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.product-details {
  padding: 0 40px 40px;
}

.product-tabs {
  margin-top: 20px;
}

.tab-content {
  padding: 20px 0;
}

.tab-content h3 {
  color: var(--text-color);
  margin-bottom: 15px;
  font-size: 18px;
}

.tab-content p {
  color: var(--text-color-regular);
  line-height: 1.6;
  margin-bottom: 20px;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.reviews-header h3 {
  margin: 0;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-item {
  border: 1px solid var(--border-color-light);
  border-radius: 8px;
  padding: 20px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.reviewer-name {
  font-weight: 500;
  color: var(--text-color);
}

.review-date {
  color: var(--text-color-secondary);
  font-size: 14px;
}

.review-content {
  color: var(--text-color-regular);
  line-height: 1.6;
}

.related-products {
  padding: 40px;
  background: var(--background-color);
  margin-top: 40px;
  border-radius: 12px;
}

.related-products h3 {
  font-size: 24px;
  color: var(--text-color);
  margin-bottom: 10px;
}

.related-products p {
  color: var(--text-color-regular);
  margin-bottom: 30px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.product-not-found {
  background: white;
  border-radius: 12px;
  padding: 60px;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .product-main {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
  
  .product-name {
    font-size: 24px;
  }
  
  .current-price {
    font-size: 28px;
  }
  
  .product-actions {
    flex-direction: column;
  }
  
  .product-details {
    padding: 0 20px 20px;
  }
  
  .related-products {
    padding: 20px;
  }
  
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style> 