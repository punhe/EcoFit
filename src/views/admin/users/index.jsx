import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  UserOutlined,
  SearchOutlined,
  CrownOutlined,
  MailOutlined,
  CalendarOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import firebase from '@/services/firebase';

const Users = () => {
  useDocumentTitle('Quản lý Users | ECOFIT Admin');
  useScrollTop();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await firebase.db.collection('users').get();
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.fullname?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="admin-users">
      {/* Header */}
      <div className="users-header">
        <div className="users-header-content">
          <h1>
            <UserOutlined style={{ marginRight: '12px' }} />
            Quản lý người dùng
          </h1>
          <p>Xem và quản lý tất cả người dùng trong hệ thống</p>
        </div>

        {/* Search */}
        <div className="users-search">
          <SearchOutlined className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="users-stats">
        <div className="stat-item">
          <span className="stat-number">{users.length}</span>
          <span className="stat-label">Tổng người dùng</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{users.filter(u => u.role === 'ADMIN').length}</span>
          <span className="stat-label">Admin</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{users.filter(u => u.role === 'USER' || !u.role).length}</span>
          <span className="stat-label">Khách hàng</span>
        </div>
      </div>

      {/* Users List */}
      <div className="users-list">
        {loading ? (
          <div className="loading-state">
            <LoadingOutlined style={{ fontSize: '32px', color: '#8B4513' }} />
            <p>Đang tải danh sách người dùng...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="empty-state">
            <UserOutlined style={{ fontSize: '48px', color: '#ccc' }} />
            <p>Không tìm thấy người dùng nào</p>
          </div>
        ) : (
          <div className="users-table">
            <div className="table-header">
              <div className="col-avatar">Avatar</div>
              <div className="col-name">Tên</div>
              <div className="col-email">Email</div>
              <div className="col-role">Vai trò</div>
              <div className="col-date">Ngày tham gia</div>
            </div>
            {filteredUsers.map((user) => (
              <div key={user.id} className="table-row">
                <div className="col-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.fullname} className="user-avatar" />
                  ) : (
                    <div className="avatar-placeholder">
                      <UserOutlined />
                    </div>
                  )}
                </div>
                <div className="col-name">
                  <span className="user-name">{user.fullname || 'Chưa cập nhật'}</span>
                </div>
                <div className="col-email">
                  <MailOutlined style={{ marginRight: '6px', color: '#888' }} />
                  {user.email}
                </div>
                <div className="col-role">
                  <span className={`role-badge ${user.role === 'ADMIN' ? 'admin' : 'user'}`}>
                    {user.role === 'ADMIN' && <CrownOutlined style={{ marginRight: '4px' }} />}
                    {user.role === 'ADMIN' ? 'Admin' : 'Khách hàng'}
                  </span>
                </div>
                <div className="col-date">
                  <CalendarOutlined style={{ marginRight: '6px', color: '#888' }} />
                  {formatDate(user.dateJoined)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
