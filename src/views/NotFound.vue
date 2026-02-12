<template>
  <div class="not-found-page">
    <Header />
    
    <div class="page-container">
      <div class="container">
        <div class="not-found-content">
          <!-- 支付成功提示 -->
          <div class="success-message">
            <el-alert
              title="支付成功！"
              type="success"
              :closable="false"
              show-icon
              center
            >
              <template #default>
                您的订单已成功提交，感谢您的购买！
              </template>
            </el-alert>
          </div>
          
          <div class="error-illustration">
            <div class="error-number">404</div>
            <div class="error-car">
              <el-icon size="80"><Van /></el-icon>
            </div>
          </div>
          
          <div class="error-message">
            <h1>页面未找到</h1>
            <p>抱歉，您访问的页面不存在或已被移除</p>
            <p class="error-desc">可能是链接错误、页面已被删除或暂时无法访问</p>
          </div>
          
          <div class="error-actions">
            <el-button type="primary" size="large" @click="$router.push('/')">
              <el-icon><House /></el-icon>
              返回首页
            </el-button>
            <el-button size="large" @click="$router.go(-1)">
              <el-icon><Back /></el-icon>
              返回上页
            </el-button>
          </div>
          
          <div class="suggestions">
            <h3>您可以尝试：</h3>
            <div class="suggestion-links">
              <router-link to="/products" class="suggestion-link">
                <el-icon><Van /></el-icon>
                <span>浏览智能汽车</span>
              </router-link>
              <router-link to="/guide" class="suggestion-link">
                <el-icon><Document /></el-icon>
                <span>查看使用指南</span>
              </router-link>
              <router-link to="/about" class="suggestion-link">
                <el-icon><InfoFilled /></el-icon>
                <span>了解我们</span>
              </router-link>
              <router-link to="/contact" class="suggestion-link">
                <el-icon><Phone /></el-icon>
                <span>联系我们</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
// 无需额外的逻辑
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: var(--background-color);
}

.page-container {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.success-message {
  margin-bottom: 30px;
}

.success-message .el-alert {
  border-radius: 8px;
  font-size: 16px;
}

.error-illustration {
  position: relative;
  margin-bottom: 40px;
}

.error-number {
  font-size: 120px;
  font-weight: bold;
  color: var(--primary-color);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.error-car {
  color: var(--text-color-secondary);
  animation: drive 3s ease-in-out infinite;
}

@keyframes drive {
  0%, 100% {
    transform: translateX(-20px);
  }
  50% {
    transform: translateX(20px);
  }
}

.error-message h1 {
  font-size: 32px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 15px;
}

.error-message p {
  font-size: 18px;
  color: var(--text-color-regular);
  margin-bottom: 10px;
  line-height: 1.6;
}

.error-desc {
  font-size: 14px !important;
  color: var(--text-color-secondary) !important;
}

.error-actions {
  margin: 40px 0;
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.error-actions .el-button {
  min-width: 140px;
  height: 48px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.suggestions {
  margin-top: 60px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.suggestions h3 {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 20px;
}

.suggestion-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.suggestion-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border: 1px solid var(--border-color-light);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-color-regular);
  transition: all 0.3s ease;
}

.suggestion-link:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.1);
}

.suggestion-link .el-icon {
  color: var(--primary-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-number {
    font-size: 80px;
  }
  
  .error-message h1 {
    font-size: 24px;
  }
  
  .error-message p {
    font-size: 16px;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .error-actions .el-button {
    width: 100%;
    max-width: 300px;
  }
  
  .suggestion-links {
    grid-template-columns: 1fr;
  }
  
  .suggestions {
    padding: 20px;
  }
}
</style> 