import React, { useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MEMBER_TYPES } from '../../utils/constants.js';
import { useAuth } from '../../services/auth.jsx';

export default function LoginPage() {
  const auth = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const from = useMemo(() => {
    const stateFrom = location.state?.from?.pathname;
    return typeof stateFrom === 'string' ? stateFrom : null;
  }, [location.state]);

  const [memberType, setMemberType] = useState(MEMBER_TYPES.FEDEX);
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('demo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (auth.isAuthed) {
    const fallback = auth.isFedEx ? '/fedex/dashboard' : '/dca/dashboard';
    return <Navigate to={from || fallback} replace />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await auth.login({ username, password, memberType });
      const dest =
        memberType === MEMBER_TYPES.FEDEX
          ? '/fedex/dashboard'
          : '/dca/dashboard';
      nav(from || dest, { replace: true });
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-auth-bg">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card app-card">
            <div className="card-body p-4">
              <h4 className="mb-1">Sign in</h4>
              <div className="muted mb-4">
                Choose member type and continue.
              </div>

              {error ? (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              ) : null}

              <form onSubmit={onSubmit}>
                {/* ✅ MEMBER TYPE TOGGLE (UPDATED) */}
                <div className="mb-3">
                  <label className="form-label">Member type</label>

                  <div className="member-toggle">
                    <input
                      type="radio"
                      id="fedex"
                      checked={memberType === MEMBER_TYPES.FEDEX}
                      onChange={() => setMemberType(MEMBER_TYPES.FEDEX)}
                    />
                    <label htmlFor="fedex">🏢 Enterprise</label>

                    <input
                      type="radio"
                      id="dca"
                      checked={memberType === MEMBER_TYPES.DCA}
                      onChange={() => setMemberType(MEMBER_TYPES.DCA)}
                    />
                    <label htmlFor="dca">🏦 DCA</label>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control login-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>

                <button
                  className="btn btn-primary w-100 login-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? '🔐 Authenticating…' : 'Secure Login →'}
                </button>

                <div className="muted small mt-3">
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
