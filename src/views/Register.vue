<template>
  <div class="register-page">
    <div class="register-background">
      <div class="background-image"></div>
      <div class="background-overlay"></div>
    </div>

    <div class="register-container">
      <div class="register-form">
        <!-- Logo和标题 -->
        <div class="register-header">
          <div class="logo">
            <h1>智车商城</h1>
            <div class="logo-icons">
              <el-icon size="24" color="#409eff"><Van /></el-icon>
              <el-icon size="24" color="#f56c6c"><Van /></el-icon>
            </div>
          </div>
          <h2>加入智车大家庭</h2>
          <p>创建您的账户，开启智能出行新体验</p>
        </div>

        <!-- 注册表单 -->
        <el-form 
          ref="registerFormRef" 
          :model="registerForm" 
          :rules="registerRules" 
          class="register-form-content"
          @submit.prevent="handleRegister"
        >
          <el-form-item prop="username">
            <el-input
              v-model="registerForm.username"
              placeholder="用户名"
              size="large"
              prefix-icon="User"
              clearable
            />
          </el-form-item>

          <el-form-item prop="email">
            <el-input
              v-model="registerForm.email"
              placeholder="邮箱地址"
              size="large"
              prefix-icon="Message"
              clearable
            />
          </el-form-item>

          <el-form-item prop="phone">
            <el-input
              v-model="registerForm.phone"
              placeholder="手机号码"
              size="large"
              prefix-icon="Phone"
              clearable
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="密码"
              size="large"
              prefix-icon="Lock"
              suffix-icon="View"
              show-password
              clearable
            />
          </el-form-item>

          <el-form-item prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="确认密码"
              size="large"
              prefix-icon="Lock"
              suffix-icon="View"
              show-password
              clearable
            />
          </el-form-item>

          <div class="register-options">
            <el-checkbox v-model="registerForm.agreeTerms">
              我已阅读并同意
              <el-button type="text" @click="showTerms">《用户协议》</el-button>
              和
              <el-button type="text" @click="showPrivacy">《隐私政策》</el-button>
            </el-checkbox>
          </div>

          <el-form-item>
            <el-button 
              type="primary" 
              size="large" 
              class="register-button"
              @click="handleRegister"
              :loading="loading"
            >
              <el-icon><UserFilled /></el-icon>
              创建账户
            </el-button>
          </el-form-item>
        </el-form>

        <!-- 登录链接 -->
        <div class="login-link">
          <span>已有账户？</span>
          <router-link to="/login">立即登录</router-link>
        </div>

        <!-- 其他注册方式 -->
        <div class="other-register">
          <div class="divider">
            <span>或使用其他方式注册</span>
          </div>
          
          <div class="social-register">
            <el-button circle size="large">
              <el-icon><ChatDotRound /></el-icon>
            </el-button>
            <el-button circle size="large">
              <el-icon><Message /></el-icon>
            </el-button>
            <el-button circle size="large">
              <el-icon><Phone /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const registerFormRef = ref()
const loading = ref(false)

const registerForm = reactive({
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

// 表单验证规则
const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: '密码必须包含大小写字母和数字', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 方法
const handleRegister = async () => {
  if (!registerFormRef.value) return

  try {
    await registerFormRef.value.validate()
    
    if (!registerForm.agreeTerms) {
      ElMessage.warning('请先同意用户协议和隐私政策')
      return
    }

    loading.value = true

    // 模拟注册请求
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟注册成功
    const userData = {
      id: Date.now(),
      username: registerForm.username,
      email: registerForm.email,
      phone: registerForm.phone,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
    
    userStore.register(userData)
    ElMessage.success('注册成功！欢迎加入智车大家庭')
    
    // 跳转到首页
    router.push('/')
  } catch (error) {
    console.error('注册失败:', error)
    ElMessage.error('注册失败，请检查输入信息')
  } finally {
    loading.value = false
  }
}

const showTerms = () => {
  ElMessage.info('用户协议功能开发中...')
}

const showPrivacy = () => {
  ElMessage.info('隐私政策功能开发中...')
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.register-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.background-image {
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&h=1080&fit=crop');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.register-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 450px;
  padding: 20px;
}

.register-form {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  margin-bottom: 20px;
}

.logo h1 {
  margin: 0 0 10px 0;
  font-size: 28px;
  font-weight: bold;
  color: var(--primary-color);
}

.logo-icons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.register-header h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
  font-weight: bold;
  color: var(--text-color);
}

.register-header p {
  margin: 0;
  color: var(--text-color-regular);
  font-size: 14px;
}

.register-form-content {
  margin-bottom: 20px;
}

.register-options {
  margin-bottom: 20px;
}

.register-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-link {
  text-align: center;
  margin-bottom: 30px;
  color: var(--text-color-regular);
  font-size: 14px;
}

.login-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  margin-left: 5px;
}

.login-link a:hover {
  text-decoration: underline;
}

.other-register {
  text-align: center;
}

.divider {
  position: relative;
  margin-bottom: 20px;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border-color);
}

.divider span {
  background: white;
  padding: 0 15px;
  color: var(--text-color-secondary);
  font-size: 12px;
}

.social-register {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-register .el-button {
  width: 50px;
  height: 50px;
  border: 1px solid var(--border-color);
  color: var(--text-color-regular);
  transition: all 0.3s;
}

.social-register .el-button:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .register-container {
    padding: 10px;
  }
  
  .register-form {
    padding: 30px 20px;
  }
  
  .logo h1 {
    font-size: 24px;
  }
  
  .register-header h2 {
    font-size: 20px;
  }
}
</style> 