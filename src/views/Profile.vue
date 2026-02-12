<template>
  <div class="profile-page">
    <Header />

    <div class="page-container">
      <div class="container">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="profile-content">
          <!-- 个人信息卡片 -->
          <div class="profile-card">
            <div class="profile-header">
              <div class="avatar-section">
                <el-avatar :size="80" :src="userStore.user?.avatar">
                  <el-icon size="40"><User /></el-icon>
                </el-avatar>
                <div class="user-info">
                  <h2>{{ userStore.user?.username || '智能汽车爱好者' }}</h2>
                  <p>{{ userStore.user?.email || 'user@example.com' }}</p>
                  <p>注册时间: {{ formatDate(userStore.user?.createTime) }}</p>
                </div>
              </div>
              <div class="profile-actions">
                <el-button type="primary" @click="showEditDialog = true">
                  <el-icon><Edit /></el-icon>
                  编辑资料
                </el-button>
              </div>
            </div>
          </div>

          <!-- 统计信息 -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <el-icon size="30"><ShoppingCart /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ orderCount }}</div>
                <div class="stat-label">我的订单</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <el-icon size="30"><Star /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ favoritesStore.totalFavorites }}</div>
                <div class="stat-label">我的收藏</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <el-icon size="30"><Location /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ addressCount }}</div>
                <div class="stat-label">收货地址</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <el-icon size="30"><Trophy /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ points }}</div>
                <div class="stat-label">积分余额</div>
              </div>
            </div>
          </div>

          <!-- 功能导航 -->
          <div class="function-grid">
            <div class="function-section">
              <h3>订单管理</h3>
              <div class="function-list">
                <div class="function-item" @click="$router.push('/orders')">
                  <el-icon size="24"><Document /></el-icon>
                  <span>我的订单</span>
                  <el-icon><ArrowRight /></el-icon>
                </div>
                <div class="function-item" @click="$router.push('/orders?status=pending')">
                  <el-icon size="24"><Clock /></el-icon>
                  <span>待付款</span>
                  <el-badge :value="pendingCount" class="badge" />
                </div>
                <div class="function-item" @click="$router.push('/orders?status=shipped')">
                  <el-icon size="24"><Van /></el-icon>
                  <span>待收货</span>
                  <el-badge :value="shippedCount" class="badge" />
                </div>
                <div class="function-item" @click="$router.push('/orders?status=completed')">
                  <el-icon size="24"><CircleCheck /></el-icon>
                  <span>已完成</span>
                </div>
              </div>
            </div>

            <div class="function-section">
              <h3>账户管理</h3>
              <div class="function-list">
                <div class="function-item" @click="showAddressDialog = true">
                  <el-icon size="24"><Location /></el-icon>
                  <span>收货地址</span>
                  <el-icon><ArrowRight /></el-icon>
                </div>
                <div class="function-item" @click="showPasswordDialog = true">
                  <el-icon size="24"><Lock /></el-icon>
                  <span>修改密码</span>
                  <el-icon><ArrowRight /></el-icon>
                </div>
                <div class="function-item" @click="showPointsDialog = true">
                  <el-icon size="24"><Trophy /></el-icon>
                  <span>积分明细</span>
                  <el-icon><ArrowRight /></el-icon>
                </div>
                <div class="function-item" @click="showCouponsDialog = true">
                  <el-icon size="24"><Ticket /></el-icon>
                  <span>优惠券</span>
                  <el-badge :value="couponCount" class="badge" />
                </div>
              </div>
            </div>

            <div class="function-section">
              <h3>客户服务</h3>
              <div class="function-list">
                <div class="function-item" @click="$router.push('/contact')">
                  <el-icon size="24"><Service /></el-icon>
                  <span>联系客服</span>
                  <el-icon><ArrowRight /></el-icon>
                </div>
                <div class="function-item" @click="showFeedbackDialog = true">
                  <el-icon size="24"><ChatDotRound /></el-icon>
                  <span>意见反馈</span>
                  <el-icon><ArrowRight /></el-icon>
                </div>
                <div class="function-item" @click="$router.push('/guide')">
                  <el-icon size="24"><Document /></el-icon>
                  <span>使用指南</span>
                  <el-icon><ArrowRight /></el-icon>
                </div>
                <div class="function-item" @click="$router.push('/maintenance')">
                  <el-icon size="24"><Tools /></el-icon>
                  <span>保养指南</span>
                  <el-icon><ArrowRight /></el-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑资料对话框 -->
    <el-dialog v-model="showEditDialog" title="编辑个人资料" width="500px">
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="editForm.avatar" :src="editForm.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="saveProfile">保存</el-button>
      </template>
    </el-dialog>

    <!-- 收货地址对话框 -->
    <el-dialog v-model="showAddressDialog" title="收货地址管理" width="600px">
      <div class="address-management">
        <div class="address-list">
          <div
            v-for="address in addresses"
            :key="address.id"
            class="address-item"
          >
            <div class="address-info">
              <div class="address-header">
                <span class="name">{{ address.name }}</span>
                <span class="phone">{{ address.phone }}</span>
                <el-tag v-if="address.isDefault" type="success" size="small">默认</el-tag>
              </div>
              <div class="address-detail">
                {{ address.province }} {{ address.city }} {{ address.district }} {{ address.detail }}
              </div>
            </div>
            <div class="address-actions">
              <el-button type="text" @click="editAddress(address)">编辑</el-button>
              <el-button type="text" @click="deleteAddress(address.id)">删除</el-button>
            </div>
          </div>
        </div>
        <el-button type="primary" @click="addNewAddress">
          <el-icon><Plus /></el-icon>
          添加新地址
        </el-button>
      </div>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog v-model="showPasswordDialog" title="修改密码" width="400px">
      <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="100px"
      >
        <el-form-item label="当前密码" prop="oldPassword">
          <el-input
            v-model="passwordForm.oldPassword"
            type="password"
            placeholder="请输入当前密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="请确认新密码"
            show-password
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="changePassword">确认修改</el-button>
      </template>
    </el-dialog>

    <!-- 积分明细对话框 -->
    <el-dialog v-model="showPointsDialog" title="积分明细" width="600px">
      <div class="points-history">
        <div
          v-for="record in pointsHistory"
          :key="record.id"
          class="points-record"
        >
          <div class="record-info">
            <div class="record-title">{{ record.title }}</div>
            <div class="record-time">{{ formatDate(record.time) }}</div>
          </div>
          <div class="record-points" :class="{ 'positive': record.points > 0, 'negative': record.points < 0 }">
            {{ record.points > 0 ? '+' : '' }}{{ record.points }}
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 优惠券对话框 -->
    <el-dialog v-model="showCouponsDialog" title="我的优惠券" width="600px">
      <div class="coupons-list">
        <div
          v-for="coupon in coupons"
          :key="coupon.id"
          class="coupon-item"
          :class="{ 'expired': coupon.isExpired }"
        >
          <div class="coupon-amount">
            <span class="amount">¥{{ coupon.amount }}</span>
            <span class="condition">满{{ coupon.condition }}可用</span>
          </div>
          <div class="coupon-info">
            <div class="coupon-title">{{ coupon.title }}</div>
            <div class="coupon-date">有效期至: {{ formatDate(coupon.expireDate) }}</div>
          </div>
          <div class="coupon-status">
            <el-tag :type="coupon.isExpired ? 'info' : 'success'">
              {{ coupon.isExpired ? '已过期' : '可使用' }}
            </el-tag>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 意见反馈对话框 -->
    <el-dialog v-model="showFeedbackDialog" title="意见反馈" width="500px">
      <el-form
        ref="feedbackFormRef"
        :model="feedbackForm"
        :rules="feedbackRules"
        label-width="80px"
      >
        <el-form-item label="反馈类型" prop="type">
          <el-select v-model="feedbackForm.type" placeholder="请选择反馈类型" style="width: 100%">
            <el-option label="功能建议" value="suggestion" />
            <el-option label="问题反馈" value="bug" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="反馈内容" prop="content">
          <el-input
            v-model="feedbackForm.content"
            type="textarea"
            :rows="4"
            placeholder="请详细描述您的建议或遇到的问题..."
          />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="feedbackForm.contact" placeholder="请留下您的联系方式（选填）" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showFeedbackDialog = false">取消</el-button>
        <el-button type="primary" @click="submitFeedback">提交反馈</el-button>
      </template>
    </el-dialog>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useFavoritesStore } from '../stores/favorites'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const userStore = useUserStore()
const favoritesStore = useFavoritesStore()

// 响应式数据
const showEditDialog = ref(false)
const showAddressDialog = ref(false)
const showPasswordDialog = ref(false)
const showPointsDialog = ref(false)
const showCouponsDialog = ref(false)
const showFeedbackDialog = ref(false)

// 编辑表单
const editFormRef = ref()
const editForm = ref({
  username: '',
  email: '',
  phone: '',
  avatar: ''
})

// 编辑表单验证规则
const editRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ]
}

// 密码表单
const passwordFormRef = ref()
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 密码表单验证规则
const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 反馈表单
const feedbackFormRef = ref()
const feedbackForm = ref({
  type: '',
  content: '',
  contact: ''
})

// 反馈表单验证规则
const feedbackRules = {
  type: [
    { required: true, message: '请选择反馈类型', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入反馈内容', trigger: 'blur' },
    { min: 10, message: '反馈内容至少10个字符', trigger: 'blur' }
  ]
}

// 模拟数据
const orderCount = ref(5)
const addressCount = ref(3)
const points = ref(2580)
const pendingCount = ref(1)
const shippedCount = ref(2)
const couponCount = ref(3)

// 收货地址
const addresses = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '智车大厦A座15层',
    isDefault: true
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    detail: '陆家嘴金融中心',
    isDefault: false
  }
])

// 积分历史
const pointsHistory = ref([
  {
    id: 1,
    title: '购物获得积分',
    points: 500,
    time: '2024-08-18T10:30:00Z'
  },
  {
    id: 2,
    title: '签到获得积分',
    points: 10,
    time: '2024-08-18T09:00:00Z'
  },
  {
    id: 3,
    title: '使用积分抵扣',
    points: -200,
    time: '2024-08-17T15:20:00Z'
  }
])

// 优惠券
const coupons = ref([
  {
    id: 1,
    title: '新用户专享券',
    amount: 5000,
    condition: 50000,
    expireDate: '2024-09-30T23:59:59Z',
    isExpired: false
  },
  {
    id: 2,
    title: '满减优惠券',
    amount: 10000,
    condition: 100000,
    expireDate: '2024-08-25T23:59:59Z',
    isExpired: false
  },
  {
    id: 3,
    title: '限时优惠券',
    amount: 3000,
    condition: 30000,
    expireDate: '2024-08-15T23:59:59Z',
    isExpired: true
  }
])

// 方法
const formatDate = (dateString) => {
  if (!dateString) return '未知'
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }

  if (isJPG && isLt2M) {
    // 模拟上传，实际项目中应该上传到服务器
    const reader = new FileReader()
    reader.onload = (e) => {
      editForm.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }

  return false // 阻止自动上传
}

const saveProfile = async () => {
  if (!editFormRef.value) return

  try {
    await editFormRef.value.validate()
    
    // 模拟保存
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新用户信息
    if (userStore.user) {
      userStore.user = { ...userStore.user, ...editForm.value }
      userStore.saveToStorage()
    }
    
    showEditDialog.value = false
    ElMessage.success('个人资料已更新')
  } catch (error) {
    console.error('保存失败:', error)
  }
}

const editAddress = (address) => {
  // 这里可以实现编辑地址的逻辑
  ElMessage.info('编辑地址功能开发中...')
}

const deleteAddress = async (addressId) => {
  try {
    await ElMessageBox.confirm('确定要删除这个地址吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const index = addresses.value.findIndex(addr => addr.id === addressId)
    if (index > -1) {
      addresses.value.splice(index, 1)
      addressCount.value--
      ElMessage.success('地址已删除')
    }
  } catch {
    // 用户取消
  }
}

const addNewAddress = () => {
  ElMessage.info('添加地址功能开发中...')
}

const changePassword = async () => {
  if (!passwordFormRef.value) return

  try {
    await passwordFormRef.value.validate()
    
    // 模拟修改密码
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showPasswordDialog.value = false
    passwordForm.value = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    ElMessage.success('密码修改成功')
  } catch (error) {
    console.error('修改密码失败:', error)
  }
}

const submitFeedback = async () => {
  if (!feedbackFormRef.value) return

  try {
    await feedbackFormRef.value.validate()
    
    // 模拟提交反馈
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showFeedbackDialog.value = false
    feedbackForm.value = {
      type: '',
      content: '',
      contact: ''
    }
    ElMessage.success('反馈提交成功，感谢您的建议！')
  } catch (error) {
    console.error('提交反馈失败:', error)
  }
}

onMounted(() => {
  // 初始化编辑表单
  if (userStore.user) {
    editForm.value = {
      username: userStore.user.username || '',
      email: userStore.user.email || '',
      phone: userStore.user.phone || '',
      avatar: userStore.user.avatar || ''
    }
  }
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: var(--background-color);
}

.page-container {
  padding: 20px 0;
}

.breadcrumb {
  margin-bottom: 20px;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info h2 {
  font-size: 24px;
  color: var(--text-color);
  margin: 0 0 5px 0;
}

.user-info p {
  color: var(--text-color-secondary);
  margin: 0 0 3px 0;
  font-size: 14px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  color: var(--primary-color);
}

.stat-number {
  font-size: 28px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 5px;
}

.stat-label {
  color: var(--text-color-secondary);
  font-size: 14px;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.function-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.function-section h3 {
  font-size: 18px;
  color: var(--text-color);
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color-light);
}

.function-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.function-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-color);
}

.function-item:hover {
  background: var(--background-color);
  color: var(--primary-color);
}

.function-item span {
  flex: 1;
  font-size: 14px;
}

.function-item .el-icon:first-child {
  color: var(--primary-color);
}

.function-item .el-icon:last-child {
  color: var(--text-color-secondary);
}

.badge {
  margin-left: auto;
}

/* 对话框样式 */
.address-management {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.address-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 300px;
  overflow-y: auto;
}

.address-item {
  border: 1px solid var(--border-color-light);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.address-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.name {
  font-weight: bold;
}

.phone {
  color: var(--text-color-secondary);
}

.address-detail {
  color: var(--text-color-regular);
  font-size: 14px;
}

.address-actions {
  display: flex;
  gap: 10px;
}

.points-history {
  max-height: 300px;
  overflow-y: auto;
}

.points-record {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid var(--border-color-light);
}

.record-title {
  font-weight: bold;
  color: var(--text-color);
}

.record-time {
  font-size: 12px;
  color: var(--text-color-secondary);
  margin-top: 5px;
}

.record-points {
  font-weight: bold;
  font-size: 16px;
}

.record-points.positive {
  color: var(--success-color);
}

.record-points.negative {
  color: var(--danger-color);
}

.coupons-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 300px;
  overflow-y: auto;
}

.coupon-item {
  border: 1px solid var(--border-color-light);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.coupon-item.expired {
  opacity: 0.6;
}

.coupon-amount {
  text-align: center;
  min-width: 80px;
}

.amount {
  font-size: 20px;
  font-weight: bold;
  color: var(--danger-color);
  display: block;
}

.condition {
  font-size: 12px;
  color: var(--text-color-secondary);
}

.coupon-info {
  flex: 1;
}

.coupon-title {
  font-weight: bold;
  color: var(--text-color);
}

.coupon-date {
  font-size: 12px;
  color: var(--text-color-secondary);
  margin-top: 5px;
}

.avatar-uploader {
  text-align: center;
}

.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--border-color);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--primary-color);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .function-grid {
    grid-template-columns: 1fr;
  }
}
</style> 