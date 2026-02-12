// 产品数据
export const products = [
  {
    id: 1,
    name: '小米SU7',
    category: '智能轿车',
    price: 299999,
    originalPrice: 329999,
    rating: 4.8,
    sold: 120,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
    description: '全新智能电动轿车，拥有超强续航能力和极致科技体验',
    features: ['智能驾驶', '超长续航', '高性能', '科技感'],
    specs: {
      type: '智能轿车',
      driveType: '纯电动',
      range: '830公里',
      acceleration: '2.78秒',
      battery: '刀片电池',
      charging: '快充技术'
    },
    tags: ['智能轿车', '纯电动', '刀片电池', '激光雷达']
  },
  {
    id: 2,
    name: '小米SU7 Ultra',
    category: '豪华轿车',
    price: 799999,
    originalPrice: 829999,
    rating: 4.9,
    sold: 85,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
    description: '极致性能版本，赛道级性能表现，百公里加速仅需1.97秒',
    features: ['极致性能', '赛道级', '超快加速', '豪华配置'],
    specs: {
      type: '豪华轿车',
      driveType: '纯电动',
      range: '630公里',
      acceleration: '1.97秒',
      battery: '高性能电池',
      charging: '超快充技术'
    },
    tags: ['豪华轿车', '纯电动', '高性能', '赛道级']
  },
  {
    id: 3,
    name: '比亚迪汉EV',
    category: '智能轿车',
    price: 239800,
    originalPrice: 259800,
    rating: 4.7,
    sold: 200,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
    description: '刀片电池技术，安全可靠，智能驾驶辅助系统',
    features: ['刀片电池', '安全可靠', '智能驾驶', '长续航'],
    specs: {
      type: '智能轿车',
      driveType: '纯电动',
      range: '605公里',
      acceleration: '3.9秒',
      battery: '刀片电池',
      charging: '快充技术'
    },
    tags: ['智能轿车', '纯电动', '刀片电池', '安全可靠']
  },
  {
    id: 4,
    name: '理想L9',
    category: '智能SUV',
    price: 459800,
    originalPrice: 479800,
    rating: 4.6,
    sold: 150,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
    description: '增程式电动SUV，大六座设计，家庭出行首选',
    features: ['增程式', '大六座', '家庭出行', '长续航'],
    specs: {
      type: '智能SUV',
      driveType: '增程式',
      range: '1100公里',
      acceleration: '5.3秒',
      battery: '增程电池',
      charging: '快充技术'
    },
    tags: ['智能SUV', '增程式', '大六座', '家庭出行']
  },
  {
    id: 5,
    name: '蔚来ET7',
    category: '智能轿车',
    price: 458000,
    originalPrice: 478000,
    rating: 4.5,
    sold: 95,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=400&h=300&fit=crop',
    description: '智能电动轿车，激光雷达加持，换电技术领先',
    features: ['激光雷达', '换电技术', '智能驾驶', '豪华配置'],
    specs: {
      type: '智能轿车',
      driveType: '纯电动',
      range: '1000公里',
      acceleration: '3.8秒',
      battery: '换电电池',
      charging: '换电技术'
    },
    tags: ['智能轿车', '纯电动', '激光雷达', '换电技术']
  },
  {
    id: 6,
    name: '特斯拉Model S',
    category: '高性能轿车',
    price: 789000,
    originalPrice: 829000,
    rating: 4.4,
    sold: 180,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=400&h=300&fit=crop',
    description: '全球电动车标杆，极致性能与科技完美结合',
    features: ['极致性能', '全球标杆', '科技领先', '超快加速'],
    specs: {
      type: '高性能轿车',
      driveType: '纯电动',
      range: '652公里',
      acceleration: '2.1秒',
      battery: '高性能电池',
      charging: '超充技术'
    },
    tags: ['高性能轿车', '纯电动', '全球标杆', '超快加速']
  },
  {
    id: 7,
    name: '小鹏P7',
    category: '智能轿车',
    price: 249900,
    originalPrice: 269900,
    rating: 4.6,
    sold: 160,
    stock: 70,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
    description: '智能轿跑，XPILOT自动驾驶，科技感十足',
    features: ['智能轿跑', 'XPILOT', '科技感', '长续航'],
    specs: {
      type: '智能轿车',
      driveType: '纯电动',
      range: '586公里',
      acceleration: '4.3秒',
      battery: '高性能电池',
      charging: '快充技术'
    },
    tags: ['智能轿车', '纯电动', 'XPILOT', '智能轿跑']
  },
  {
    id: 8,
    name: '问界M7',
    category: '豪华SUV',
    price: 319800,
    originalPrice: 339800,
    rating: 4.5,
    sold: 120,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
    description: '华为智能座舱，鸿蒙系统，智能驾驶体验',
    features: ['华为座舱', '鸿蒙系统', '智能驾驶', '豪华配置'],
    specs: {
      type: '豪华SUV',
      driveType: '增程式',
      range: '1220公里',
      acceleration: '7.8秒',
      battery: '增程电池',
      charging: '快充技术'
    },
    tags: ['豪华SUV', '增程式', '华为座舱', '鸿蒙系统']
  }
]

// 产品分类
export const categories = [
  { id: 'all', name: '全部', count: products.length },
  { id: '智能轿车', name: '智能轿车', count: products.filter(p => p.category === '智能轿车').length },
  { id: '豪华轿车', name: '豪华轿车', count: products.filter(p => p.category === '豪华轿车').length },
  { id: '智能SUV', name: '智能SUV', count: products.filter(p => p.category === '智能SUV').length },
  { id: '豪华SUV', name: '豪华SUV', count: products.filter(p => p.category === '豪华SUV').length },
  { id: '高性能轿车', name: '高性能轿车', count: products.filter(p => p.category === '高性能轿车').length }
]

// 轮播图数据
export const carouselData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=500&fit=crop',
    title: '智慧未来，驾驭智能',
    subtitle: '探索智能汽车的新世界',
    buttonText: '立即体验',
    buttonLink: '/products'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&h=500&fit=crop',
    title: 'XIAOMI 豪华座驾，尊享品质',
    subtitle: '精选全球顶级豪华汽车品牌，为您打造专属的奢华出行体验',
    buttonText: '查看豪车',
    buttonLink: '/products'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=500&fit=crop',
    title: '行，环保先锋',
    subtitle: '绿色革命，零排放的环保出行方式',
    buttonText: '立即体验',
    buttonLink: '/products'
  }
] 