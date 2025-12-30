import { LoadingOutlined, CrownOutlined, GoogleOutlined } from '@ant-design/icons';
import { SIGNIN, ADMIN_DASHBOARD } from '@/constants/routes';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '@/redux/actions/authActions';
import { setAuthenticating, setAuthStatus } from '@/redux/actions/miscActions';

const AdminSignUp = () => {
  const { isAuthenticating, authStatus, auth } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus,
    auth: state.auth
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useScrollTop();
  useDocumentTitle('Đăng ký Admin | ECOFIT');

  useEffect(() => () => {
    dispatch(setAuthStatus(null));
    dispatch(setAuthenticating(false));
  }, []);

  // Redirect to admin dashboard if already logged in as admin
  useEffect(() => {
    if (auth && auth.role === 'ADMIN') {
      navigate(ADMIN_DASHBOARD);
    }
  }, [auth]);

  const onClickSignIn = () => navigate(SIGNIN);

  const onGoogleSignIn = () => {
    // Lưu flag để biết đây là đăng ký admin
    localStorage.setItem('adminSignup', 'true');
    dispatch(signInWithGoogle());
  };

  return (
    <div className="admin-signup-page">
      <div className="admin-signup-container">
        {authStatus?.success && (
          <div className="loader">
            <h3 className="toast-success auth-success">
              {authStatus?.message}
              <LoadingOutlined />
            </h3>
          </div>
        )}
        {!authStatus?.success && (
          <>
            {authStatus?.message && (
              <h5 className="text-center toast-error">
                {authStatus?.message}
              </h5>
            )}
            <div className={`admin-signup-card ${authStatus?.message && (!authStatus?.success && 'input-error')}`}>
              <div className="admin-signup-header">
                <div className="admin-icon">
                  <CrownOutlined />
                </div>
                <h2>Đăng ký tài khoản Admin</h2>
                <p>Đăng nhập với Google để trở thành quản trị viên</p>
              </div>

              <div className="admin-google-signup">
                <button
                  className="google-admin-btn"
                  disabled={isAuthenticating}
                  onClick={onGoogleSignIn}
                  type="button"
                >
                  {isAuthenticating ? (
                    <>
                      <LoadingOutlined />
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <GoogleOutlined />
                      <span>Đăng ký Admin với Google</span>
                    </>
                  )}
                </button>

                <div className="admin-note">
                  <p>⚠️ Tài khoản Google của bạn sẽ được cấp quyền Admin</p>
                </div>
              </div>

              <div className="admin-signup-footer">
                <span>Đã có tài khoản?</span>
                <button
                  className="button button-small button-border"
                  disabled={isAuthenticating}
                  onClick={onClickSignIn}
                  type="button"
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminSignUp;
