import * as Route from "@/constants/routes";
import logo from "@/images/logo-full.png";
import React from "react";
import { useLocation } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  // Danh sách các trang không hiển thị footer
  const excludedPaths = [
    Route.ADMIN_DASHBOARD,
    Route.ADMIN_PRODUCTS,
    Route.ADMIN_USERS,
    Route.ADD_PRODUCT,
    Route.EDIT_PRODUCT,
    Route.SIGNIN,
    Route.SIGNUP,
    Route.FORGOT_PASSWORD,
  ];

  // Kiểm tra xem pathname có bắt đầu bằng /admin không
  const isAdminRoute = pathname.startsWith("/admin");

  // Ẩn footer với các trang loại trừ
  if (excludedPaths.includes(pathname) || isAdminRoute) {
    return null;
  }

  return (
    <footer className="footer-new">
      <div className="footer-content">
        <div className="footer-col">
          <h4>✦ ECOFIT ✦</h4>
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to={Route.SHOP}>Cửa hàng</Link>
            </li>
            <li>
              <Link to={Route.FEATURED_PRODUCTS}>Sản phẩm nổi bật</Link>
            </li>
            <li>
              <Link to={Route.RECOMMENDED_PRODUCTS}>Sản phẩm đề xuất</Link>
            </li>
            <li>
              <Link to={Route.SEARCH}>Tìm kiếm</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Danh mục</h4>
          <ul>
            <li>
              <Link to={`${Route.SHOP}?brand=Showroom%20%26%20Shop`}>
                Showroom & Shop
              </Link>
            </li>
            <li>
              <Link to={`${Route.SHOP}?brand=Đồ%20nội%20thất`}>
                Đồ nội thất
              </Link>
            </li>
            <li>
              <Link to={`${Route.SHOP}?brand=Bàn%20ghế`}>Bàn ghế</Link>
            </li>
            <li>
              <Link to={`${Route.SHOP}?brand=Giường%20-%20tủ`}>
                Giường - tủ
              </Link>
            </li>
            <li>
              <Link to={`${Route.SHOP}?brand=Kệ`}>Kệ</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Tài khoản</h4>
          <ul>
            <li>
              <Link to={Route.SIGNIN}>Đăng nhập</Link>
            </li>
            <li>
              <Link to={Route.SIGNUP}>Đăng ký</Link>
            </li>
            <li>
              <Link to={Route.ACCOUNT}>Thông tin tài khoản</Link>
            </li>
            <li>
              <Link to={Route.CHECKOUT}>Thanh toán</Link>
            </li>
            <li>
              <Link to={Route.FORGOT_PASSWORD}>Quên mật khẩu</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col newsletter">
          <h4>Theo dõi chúng tôi</h4>
          <p>
            Đăng ký để nhận thông tin về những món đồ vintage độc đáo và
            các ưu đãi đặc biệt từ cửa hàng
          </p>
          <div className="subscribe-form">
            <input type="email" placeholder="Email của bạn..." />
            <button>Đăng ký</button>
          </div>
          <div className="social-links">
            <a
              href="https://www.facebook.com/profile.php?id=61572789724882"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} EcoFit - Cửa hàng đồ cũ chất lượng
        </p>
        <p>Thành phố Quy Nhơn - Bình Định</p>
        <p style={{ marginTop: '0.5rem', fontSize: '1.3rem' }}>
          Email: ecofit.cskh@gmail.com | Phone: 037 957 7352
        </p>
      </div>
    </footer>
  );
};

export default Footer;
