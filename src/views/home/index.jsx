import { ArrowRightOutlined, ShopOutlined, SafetyOutlined, CarOutlined, CustomerServiceOutlined, HeartOutlined, StarOutlined } from "@ant-design/icons";
import { Button, Image, Link as NextUILink, Spacer } from "@nextui-org/react";
import { MessageDisplay } from "@/components/common";
import { ProductShowcaseGrid } from "@/components/product";
import {
  FEATURED_PRODUCTS,
  RECOMMENDED_PRODUCTS,
  SHOP,
} from "@/constants/routes";
import {
  useDocumentTitle,
  useFeaturedProducts,
  useRecommendedProducts,
  useScrollTop,
} from "@/hooks";
import bannerImg from "@/images/banner-girl.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useDocumentTitle("ECOFIT | Cửa hàng đồ cũ chất lượng");
  useScrollTop();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended,
  } = useRecommendedProducts(6);

  return (
    <main className="content">
      <div className="home">
        {/* Vintage Hero Banner with Animations */}
        <div className={`vintage-hero-section ${isVisible ? 'animate-in' : ''}`}>
          <div className="vintage-hero-container">
            <div className="vintage-hero-content">
              <span className="vintage-hero-badge animate-fadeInDown">
                <StarOutlined style={{ marginRight: '8px' }} />
                Đồ cũ chất lượng
                <StarOutlined style={{ marginLeft: '8px' }} />
              </span>
              <h1 className="vintage-hero-title animate-fadeInUp">
                Khám phá <span className="highlight">vẻ đẹp</span> của những món đồ <span className="highlight">độc đáo</span>
              </h1>
              <p className="vintage-hero-description animate-fadeInUp delay-200">
                Mỗi món đồ đều có một câu chuyện riêng. Tìm kiếm những báu vật vintage,
                đồ nội thất secondhand và những vật phẩm độc đáo với giá cả phải chăng.
              </p>
              <div className="vintage-hero-actions animate-fadeInUp delay-400">
                <Button
                  as={Link}
                  to={SHOP}
                  size="lg"
                  className="vintage-btn-primary hover-glow"
                  endContent={<ArrowRightOutlined />}
                >
                  Khám phá ngay
                </Button>
                <Button
                  as={Link}
                  to={FEATURED_PRODUCTS}
                  variant="bordered"
                  size="lg"
                  className="vintage-btn-secondary"
                >
                  Xem nổi bật
                </Button>
              </div>

              {/* Stats */}
              <div className="vintage-stats animate-fadeInUp delay-600">
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Sản phẩm</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Khách hàng</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">5★</span>
                  <span className="stat-label">Đánh giá</span>
                </div>
              </div>
            </div>
            <div className="vintage-hero-image animate-fadeInRight delay-300">
              <div className="vintage-image-frame hover-float">
                <Image
                  src={bannerImg}
                  alt="EcoFit - Đồ cũ chất lượng"
                  className="hero-img hover-sepia"
                />
                {/* Floating badges */}
                <div className="floating-badge badge-1 animate-float">
                  <HeartOutlined /> Yêu thích
                </div>
                <div className="floating-badge badge-2 animate-float delay-300">
                  <StarOutlined /> Chất lượng
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="hero-decoration deco-1"></div>
          <div className="hero-decoration deco-2"></div>
        </div>

        {/* Vintage Features Bar */}
        <div className="vintage-features-bar">
          <div className="vintage-feature-item animate-fadeInUp">
            <div className="feature-icon-wrapper hover-scale">
              <CarOutlined className="feature-icon" />
            </div>
            <div className="feature-text">
              <strong>Giao hàng tận nơi</strong>
              <span>Toàn quốc</span>
            </div>
          </div>
          <div className="vintage-feature-item animate-fadeInUp delay-100">
            <div className="feature-icon-wrapper hover-scale">
              <SafetyOutlined className="feature-icon" />
            </div>
            <div className="feature-text">
              <strong>Đảm bảo chất lượng</strong>
              <span>Kiểm tra kỹ lưỡng</span>
            </div>
          </div>
          <div className="vintage-feature-item animate-fadeInUp delay-200">
            <div className="feature-icon-wrapper hover-scale">
              <ShopOutlined className="feature-icon" />
            </div>
            <div className="feature-text">
              <strong>Đồ độc đáo</strong>
              <span>Hàng vintage hiếm</span>
            </div>
          </div>
          <div className="vintage-feature-item animate-fadeInUp delay-300">
            <div className="feature-icon-wrapper hover-scale">
              <CustomerServiceOutlined className="feature-icon" />
            </div>
            <div className="feature-text">
              <strong>Hỗ trợ 24/7</strong>
              <span>Tư vấn nhiệt tình</span>
            </div>
          </div>
        </div>

        <Spacer y={12} />

        {/* Featured Products Section */}
        <div className="vintage-section">
          <div className="vintage-section-header">
            <div className="section-ornament animate-pulse">❧</div>
            <h2 className="section-title">Sản phẩm nổi bật</h2>
            <p className="section-subtitle">Những món đồ được yêu thích nhất</p>
            <div className="section-line"></div>
          </div>
          {errorFeatured && !isLoadingFeatured ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Thử lại"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts}
              skeletonCount={6}
            />
          )}
          <div className="section-view-all">
            <NextUILink
              as={Link}
              to={FEATURED_PRODUCTS}
              className="vintage-link hover-glow"
            >
              Xem tất cả sản phẩm nổi bật
              <ArrowRightOutlined style={{ marginLeft: '8px' }} />
            </NextUILink>
          </div>
        </div>

        <Spacer y={12} />

        {/* Vintage CTA Banner with parallax effect */}
        <div className="vintage-cta-banner">
          <div className="cta-content">
            <div className="cta-icon animate-float">
              <HeartOutlined />
            </div>
            <h3>Bạn có đồ cũ muốn bán?</h3>
            <p>Hãy để chúng tôi giúp bạn tìm chủ nhân mới cho những món đồ yêu thương</p>
            <Button className="vintage-btn-gold hover-scale">
              Liên hệ ngay
              <ArrowRightOutlined style={{ marginLeft: '8px' }} />
            </Button>
          </div>
        </div>

        <Spacer y={12} />

        {/* Recommended Products Section */}
        <div className="vintage-section">
          <div className="vintage-section-header">
            <div className="section-ornament animate-pulse">✦</div>
            <h2 className="section-title">Đề xuất cho bạn</h2>
            <p className="section-subtitle">Được chọn lọc dựa trên xu hướng</p>
            <div className="section-line"></div>
          </div>
          {errorRecommended && !isLoadingRecommended ? (
            <MessageDisplay
              message={errorRecommended}
              action={fetchRecommendedProducts}
              buttonLabel="Thử lại"
            />
          ) : (
            <ProductShowcaseGrid
              products={recommendedProducts}
              skeletonCount={6}
            />
          )}
          <div className="section-view-all">
            <NextUILink
              as={Link}
              to={RECOMMENDED_PRODUCTS}
              className="vintage-link hover-glow"
            >
              Xem tất cả sản phẩm đề xuất
              <ArrowRightOutlined style={{ marginLeft: '8px' }} />
            </NextUILink>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <Spacer y={12} />
        <div className="vintage-why-us">
          <div className="vintage-section-header">
            <div className="section-ornament">❦</div>
            <h2 className="section-title">Tại sao chọn EcoFit?</h2>
            <p className="section-subtitle">Cam kết mang đến trải nghiệm tốt nhất</p>
            <div className="section-line"></div>
          </div>

          <div className="why-us-grid">
            <div className="why-us-card animate-fadeInUp hover-float">
              <div className="card-icon">🏆</div>
              <h4>Chất lượng đảm bảo</h4>
              <p>Mọi sản phẩm đều được kiểm tra kỹ lưỡng trước khi đến tay khách hàng</p>
            </div>
            <div className="why-us-card animate-fadeInUp delay-200 hover-float">
              <div className="card-icon">💰</div>
              <h4>Giá cả hợp lý</h4>
              <p>Tiết kiệm đến 70% so với mua mới với chất lượng tương đương</p>
            </div>
            <div className="why-us-card animate-fadeInUp delay-400 hover-float">
              <div className="card-icon">🌿</div>
              <h4>Bảo vệ môi trường</h4>
              <p>Góp phần giảm rác thải và bảo vệ hành tinh xanh</p>
            </div>
          </div>
        </div>

        <Spacer y={8} />
      </div>
    </main>
  );
};

export default Home;
