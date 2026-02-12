<template>
  <div class="products-page">
    <Header />
    
    <div class="page-container">
      <div class="container">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>汽车商城</el-breadcrumb-item>
          <el-breadcrumb-item>智能轿车</el-breadcrumb-item>
          <el-breadcrumb-item>{{ currentCategory || '全部' }}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 搜索和筛选区域 -->
        <div class="search-filter-section">
          <div class="search-box">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索智能汽车品牌、车型、配置"
              @keyup.enter="handleSearch"
              clearable
              size="large"
            >
              <template #append>
                <el-button @click="handleSearch" type="primary">
                  <el-icon><Search /></el-icon>
                  搜索
                </el-button>
              </template>
            </el-input>
          </div>

          <!-- 分类筛选 -->
          <div class="category-filters">
            <el-button
              v-for="category in categories"
              :key="category.id"
              :type="selectedCategory === category.id ? 'primary' : 'default'"
              @click="handleCategoryFilter(category.id)"
              size="large"
            >
              {{ category.name }}
              <el-badge :value="category.count" class="category-badge" />
            </el-button>
          </div>

          <!-- 排序和视图 -->
          <div class="sort-view-controls">
            <div class="sort-controls">
              <span class="sort-label">排序：</span>
              <el-select v-model="sortBy" @change="handleSort" placeholder="选择排序方式">
                <el-option label="默认排序" value="default" />
                <el-option label="价格从低到高" value="price-asc" />
                <el-option label="价格从高到低" value="price-desc" />
                <el-option label="评分从高到低" value="rating-desc" />
                <el-option label="销量从高到低" value="sold-desc" />
              </el-select>
            </div>

            <div class="view-controls">
              <el-button-group>
                <el-button 
                  :type="viewMode === 'grid' ? 'primary' : 'default'"
                  @click="viewMode = 'grid'"
                >
                  <el-icon><Grid /></el-icon>
                </el-button>
                <el-button 
                  :type="viewMode === 'list' ? 'primary' : 'default'"
                  @click="viewMode = 'list'"
                >
                  <el-icon><List /></el-icon>
                </el-button>
              </el-button-group>
            </div>
          </div>

          <!-- 结果统计 -->
          <div class="results-info">
            <span>共找到 {{ filteredProducts.length }} 个产品</span>
            <span v-if="selectedCategory !== 'all'">当前分类：{{ getCategoryName(selectedCategory) }}</span>
          </div>
        </div>

        <!-- 产品列表 -->
        <div class="products-section">
          <div v-if="filteredProducts.length === 0" class="no-results">
            <el-empty description="没有找到相关产品" />
          </div>
          
          <div v-else :class="['products-container', `view-${viewMode}`]">
            <ProductCard 
              v-for="product in paginatedProducts" 
              :key="product.id" 
              :product="product"
              @add-to-cart="handleAddToCart"
              @toggle-favorite="handleToggleFavorite"
              @product-click="handleProductClick"
            />
          </div>

          <!-- 分页 -->
          <div v-if="filteredProducts.length > pageSize" class="pagination-wrapper">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[6, 12, 24, 48]"
              :total="filteredProducts.length"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useFavoritesStore } from '../stores/favorites'
import { products, categories } from '../data/products'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ProductCard from '../components/ProductCard.vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

// 响应式数据
const searchKeyword = ref('')
const selectedCategory = ref('all')
const sortBy = ref('default')
const viewMode = ref('grid')
const currentPage = ref(1)
const pageSize = ref(6)
const isInitialized = ref(false)

// 计算属性
const currentCategory = computed(() => {
  return getCategoryName(selectedCategory.value)
})

const filteredProducts = computed(() => {
  let result = products

  // 分类筛选
if (selectedCategory.value !== 'all') {
  const categoryName = getCategoryName(selectedCategory.value)
  result = result.filter(product => product.category === categoryName)
}

  // 搜索筛选
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(product => 
      product.name.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.tags.some(tag => tag.toLowerCase().includes(keyword))
    )
  }

  // 排序
  switch (sortBy.value) {
    case 'price-asc':
      result = [...result].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result = [...result].sort((a, b) => b.price - a.price)
      break
    case 'rating-desc':
      result = [...result].sort((a, b) => b.rating - a.rating)
      break
    case 'sold-desc':
      result = [...result].sort((a, b) => b.sold - a.sold)
      break
    default:
      // 默认排序
      break
  }

  return result
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredProducts.value.slice(start, end)
})

// 方法
const getCategoryName = (categoryId) => {
  if (categoryId === 'all') return '全部'
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : '全部'
}

const handleSearch = () => {
  currentPage.value = 1
  // 更新URL参数
  updateUrlParams()
}

const handleCategoryFilter = (categoryId) => {
  selectedCategory.value = categoryId
  currentPage.value = 1
  updateUrlParams()
}

const handleSort = () => {
  currentPage.value = 1
}

const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleCurrentChange = (page) => {
  currentPage.value = page
}

const handleAddToCart = (product) => {
  ElMessage.success(`${product.name} 已添加到购物车`)
}

const handleToggleFavorite = (product) => {
  // 消息已在组件内处理
}

const handleProductClick = (product) => {
  router.push(`/product/${product.id}`)
}

const updateUrlParams = () => {
  const params = {}
  if (searchKeyword.value) params.search = searchKeyword.value
  if (selectedCategory.value !== 'all') params.category = selectedCategory.value
  if (sortBy.value !== 'default') params.sort = sortBy.value
  
  router.push({
    path: route.path,
    query: params
  })
}

// 监听路由参数变化
watch(() => route.query, (query) => {
  if (query.search) searchKeyword.value = query.search
  if (query.category) selectedCategory.value = query.category
  if (query.sort) sortBy.value = query.sort
}, { immediate: true })

// 监听筛选条件变化
watch([searchKeyword, selectedCategory, sortBy], () => {
  // 避免在初始化时触发URL更新
  if (isInitialized.value) {
    updateUrlParams()
  }
})

onMounted(() => {
  // 从URL参数初始化
  const { search, category, sort } = route.query
  if (search) searchKeyword.value = search
  if (category) selectedCategory.value = category
  if (sort) sortBy.value = sort
  
  // 标记为已初始化
  isInitialized.value = true
})
</script>

<style scoped>
.products-page {
  min-height: 100vh;
  background: var(--background-color);
}

.page-container {
  padding: 20px 0;
}

.breadcrumb {
  margin-bottom: 20px;
}

.search-filter-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.search-box {
  margin-bottom: 20px;
}

.category-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.category-badge {
  margin-left: 5px;
}

.sort-view-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-label {
  color: var(--text-color-regular);
  font-weight: 500;
}

.results-info {
  display: flex;
  gap: 20px;
  color: var(--text-color-secondary);
  font-size: 14px;
}

.products-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.no-results {
  text-align: center;
  padding: 60px 0;
}

.products-container {
  margin-bottom: 30px;
}

.products-container.view-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.products-container.view-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-filter-section {
    padding: 20px;
  }
  
  .category-filters {
    justify-content: center;
  }
  
  .sort-view-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .sort-controls {
    justify-content: center;
  }
  
  .results-info {
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
  
  .products-section {
    padding: 20px;
  }
  
  .products-container.view-grid {
    grid-template-columns: 1fr;
  }
}
</style> 