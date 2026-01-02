import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Mail, Contact, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/dashboard">
                    <div className="brand-icon">
                        <Contact size={24} />
                    </div>
                    <div>
                        <div className="brand-title">Contact Manager</div>
                        <small className="brand-subtitle">Manage your contacts</small>
                    </div>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                                to="/dashboard"
                            >
                                <LayoutDashboard size={18} className="me-2" />
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                                to="/"
                            >
                                <Mail size={18} className="me-2" />
                                Contact Form
                            </Link>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <button
                                onClick={toggleTheme}
                                className="btn btn-sm btn-outline-light rounded-circle theme-toggle"
                                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
