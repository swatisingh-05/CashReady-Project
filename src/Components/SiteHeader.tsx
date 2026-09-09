import { useNavigate } from "react-router-dom";

export default function SiteHeader() {
  const navigate = useNavigate();

  return (
    <div className="site-header-shell">
      <header className="brand-header">
        <button className="brand-lockup" type="button" onClick={() => navigate("/")}>
          <span className="brand-icon">♜</span><span>CashReady</span>
        </button>
        <div className="site-search">
          <span>⌕</span>
          <input aria-label="Search" placeholder="What are you looking for today?" />
        </div>
        <button className="login-button" type="button" onClick={() => navigate("/home")}>Login</button>
      </header>
      <nav className="main-nav" aria-label="Main navigation">
        <button type="button" onClick={() => navigate("/home")}>Dashboard</button>
        <button type="button" onClick={() => navigate("/map")}>ATM Locator</button>
        <button type="button" onClick={() => navigate("/forecasting")}>Cash Forecasting</button>
        <button type="button" onClick={() => navigate("/banker-dashboard")}>Bank Analytics</button>
        <button type="button" onClick={() => navigate("/operations")}>Operations Center</button>
        <button type="button" onClick={() => navigate("/reports")}>Reports</button>
        <button type="button" onClick={() => navigate("/contact")}>Contact</button>
      </nav>
    </div>
  );
}