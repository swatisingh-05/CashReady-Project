import { useLocation, useNavigate } from "react-router-dom";

export default function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (paths: string[]) => paths.includes(location.pathname);

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
        <button className={isActive(["/", "/home"]) ? "active" : ""} type="button" onClick={() => navigate("/home")}>Dashboard</button>
        <button className={isActive(["/map"]) ? "active" : ""} type="button" onClick={() => navigate("/map")}>ATM Locator</button>
        <button className={isActive(["/forecasting"]) ? "active" : ""} type="button" onClick={() => navigate("/forecasting")}>Cash Forecasting</button>
        <button className={isActive(["/banker-dashboard"]) ? "active" : ""} type="button" onClick={() => navigate("/banker-dashboard")}>Bank Analytics</button>
        <button className={isActive(["/operations"]) ? "active" : ""} type="button" onClick={() => navigate("/operations")}>Operations Center</button>
        <button className={isActive(["/reports"]) ? "active" : ""} type="button" onClick={() => navigate("/reports")}>Reports</button>
        <button className={isActive(["/contact"]) ? "active" : ""} type="button" onClick={() => navigate("/contact")}>Contact</button>
      </nav>
    </div>
  );
}