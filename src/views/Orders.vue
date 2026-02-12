<template>
  <div class="orders-page">
    <Header />

    <div class="page-container">
      <div class="container">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/profile' }">个人中心</el-breadcrumb-item>
          <el-breadcrumb-item>我的订单</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="orders-content">
          <!-- 订单标题 -->
          <div class="orders-header">
            <h1>
              <el-icon><Document /></el-icon>
              我的订单
            </h1>
            <p>查看和管理您的所有订单</p>
          </div>

          <!-- 订单筛选 -->
          <div class="orders-filter">
            <div class="filter-tabs">
              <el-button
                v-for="tab in orderTabs"
                :key="tab.value"
                :type="activeTab === tab.value ? 'primary' : 'default'"
                @click="activeTab = tab.value"
              >
                {{ tab.label }}
                <el-badge v-if="tab.count > 0" :value="tab.count" class="tab-badge" />
              </el-button>
            </div>

            <div class="filter-actions">
              <el-input
                v-model="searchKeyword"
                placeholder="搜索订单号或商品名称"
                style="width: 300px"
                clearable
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
            </div>
          </div>

          <!-- 订单列表 -->
          <div class="orders-list">
            <div v-if="filteredOrders.length === 0" class="empty-orders">
              <el-empty description="暂无订单">
                <el-button type="primary" @click="$router.push('/products')">
                  去购物
                </el-button>
              </el-empty>
            </div>

            <div v-else class="order-items">
              <div
                v-for="order in filteredOrders"
                :key="order.id"
                class="order-item"
              >
                <!-- 订单头部 -->
                <div class="order-header">
                  <div class="order-info">
                    <span class="order-number">订单号: {{ order.id }}</span>
                    <span class="order-time">{{ formatDate(order.createTime) }}</span>
                  </div>
                  <div class="order-status">
                    <el-tag :type="getStatusType(order.status)">
                      {{ getStatusText(order.status) }}
                    </el-tag>
                  </div>
                </div>

                <!-- 订单商品 -->
                <div class="order-products">
                  <div
                    v-for="item in order.items"
                    :key="item.id"
                    class="product-item"
                  >
                    <div class="product-image">
                      <img :src="item.image" :alt="item.name">
                    </div>
                    <div class="product-info">
                      <h3 class="product-name">{{ item.name }}</h3>
                      <p class="product-desc">{{ item.description }}</p>
                      <div class="product-specs">
                        <span class="spec-item">{{ item.specs.driveType }}</span>
                        <span class="spec-item">{{ item.specs.range }}</span>
                        <span class="spec-item">{{ item.specs.acceleration }}</span>
                      </div>
                    </div>
                    <div class="product-quantity">
                      <span>数量: {{ item.quantity }}</span>
                    </div>
                    <div class="product-price">
                      <div class="current-price">¥{{ formatPrice(item.price) }}</div>
                      <div v-if="item.originalPrice > item.price" class="original-price">
                        ¥{{ formatPrice(item.originalPrice) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 订单汇总 -->
                <div class="order-summary">
                  <div class="summary-info">
                    <div class="summary-item">
                      <span>商品总价:</span>
                      <span>¥{{ formatPrice(order.totalPrice) }}</span>
                    </div>
                    <div class="summary-item">
                      <span>运费:</span>
                      <span>免运费</span>
                    </div>
                    <div class="summary-item">
                      <span>优惠:</span>
                      <span>-¥{{ formatPrice(order.discount) }}</span>
                    </div>
                    <div class="summary-item total">
                      <span>实付金额:</span>
                      <span class="final-price">¥{{ formatPrice(order.finalPrice) }}</span>
                    </div>
                  </div>

                  <div class="order-actions">
                    <el-button
                      v-if="order.status === 'pending'"
                      type="primary"
                      @click="handlePay(order)"
                    >
                      立即付款
                    </el-button>
                    <el-button
                      v-if="order.status === 'shipped'"
                      type="success"
                      @click="handleConfirmReceive(order)"
                    >
                      确认收货
                    </el-button>
                    <el-button
                      v-if="order.status === 'completed'"
                      @click="handleReview(order)"
                    >
                      评价
                    </el-button>
                    <el-button
                      v-if="order.status === 'pending'"
                      @click="handleCancel(order)"
                    >
                      取消订单
                    </el-button>
                    <el-button @click="handleViewDetail(order)">
                      查看详情
                    </el-button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分页 -->
            <div v-if="filteredOrders.length > pageSize" class="pagination-wrapper">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20]"
                :total="filteredOrders.length"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 订单详情对话框 -->
    <el-dialog v-model="showDetailDialog" title="订单详情" width="600px">
      <div v-if="selectedOrder" class="order-detail">
        <div class="detail-section">
          <h3>订单信息</h3>
          <div class="detail-item">
            <span class="label">订单号:</span>
            <span>{{ selectedOrder.id }}</span>
          </div>
          <div class="detail-item">
            <span class="label">下单时间:</span>
            <span>{{ formatDate(selectedOrder.createTime) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">订单状态:</span>
            <el-tag :type="getStatusType(selectedOrder.status)">
              {{ getStatusText(selectedOrder.status) }}
            </el-tag>
          </div>
        </div>

        <div class="detail-section">
          <h3>收货信息</h3>
          <div class="detail-item">
            <span class="label">收货人:</span>
            <span>{{ selectedOrder.address.name }}</span>
          </div>
          <div class="detail-item">
            <span class="label">联系电话:</span>
            <span>{{ selectedOrder.address.phone }}</span>
          </div>
          <div class="detail-item">
            <span class="label">收货地址:</span>
            <span>{{ selectedOrder.address.province }} {{ selectedOrder.address.city }} {{ selectedOrder.address.district }} {{ selectedOrder.address.detail }}</span>
          </div>
        </div>

        <div class="detail-section">
          <h3>支付信息</h3>
          <div class="detail-item">
            <span class="label">支付方式:</span>
            <span>{{ getPaymentText(selectedOrder.payment) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">订单备注:</span>
            <span>{{ selectedOrder.note || '无' }}</span>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 评价对话框 -->
    <el-dialog v-model="showReviewDialog" title="商品评价" width="500px">
      <el-form
        ref="reviewFormRef"
        :model="reviewForm"
        :rules="reviewRules"
        label-width="80px"
      >
        <el-form-item label="评分" prop="rating">
          <el-rate v-model="reviewForm.rating" />
        </el-form-item>
        <el-form-item label="评价内容" prop="content">
          <el-input
            v-model="reviewForm.content"
            type="textarea"
            :rows="4"
            placeholder="请分享您的使用体验..."
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showReviewDialog = false">取消</el-button>
        <el-button type="primary" @click="submitReview">提交评价</el-button>
      </template>
    </el-dialog>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()

// 响应式数据
const searchKeyword = ref('')
const activeTab = ref('all')
const currentPage = ref(1)
const pageSize = ref(10)
const showDetailDialog = ref(false)
const showReviewDialog = ref(false)
const selectedOrder = ref(null)

// 评价表单
const reviewFormRef = ref()
const reviewForm = ref({
  rating: 5,
  content: ''
})

const reviewRules = {
  rating: [
    { required: true, message: '请选择评分', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入评价内容', trigger: 'blur' },
    { min: 10, message: '评价内容至少10个字符', trigger: 'blur' }
  ]
}

// 订单状态标签
const orderTabs = [
  { label: '全部', value: 'all', count: 0 },
  { label: '待付款', value: 'pending', count: 0 },
  { label: '待发货', value: 'paid', count: 0 },
  { label: '待收货', value: 'shipped', count: 0 },
  { label: '已完成', value: 'completed', count: 0 },
  { label: '已取消', value: 'cancelled', count: 0 }
]

// 模拟订单数据
const orders = ref([
  {
    id: 'ORDER20240818001',
    items: [
      {
        id: 1,
        name: '小米SU7 Ultra',
        description: '极致性能版本,赛道级性能表现,百公里加速仅需1.97秒',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
        price: 799999,
        originalPrice: 829999,
        quantity: 1,
        specs: {
          driveType: '纯电动',
          range: '630公里',
          acceleration: '1.97秒'
        }
      }
    ],
    address: {
      name: '张三',
      phone: '13800138000',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      detail: '智车大厦A座15层'
    },
    payment: 'alipay',
    note: '请尽快发货',
    totalPrice: 799999,
    discount: 50000,
    finalPrice: 749999,
    status: 'pending',
    createTime: '2024-08-18T10:30:00Z'
  },
  {
    id: 'ORDER20240817001',
    items: [
      {
        id: 2,
        name: '比亚迪汉EV',
        description: '刀片电池技术，安全可靠，智能驾驶辅助系统',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
        price: 239800,
        originalPrice: 259800,
        quantity: 1,
        specs: {
          driveType: '纯电动',
          range: '605公里',
          acceleration: '3.9秒'
        }
      }
    ],
    address: {
      name: '李四',
      phone: '13900139000',
      province: '上海市',
      city: '上海市',
      district: '浦东新区',
      detail: '陆家嘴金融中心'
    },
    payment: 'wechat',
    note: '',
    totalPrice: 239800,
    discount: 20000,
    finalPrice: 219800,
    status: 'completed',
    createTime: '2024-08-17T15:20:00Z'
  },
  {
    id: 'ORDER20240816001',
    items: [
      {
        id: 3,
        name: '理想L9',
        description: '增程式电动SUV，大六座设计，家庭出行首选',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
        price: 459800,
        originalPrice: 479800,
        quantity: 1,
        specs: {
          driveType: '增程式',
          range: '1100公里',
          acceleration: '5.3秒'
        }
      }
    ],
    address: {
      name: '王五',
      phone: '13700137000',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: '科技园'
    },
    payment: 'bank',
    note: '周末送货',
    totalPrice: 459800,
    discount: 0,
    finalPrice: 459800,
    status: 'shipped',
    createTime: '2024-08-16T09:15:00Z'
  }
])

// 计算属性
const filteredOrders = computed(() => {
  let result = orders.value

  // 状态筛选
  if (activeTab.value !== 'all') {
    result = result.filter(order => order.status === activeTab.value)
  }

  // 搜索筛选
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(order => 
      order.id.toLowerCase().includes(keyword) ||
      order.items.some(item => 
        item.name.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword)
      )
    )
  }

  return result
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredOrders.value.slice(start, end)
})

// 更新订单状态计数
const updateOrderCounts = () => {
  orderTabs.forEach(tab => {
    if (tab.value === 'all') {
      tab.count = orders.value.length
    } else {
      tab.count = orders.value.filter(order => order.status === tab.value).length
    }
  })
}

// 方法
const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0'
  }
  return price.toLocaleString()
}

const formatDate = (dateString) => {
  if (!dateString) return '未知'
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN')
}

const getStatusType = (status) => {
  const statusMap = {
    pending: 'warning',
    paid: 'info',
    shipped: 'primary',
    completed: 'success',
    cancelled: 'info'
  }
  return statusMap[status] || 'info'
}

const getStatusText = (status) => {
  const statusMap = {
    pending: '待付款',
    paid: '待发货',
    shipped: '待收货',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || '未知'
}

const getPaymentText = (payment) => {
  const paymentMap = {
    alipay: '支付宝',
    wechat: '微信支付',
    bank: '银行转账'
  }
  return paymentMap[payment] || '未知'
}

const handlePay = async (order) => {
  try {
    await ElMessageBox.confirm('确定要支付这个订单吗？', '确认支付', {
      confirmButtonText: '确认支付',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    // 模拟支付过程
    ElMessage.success('支付成功！')
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新订单状态
    order.status = 'paid'
  } catch {
    // 用户取消
  }
}

const handleConfirmReceive = async (order) => {
  try {
    await ElMessageBox.confirm('确认已收到商品吗？', '确认收货', {
      confirmButtonText: '确认收货',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    // 更新订单状态
    order.status = 'completed'
    ElMessage.success('确认收货成功！')
  } catch {
    // 用户取消
  }
}

const handleCancel = async (order) => {
  try {
    await ElMessageBox.confirm('确定要取消这个订单吗？', '取消订单', {
      confirmButtonText: '确定取消',
      cancelButtonText: '保留订单',
      type: 'warning'
    })
    
    // 更新订单状态
    order.status = 'cancelled'
    ElMessage.success('订单已取消')
  } catch {
    // 用户取消
  }
}

const handleViewDetail = (order) => {
  selectedOrder.value = order
  showDetailDialog.value = true
}

const handleReview = (order) => {
  selectedOrder.value = order
  showReviewDialog.value = true
}

const submitReview = async () => {
  if (!reviewFormRef.value) return

  try {
    await reviewFormRef.value.validate()
    
    // 模拟提交评价
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showReviewDialog.value = false
    reviewForm.value = {
      rating: 5,
      content: ''
    }
    ElMessage.success('评价提交成功！')
  } catch (error) {
    console.error('提交评价失败:', error)
  }
}

const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleCurrentChange = (page) => {
  currentPage.value = page
}

onMounted(() => {
  // 从路由参数初始化状态筛选
  const status = route.query.status
  if (status) {
    activeTab.value = status
  }
  
  // 更新订单计数
  updateOrderCounts()
})
</script>

<style scoped>
.orders-page {
  min-height: 100vh;
  background: var(--background-color);
}

.page-container {
  padding: 20px 0;
}

.breadcrumb {
  margin-bottom: 20px;
}

.orders-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.orders-header {
  text-align: center;
  margin-bottom: 20px;
}

.orders-header h1 {
  font-size: 32px;
  color: var(--text-color);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.orders-header p {
  color: var(--text-color-secondary);
  font-size: 16px;
}

.orders-filter {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.filter-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tab-badge {
  margin-left: 5px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.empty-orders {
  background: white;
  border-radius: 12px;
  padding: 60px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.order-header {
  padding: 20px 30px;
  border-bottom: 1px solid var(--border-color-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--background-color);
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.order-number {
  font-weight: bold;
  color: var(--text-color);
}

.order-time {
  font-size: 14px;
  color: var(--text-color-secondary);
}

.order-products {
  padding: 30px;
}

.product-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: 20px;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid var(--border-color-light);
}

.product-item:last-child {
  border-bottom: none;
}

.product-image img {
  width: 100px;
  height: 75px;
  object-fit: cover;
  border-radius: 8px;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 5px;
}

.product-desc {
  color: var(--text-color-secondary);
  font-size: 14px;
  margin-bottom: 8px;
}

.product-specs {
  display: flex;
  gap: 8px;
}

.spec-item {
  background: var(--background-color);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: var(--text-color-regular);
}

.product-quantity {
  color: var(--text-color-secondary);
  font-size: 14px;
}

.current-price {
  font-size: 16px;
  font-weight: bold;
  color: var(--danger-color);
}

.original-price {
  font-size: 14px;
  color: var(--text-color-secondary);
  text-decoration: line-through;
}

.order-summary {
  padding: 30px;
  background: var(--background-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.summary-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.summary-item.total {
  font-size: 16px;
  font-weight: bold;
  border-top: 1px solid var(--border-color-light);
  padding-top: 10px;
  margin-top: 10px;
}

.final-price {
  color: var(--danger-color);
  font-size: 18px;
}

.order-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

/* 订单详情样式 */
.order-detail {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.detail-section h3 {
  font-size: 16px;
  color: var(--text-color);
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color-light);
}

.detail-item {
  display: flex;
  margin-bottom: 10px;
}

.detail-item .label {
  font-weight: bold;
  color: var(--text-color);
  min-width: 100px;
}

@media (max-width: 768px) {
  .orders-filter {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-tabs {
    justify-content: center;
  }
  
  .product-item {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .product-image {
    justify-self: center;
  }
  
  .order-summary {
    flex-direction: column;
    align-items: stretch;
  }
  
  .order-actions {
    justify-content: center;
  }
}
</style> 