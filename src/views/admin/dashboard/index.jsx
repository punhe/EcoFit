import { useDocumentTitle, useScrollTop } from '@/hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ShopOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  UserOutlined,
  CrownOutlined,
  BarChartOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import * as ROUTES from '@/constants/routes';

const Dashboard = () => {
  useDocumentTitle('Admin Dashboard | ECOFIT');
  useScrollTop();

  const profile = useSelector((state) => state.profile);
  const products = useSelector((state) => state.products.items);
  const basket = useSelector((state) => state.basket);

  // Calculate statistics
  const totalProducts = products.length;
  const totalOrders = basket.length; // This would be from orders collection in real app
  const totalCustomers = 0; // Would need to fetch from users collection
  const totalRevenue = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const menuItems = [
    {
      title: 'Quản lý sản phẩm',
      description: 'Xem, chỉnh sửa và quản lý tất cả sản phẩm',
      icon: <ShopOutlined />,
      link: ROUTES.ADMIN_PRODUCTS,
      color: '#8B4513'
    },
    {
      title: 'Thêm sản phẩm mới',
      description: 'Tạo sản phẩm mới cho cửa hàng',
      icon: <AppstoreAddOutlined />,
      link: ROUTES.ADD_PRODUCT,
      color: '#C4A35A'
    },
    {
      title: 'Thống kê',
      description: 'Xem báo cáo và thống kê bán hàng',
      icon: <BarChartOutlined />,
      link: '#',
      color: '#556B2F'
    },
    {
      title: 'Đơn hàng',
      description: 'Quản lý và theo dõi đơn hàng',
      icon: <ShoppingCartOutlined />,
      link: '#',
      color: '#A0522D'
    }
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-welcome">
            <div className="admin-badge">
              <CrownOutlined />
              <span>Admin Panel</span>
            </div>
            <h1>Xin chào, {profile?.fullname || 'Admin'}!</h1>
            <p>Chào mừng bạn đến với bảng điều khiển quản trị EcoFit</p>
          </div>
          <div className="admin-avatar">
            {profile?.avatar ? (
              <img src={profile.avatar} alt={profile.fullname} />
            ) : (
              <div className="avatar-placeholder">
                <UserOutlined />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(139, 69, 19, 0.1)', color: '#8B4513' }}>
            <ShopOutlined />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalProducts}</span>
            <span className="stat-label">Sản phẩm</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(85, 107, 47, 0.1)', color: '#556B2F' }}>
            <ShoppingCartOutlined />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalOrders}</span>
            <span className="stat-label">Đơn hàng</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(196, 163, 90, 0.1)', color: '#C4A35A' }}>
            <UserOutlined />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalCustomers}</span>
            <span className="stat-label">Khách hàng</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(160, 82, 45, 0.1)', color: '#A0522D' }}>
            <BarChartOutlined />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalRevenue.toLocaleString('vi-VN')}đ</span>
            <span className="stat-label">Doanh thu</span>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="admin-menu-grid">
        <h2 className="menu-title">
          <SettingOutlined />
          Quản lý cửa hàng
        </h2>
        <div className="menu-cards">
          {menuItems.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="menu-card"
              style={{ '--accent-color': item.color }}
            >
              <div className="card-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="card-arrow">→</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="admin-footer-note">
        <p>✦ EcoFit Admin Panel - Vintage Edition ✦</p>
      </div>
    </div>
  );
};

export default Dashboard;
