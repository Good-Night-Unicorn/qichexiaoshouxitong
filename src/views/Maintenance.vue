<template>
  <div class="maintenance-page">
    <Header />
    
    <div class="page-container">
      <div class="container">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>保养指南</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 保养指南标题 -->
        <div class="maintenance-header">
          <h1>
            <el-icon><Tools /></el-icon>
            汽车保养维护指南
          </h1>
          <p>专业的汽车保养知识，让您的智能汽车始终保持最佳状态</p>
        </div>

        <!-- 保养周期 -->
        <div class="maintenance-section">
          <div class="section-header">
            <h2>保养周期</h2>
            <p>按照科学的保养周期，确保车辆性能和安全性</p>
          </div>
          
          <div class="maintenance-timeline">
            <div class="timeline-item">
              <div class="timeline-marker">
                <div class="marker-icon">
                  <el-icon size="24"><Calendar /></el-icon>
                </div>
                <div class="marker-label">1周</div>
              </div>
              <div class="timeline-content">
                <h3>日常检查</h3>
                <div class="check-items">
                  <div class="check-item">
                    <el-icon size="20"><CircleCheck /></el-icon>
                    <span>检查轮胎气压</span>
                  </div>
                  <div class="check-item">
                    <el-icon size="20"><CircleCheck /></el-icon>
                    <span>检查车身外观</span>
                  </div>
                  <div class="check-item">
                    <el-icon size="20"><CircleCheck /></el-icon>
                    <span>清洁内饰</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker">
                <div class="marker-icon">
                  <el-icon size="24"><Calendar /></el-icon>
                </div>
                <div class="marker-label">1月</div>
              </div>
              <div class="timeline-content">
                <h3>月度保养</h3>
                <div class="check-items">
                  <div class="check-item">
                    <el-icon size="20"><CircleCheck /></el-icon>
                    <span>检查照明系统</span>
                  </div>
                  <div class="check-item">
                    <el-icon size="20"><CircleCheck /></el-icon>
                    <span>清洁充电口</span>
                  </div>
                  <div class="check-item">
                    <el-icon size="20"><CircleCheck /></el-icon>
                    <span>检查雨刷</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker">
                <div class="marker-icon">
                  <el-icon size="24"><Calendar /></el-icon>
                </div>
                <div class="marker-label">6月</div>
              </div>
              <div class="timeline-content">
                <h3>半年保养</h3>
                <div class="check-items">
                  <div class="check-item">
                    <el-icon size="20"><CircleCheck /></el-icon>
                    <span>更换空调滤芯</span>
                  </div>
                  <div class="check-item">
                    <el-icon size="20"><CircleCheck /></el-icon>
                    <span>检查制动系统</span>
                  </div>
                  <div class="check-item">
                    <el-icon size="20"><CircleCheck /></el-icon>
                    <span>软件系统更新</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker">
                <div class="marker-icon">
                  <el-icon size="24"><Calendar /></el-icon>
                </div>
                <div class="marker-label">1年</div>
              </div>
              <div class="timeline-content">
                <h3>年度保养</h3>
                <div class="check-items">
                  <div class="check-item">
                    <el-icon size="20"><CircleCheck /></el-icon>
                    <span>全面系统检查</span>
                  </div>
                  <div class="check-item">
                    <el-icon size="20"><CircleCheck /></el-icon>
                    <span>电池健康检查</span>
                  </div>
                  <div class="check-item">
                    <el-icon size="20"><CircleCheck /></el-icon>
                    <span>专业深度保养</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 保养项目 -->
        <div class="maintenance-section">
          <div class="section-header">
            <h2>保养项目详解</h2>
            <p>详细了解每个保养项目的具体内容和注意事项</p>
          </div>
          
          <div class="maintenance-grid">
            <div class="maintenance-card">
              <div class="card-icon">
                <el-icon size="40"><Lightning /></el-icon>
              </div>
              <h3>电池系统</h3>
              <div class="card-content">
                <h4>检查项目：</h4>
                <ul>
                  <li>电池健康状态</li>
                  <li>充电接口清洁</li>
                  <li>充电线缆检查</li>
                  <li>电池温度监控</li>
                </ul>
                <h4>注意事项：</h4>
                <p>避免过度充电和放电，保持电池在适宜温度范围内使用。</p>
              </div>
            </div>
            
            <div class="maintenance-card">
              <div class="card-icon">
                <el-icon size="40"><Setting /></el-icon>
              </div>
              <h3>驱动系统</h3>
              <div class="card-content">
                <h4>检查项目：</h4>
                <ul>
                  <li>电机运行状态</li>
                  <li>传动系统检查</li>
                  <li>驱动模式测试</li>
                  <li>性能参数监测</li>
                </ul>
                <h4>注意事项：</h4>
                <p>定期检查电机温度，避免长时间高负荷运行。</p>
              </div>
            </div>
            
            <div class="maintenance-card">
              <div class="card-icon">
                <el-icon size="40"><Aim /></el-icon>
              </div>
              <h3>智能系统</h3>
              <div class="card-content">
                <h4>检查项目：</h4>
                <ul>
                  <li>传感器清洁</li>
                  <li>摄像头校准</li>
                  <li>软件系统更新</li>
                  <li>功能测试</li>
                </ul>
                <h4>注意事项：</h4>
                <p>保持传感器清洁，定期更新系统软件以获得最佳性能。</p>
              </div>
            </div>
            
            <div class="maintenance-card">
              <div class="card-icon">
                <el-icon size="40"><WindPower /></el-icon>
              </div>
              <h3>空调系统</h3>
              <div class="card-content">
                <h4>检查项目：</h4>
                <ul>
                  <li>空调滤芯更换</li>
                  <li>制冷剂检查</li>
                  <li>出风口清洁</li>
                  <li>温控系统测试</li>
                </ul>
                <h4>注意事项：</h4>
                <p>定期更换滤芯，保持空调系统清洁，提高空气质量。</p>
              </div>
            </div>
            
            <div class="maintenance-card">
              <div class="card-icon">
                <el-icon size="40"><Warning /></el-icon>
              </div>
              <h3>制动系统</h3>
              <div class="card-content">
                <h4>检查项目：</h4>
                <ul>
                  <li>制动片磨损</li>
                  <li>制动液检查</li>
                  <li>制动盘检查</li>
                  <li>制动性能测试</li>
                </ul>
                <h4>注意事项：</h4>
                <p>制动系统关系到行车安全，发现问题及时维修。</p>
              </div>
            </div>
            
            <div class="maintenance-card">
              <div class="card-icon">
                <el-icon size="40"><Van /></el-icon>
              </div>
              <h3>轮胎系统</h3>
              <div class="card-content">
                <h4>检查项目：</h4>
                <ul>
                  <li>轮胎气压</li>
                  <li>轮胎磨损</li>
                  <li>轮胎平衡</li>
                  <li>四轮定位</li>
                </ul>
                <h4>注意事项：</h4>
                <p>保持正确的轮胎气压，定期检查磨损情况。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 保养技巧 -->
        <div class="maintenance-section">
          <div class="section-header">
            <h2>保养技巧</h2>
            <p>实用的保养技巧，让您的爱车更持久</p>
          </div>
          
          <div class="tips-grid">
            <div class="tip-card">
              <div class="tip-number">01</div>
              <h3>定期检查</h3>
              <p>养成定期检查的习惯，发现问题及时处理，避免小问题变成大问题。</p>
            </div>
            
            <div class="tip-card">
              <div class="tip-number">02</div>
              <h3>专业保养</h3>
              <p>选择专业的保养机构，使用原厂配件，确保保养质量。</p>
            </div>
            
            <div class="tip-card">
              <div class="tip-number">03</div>
              <h3>记录保养</h3>
              <p>建立保养记录，跟踪保养历史，合理安排保养计划。</p>
            </div>
            
            <div class="tip-card">
              <div class="tip-number">04</div>
              <h3>预防为主</h3>
              <p>预防性保养比维修更经济，定期保养可以延长车辆寿命。</p>
            </div>
          </div>
        </div>

        <!-- 保养预约 -->
        <div class="maintenance-section">
          <div class="section-header">
            <h2>保养预约</h2>
            <p>在线预约保养服务，享受专业便捷的保养体验</p>
          </div>
          
          <div class="appointment-card">
            <div class="appointment-info">
              <h3>预约保养服务</h3>
              <p>我们提供专业的保养服务，包括：</p>
              <ul>
                <li>全面系统检查</li>
                <li>专业技师服务</li>
                <li>原厂配件更换</li>
                <li>质量保证</li>
              </ul>
              <el-button type="primary" size="large" @click="handleAppointment">
                <el-icon><Calendar /></el-icon>
                立即预约
              </el-button>
            </div>
            
            <div class="appointment-image">
              <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" alt="保养服务">
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleAppointment = () => {
  ElMessage.info('保养预约功能开发中...')
}
</script>

<style scoped>
.maintenance-page {
  min-height: 100vh;
  background: var(--background-color);
}

.page-container {
  padding: 20px 0;
}

.breadcrumb {
  margin-bottom: 20px;
}

.maintenance-header {
  text-align: center;
  margin-bottom: 60px;
  padding: 40px 0;
}

.maintenance-header h1 {
  font-size: 36px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.maintenance-header p {
  font-size: 18px;
  color: var(--text-color-regular);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 通用区块样式 */
.maintenance-section {
  background: white;
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 28px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 15px;
}

.section-header p {
  color: var(--text-color-regular);
  font-size: 16px;
}

/* 保养时间线 */
.maintenance-timeline {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.maintenance-timeline::before {
  content: '';
  position: absolute;
  left: 50px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--primary-color);
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 40px;
  position: relative;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.marker-icon {
  width: 50px;
  height: 50px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.marker-label {
  font-size: 12px;
  font-weight: bold;
  color: var(--primary-color);
  background: white;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid var(--primary-color);
}

.timeline-content {
  flex: 1;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid var(--primary-color);
}

.timeline-content h3 {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 15px;
}

.check-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color-regular);
}

.check-item .el-icon {
  color: var(--primary-color);
}

/* 保养项目网格 */
.maintenance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.maintenance-card {
  border: 1px solid var(--border-color-light);
  border-radius: 12px;
  padding: 30px;
  transition: all 0.3s ease;
}

.maintenance-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.card-icon {
  color: var(--primary-color);
  margin-bottom: 20px;
}

.maintenance-card h3 {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 20px;
}

.card-content h4 {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 10px;
}

.card-content ul {
  list-style: none;
  padding: 0;
  margin-bottom: 15px;
}

.card-content li {
  padding: 5px 0;
  color: var(--text-color-regular);
  position: relative;
  padding-left: 20px;
}

.card-content li::before {
  content: '✓';
  color: var(--primary-color);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.card-content p {
  color: var(--text-color-regular);
  line-height: 1.6;
  font-size: 14px;
}

/* 保养技巧 */
.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.tip-card {
  text-align: center;
  padding: 30px 20px;
  border: 1px solid var(--border-color-light);
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
}

.tip-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.tip-number {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.tip-card h3 {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-color);
  margin: 20px 0 15px 0;
}

.tip-card p {
  color: var(--text-color-regular);
  line-height: 1.6;
  font-size: 14px;
}

/* 预约卡片 */
.appointment-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 40px;
}

.appointment-info h3 {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 20px;
}

.appointment-info p {
  color: var(--text-color-regular);
  margin-bottom: 20px;
  line-height: 1.6;
}

.appointment-info ul {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}

.appointment-info li {
  padding: 8px 0;
  color: var(--text-color-regular);
  position: relative;
  padding-left: 25px;
}

.appointment-info li::before {
  content: '✓';
  color: var(--primary-color);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.appointment-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .maintenance-timeline::before {
    left: 25px;
  }
  
  .timeline-item {
    gap: 20px;
  }
  
  .marker-icon {
    width: 40px;
    height: 40px;
  }
  
  .maintenance-grid {
    grid-template-columns: 1fr;
  }
  
  .tips-grid {
    grid-template-columns: 1fr;
  }
  
  .appointment-card {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .maintenance-header h1 {
    font-size: 28px;
  }
  
  .section-header h2 {
    font-size: 24px;
  }
  
  .maintenance-section {
    padding: 30px 20px;
  }
}
</style> 