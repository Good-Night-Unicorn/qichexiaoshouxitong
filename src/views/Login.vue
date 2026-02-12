<template>
  <div class="login-page">
    <div class="login-background">
      <div class="background-image"></div>
      <div class="background-overlay"></div>
    </div>

    <div class="login-container">
      <div class="login-form">
        <!-- Logo和标题 -->
        <div class="login-header">
          <div class="logo">
            <h1>智车商城</h1>
            <div class="logo-icons">
              <el-icon size="24" color="#409eff"><Van /></el-icon>
              <el-icon size="24" color="#f56c6c"><Van /></el-icon>
            </div>
          </div>
          <h2>欢迎回到智车世界</h2>
          <p>登录您的账户，开启智慧出行之旅</p>
        </div>

        <!-- 登录表单 -->
        <el-form 
          ref="loginFormRef" 
          :model="loginForm" 
          :rules="loginRules" 
          class="login-form-content"
          @submit.prevent="handleLogin"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="用户名"
              size="large"
              prefix-icon="User"
              clearable
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              size="large"
              prefix-icon="Lock"
              suffix-icon="View"
              show-password
              clearable
            />
          </el-form-item>

          <div class="login-options">
            <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
            <el-button type="text" @click="handleForgotPassword">忘记密码？</el-button>
          </div>

          <el-form-item>
            <el-button 
              type="primary" 
              size="large" 
              class="login-button"
              @click="handleLogin"
              :loading="loading"
            >
              <el-icon><Van /></el-icon>
              开启智车之旅
            </el-button>
          </el-form-item>
        </el-form>

        <!-- 注册链接 -->
        <div class="register-link">
          <span>还没有账户？</span>
          <router-link to="/register">加入智车大家庭</router-link>
        </div>

        <!-- 其他登录方式 -->
        <div class="other-login">
          <div class="divider">
            <span>或使用其他方式登录</span>
          </div>
          
          <div class="social-login">
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
const loginFormRef = ref()
const loading = ref(false)

const loginForm = reactive({
  username: 'xiaosongshu',
  password: '123456',
  rememberMe: true
})

// 表单验证规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

// 方法
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    await loginFormRef.value.validate()
    loading.value = true

    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟登录验证
    if (loginForm.username === 'xiaosongshu' && loginForm.password === '123456') {
      const userData = {
        id: 1,
        username: loginForm.username,
        email: 'xiaosongshu@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      }
      
      const token = 'mock-token-' + Date.now()
      
      userStore.login(userData, token)
      ElMessage.success('登录成功，欢迎回来！')
      
      // 跳转到之前的页面或首页
      const redirect = router.currentRoute.value.query.redirect || '/'
      router.push(redirect)
    } else {
      ElMessage.error('用户名或密码错误')
    }
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败，请检查输入信息')
  } finally {
    loading.value = false
  }
}

const handleForgotPassword = () => {
  ElMessage.info('忘记密码功能开发中...')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-background {
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
  background-image: url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&h=1080&fit=crop');
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

.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.login-form {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.login-header {
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

.login-header h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
  font-weight: bold;
  color: var(--text-color);
}

.login-header p {
  margin: 0;
  color: var(--text-color-regular);
  font-size: 14px;
}

.login-form-content {
  margin-bottom: 20px;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.register-link {
  text-align: center;
  margin-bottom: 30px;
  color: var(--text-color-regular);
  font-size: 14px;
}

.register-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  margin-left: 5px;
}

.register-link a:hover {
  text-decoration: underline;
}

.other-login {
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

.social-login {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-login .el-button {
  width: 50px;
  height: 50px;
  border: 1px solid var(--border-color);
  color: var(--text-color-regular);
  transition: all 0.3s;
}

.social-login .el-button:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-container {
    padding: 10px;
  }
  
  .login-form {
    padding: 30px 20px;
  }
  
  .logo h1 {
    font-size: 24px;
  }
  
  .login-header h2 {
    font-size: 20px;
  }
}
</style> 