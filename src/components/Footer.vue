<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>智车商城</h3>
          <p>专业的智慧汽车销售平台，致力于为汽车爱好者提供最优质的车型和服务</p>
          <div class="social-links">
            <a href="#" class="social-link">
              <el-icon><ChatDotRound /></el-icon>
            </a>
            <a href="#" class="social-link">
              <el-icon><Message /></el-icon>
            </a>
            <a href="#" class="social-link">
              <el-icon><Phone /></el-icon>
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h4>快速导航</h4>
          <ul class="footer-links">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/products">智车选购</router-link></li>
            <li><router-link to="/guide">使用指南</router-link></li>
            <li><router-link to="/about">关于我们</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>服务支持</h4>
          <ul class="footer-links">
            <li><router-link to="/contact">联系我们</router-link></li>
            <li><router-link to="/maintenance">保养指南</router-link></li>
            <li><a href="#">售后服务</a></li>
            <li><a href="#">常见问题</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>联系方式</h4>
          <div class="contact-info">
            <p><el-icon><Location /></el-icon> 北京市朝阳区智车大厦</p>
            <p><el-icon><Phone /></el-icon> 400-888-8888</p>
            <p><el-icon><Message /></el-icon> service@smartcar.com</p>
            <p><el-icon><Clock /></el-icon> 周一至周日 9:00-18:00</p>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; 2024 智车商城. 保留所有权利.</p>
          <div class="footer-bottom-links">
            <a href="#">隐私政策</a>
            <a href="#">服务条款</a>
            <a href="#">网站地图</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 无需额外的逻辑
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: white;
  padding: 40px 0 20px;
  margin-top: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.footer-section h3 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-size: 20px;
}

.footer-section h4 {
  color: #ecf0f1;
  margin-bottom: 15px;
  font-size: 16px;
}

.footer-section p {
  color: #bdc3c7;
  line-height: 1.6;
  margin-bottom: 15px;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s;
}

.social-link:hover {
  background: #337ecc;
  transform: translateY(-2px);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--primary-color);
}

.contact-info p {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #bdc3c7;
}

.contact-info .el-icon {
  color: var(--primary-color);
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding-top: 20px;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-bottom p {
  color: #bdc3c7;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: 20px;
}

.footer-bottom-links a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-bottom-links a:hover {
  color: var(--primary-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-bottom-links {
    justify-content: center;
  }
}
</style> 