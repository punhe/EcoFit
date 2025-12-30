/* eslint-disable indent */
import { FilterOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Button, Badge as NextUIBadge } from '@nextui-org/react';
import * as ROUTE from '@/constants/routes';
import logo from '@/images/logo-full.png';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Link, NavLink, useLocation
} from 'react-router-dom';
import UserAvatar from '@/views/account/components/UserAvatar';
import BasketToggle from '../basket/BasketToggle';
import FiltersToggle from './FiltersToggle';
import MobileNavigation from './MobileNavigation';
import SearchBar from './SearchBar';

const Navigation = () => {
  const navbar = useRef(null);
  const { pathname } = useLocation();

  const store = useSelector((state) => ({
    basketLength: state.basket.length,
    user: state.auth,
    isAuthenticating: state.app.isAuthenticating,
    isLoading: state.app.loading
  }));

  const scrollHandler = () => {
    if (navbar.current && window.screen.width > 480) {
      if (window.pageYOffset >= 70) {
        navbar.current.classList.add('is-nav-scrolled');
      } else {
        navbar.current.classList.remove('is-nav-scrolled');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const onClickLink = (e) => {
    if (store.isAuthenticating) e.preventDefault();
  };

  // disable the basket toggle to these pathnames
  const basketDisabledpathnames = [
    ROUTE.CHECKOUT_STEP_1,
    ROUTE.CHECKOUT_STEP_2,
    ROUTE.CHECKOUT_STEP_3,
    ROUTE.SIGNIN,
    ROUTE.SIGNUP,
    ROUTE.FORGOT_PASSWORD
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (store.user && store.user.role === 'ADMIN') {
    return null;
  }

  if (window.screen.width <= 800) {
    return (
      <MobileNavigation
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...store}
        disabledPaths={basketDisabledpathnames}
        pathname={pathname}
      />
    );
  }

  const menuItems = [
    { name: 'Trang chủ', path: ROUTE.HOME },
    { name: 'Cửa hàng', path: ROUTE.SHOP },
    { name: 'Nổi bật', path: ROUTE.FEATURED_PRODUCTS },
    { name: 'Đề xuất', path: ROUTE.RECOMMENDED_PRODUCTS },
  ];

  return (
    <Navbar
      ref={navbar}
      onMenuOpenChange={setIsMenuOpen}
      isBordered={false}
      isBlurred={isScrolled}
      className={`vintage-navbar ${isScrolled ? 'scrolled' : ''}`}
      maxWidth="full"
      height="80px"
      style={{
        background: isScrolled ? 'rgba(253, 248, 243, 0.95)' : 'rgba(253, 248, 243, 0.9)',
        borderBottom: '1px solid rgba(196, 163, 90, 0.2)',
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          style={{ color: '#8B4513' }}
        />
        <NavbarBrand>
          <Link onClick={onClickLink} to="/">
            <img
              alt="EcoFit - Đồ cũ chất lượng"
              src={logo}
              style={{
                height: '45px',
                filter: 'sepia(15%)',
                transition: 'filter 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.filter = 'sepia(0%)'}
              onMouseLeave={(e) => e.target.style.filter = 'sepia(15%)'}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `vintage-nav-link ${isActive ? 'active' : ''}`
              }
              style={({ isActive }) => ({
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.5rem',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? '#8B4513' : '#5D4E37',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                padding: '0.5rem 1rem',
                position: 'relative',
                transition: 'color 0.3s ease',
              })}
            >
              {item.name}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-3">
        {(pathname === ROUTE.SHOP || pathname === ROUTE.SEARCH) && (
          <NavbarItem>
            <FiltersToggle>
              <Button
                variant="bordered"
                size="sm"
                startContent={<FilterOutlined />}
                style={{
                  borderColor: '#8B4513',
                  color: '#8B4513',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                }}
              >
                Bộ lọc
              </Button>
            </FiltersToggle>
          </NavbarItem>
        )}

        <NavbarItem>
          <SearchBar />
        </NavbarItem>

        <NavbarItem>
          <BasketToggle>
            {({ onClickToggle }) => (
              <Button
                isIconOnly
                variant="light"
                onClick={onClickToggle}
                isDisabled={basketDisabledpathnames.includes(pathname)}
                className="relative"
                style={{ color: '#8B4513' }}
              >
                <ShoppingOutlined style={{ fontSize: '1.5rem' }} />
                {store.basketLength > 0 && (
                  <NextUIBadge
                    content={store.basketLength}
                    color="warning"
                    shape="circle"
                    size="sm"
                    className="absolute -top-1 -right-1"
                    style={{
                      background: '#C4A35A',
                      color: '#fff',
                    }}
                  >
                    <span />
                  </NextUIBadge>
                )}
              </Button>
            )}
          </BasketToggle>
        </NavbarItem>

        {store.user ? (
          <NavbarItem>
            <UserAvatar />
          </NavbarItem>
        ) : (
          <>
            {pathname !== ROUTE.SIGNUP && (
              <NavbarItem>
                <Button
                  as={Link}
                  to={ROUTE.SIGNUP}
                  onClick={onClickLink}
                  variant="bordered"
                  size="sm"
                  style={{
                    borderColor: '#8B4513',
                    color: '#8B4513',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Đăng ký
                </Button>
              </NavbarItem>
            )}
            {pathname !== ROUTE.SIGNIN && (
              <NavbarItem>
                <Button
                  as={Link}
                  to={ROUTE.SIGNIN}
                  onClick={onClickLink}
                  size="sm"
                  style={{
                    background: '#8B4513',
                    color: '#fff',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Đăng nhập
                </Button>
              </NavbarItem>
            )}
          </>
        )}
      </NavbarContent>

      <NavbarMenu
        style={{
          background: 'rgba(253, 248, 243, 0.98)',
          paddingTop: '2rem',
        }}
      >
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.path}-${index}`}>
            <Link
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'block',
                padding: '1rem 0',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.8rem',
                fontWeight: pathname === item.path ? '700' : '400',
                color: pathname === item.path ? '#8B4513' : '#5D4E37',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(196, 163, 90, 0.2)',
              }}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Navigation;
