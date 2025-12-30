import { ADMIN_DASHBOARD, ADMIN_PRODUCTS, ADMIN_USERS } from '@/constants/routes';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';

const SideNavigation = () => (
  <aside className="sidenavigation">
    <div className="sidenavigation-wrapper">
      <div className="sidenavigation-item">
        <NavLink
          to={ADMIN_DASHBOARD}
          className={({ isActive }) =>
            `sidenavigation-menu ${isActive ? 'sidenavigation-menu-active' : ''}`
          }
        >
          <DashboardOutlined style={{ marginRight: '8px' }} />
          Dashboard
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
          to={ADMIN_PRODUCTS}
          className={({ isActive }) =>
            `sidenavigation-menu ${isActive ? 'sidenavigation-menu-active' : ''}`
          }
        >
          <ShopOutlined style={{ marginRight: '8px' }} />
          Products
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
          to={ADMIN_USERS}
          className={({ isActive }) =>
            `sidenavigation-menu ${isActive ? 'sidenavigation-menu-active' : ''}`
          }
        >
          <UserOutlined style={{ marginRight: '8px' }} />
          Users
        </NavLink>
      </div>
    </div>
  </aside>
);

export default SideNavigation;
