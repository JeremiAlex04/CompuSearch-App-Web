import React, { useEffect } from "react";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";
import SearchBar from "./SearchBar";
import { NavLink, Link, useLocation } from "react-router-dom";

import Logo from "../../assets/logo/CompuSearch_Logo.gif";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import './Header.css';

const Header = () => {
    const location = useLocation();

    useEffect(() => {
        const navbarCollapse = document.getElementById("navbarCompuSearch");

        if (!navbarCollapse) return;

        const handleClickOutside = (event) => {
            const isOpen = navbarCollapse?.classList.contains("show");
            if (isOpen && !navbarCollapse.contains(event.target)) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                bsCollapse?.hide();
            }
        };

        const handleNavLinkClick = () => {
            const isOpen = navbarCollapse?.classList.contains("show");
            if (isOpen) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                bsCollapse?.hide();
            }
        };

        const handleCollapseShow = () => {
            document.body.classList.add("no-pointer-events");
            navbarCollapse.classList.add("allow-pointer-events");
        };

        const handleCollapseHide = () => {
            document.body.classList.remove("no-pointer-events");
            navbarCollapse.classList.remove("allow-pointer-events");
        };

        navbarCollapse.addEventListener("shown.bs.collapse", handleCollapseShow);
        navbarCollapse.addEventListener("hidden.bs.collapse", handleCollapseHide);

        const navTriggers = navbarCollapse.querySelectorAll("a.nav-link, .nav-close-trigger");
        navTriggers.forEach((el) => el.addEventListener("click", handleNavLinkClick));

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            navTriggers.forEach((el) => el.removeEventListener("click", handleNavLinkClick));
            navbarCollapse.removeEventListener("shown.bs.collapse", handleCollapseShow);
            navbarCollapse.removeEventListener("hidden.bs.collapse", handleCollapseHide);
            document.body.classList.remove("no-pointer-events");
        };
    }, []);

    return (
        <>
            <style>{`
            body.no-pointer-events {
                pointer-events: none !important;
            }
            .allow-pointer-events {
                pointer-events: auto !important;
            }
            `}</style>

            <header className="fixed-top">
                {/* MOBILE NAVBAR (d-lg-none) */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary d-lg-none">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand d-flex align-items-center" to="/">
                            <img src={Logo} alt="Logo" height="50" className="me-2" />
                        </NavLink>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCompuSearch"
                            aria-controls="navbarCompuSearch"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarCompuSearch">
                            <NavbarMobile />
                            <SearchBar />
                        </div>
                    </div>
                </nav>

                {/* DESKTOP NAVBAR (d-none d-lg-block) */}
                <div className="d-none d-lg-block">
                    {/* Top Bar */}
                    <div className="header-top-bar px-4 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-4">
                            <span><i className="bi bi-telephone me-2"></i>Atención al Cliente: <strong>(01) 800-COMPU</strong></span>
                        </div>
                        <div className="d-flex align-items-center gap-4">
                            <NavLink to="/tiendas" className="text-decoration-none" style={{color: 'inherit'}}><i className="bi bi-geo-alt me-2"></i>Tiendas</NavLink>
                            <span style={{cursor: 'pointer'}}>USD ($) <i className="bi bi-chevron-down ms-1" style={{fontSize: '0.7rem'}}></i></span>
                            <span style={{cursor: 'pointer'}}>ES</span>
                        </div>
                    </div>

                    {/* Middle Bar */}
                    <div className="header-middle-bar px-4 d-flex justify-content-between align-items-center">
                        <NavLink className="d-flex align-items-center text-decoration-none" to="/">
                            <img src={Logo} alt="Logo" height="60" className="me-2 rounded-3" />
                        </NavLink>

                        <div className="flex-grow-1 mx-4">
                            <SearchBar />
                        </div>

                        <NavbarDesktop />
                    </div>

                    {/* Bottom Bar */}
                    <div className="header-bottom-bar px-4 d-flex align-items-center gap-2">
                        <Link to="/builds" className={`btn-arma-pc me-3 ${location.pathname === '/builds' ? 'active' : ''}`}>
                            Arma tu PC <span className="badge-custom badge-blue">TOOL</span>
                        </Link>
                        <Link to="/" className={`bottom-nav-link ${location.pathname === '/' ? 'active' : ''}`}>Inicio</Link>
                        <Link to="/componentes" className={`bottom-nav-link ${location.pathname === '/componentes' && !location.search ? 'active' : ''}`}>
                            Componentes <i className="bi bi-chevron-down ms-1 mt-1" style={{fontSize: '0.7rem'}}></i>
                        </Link>
                        <Link to="/categorias" className={`bottom-nav-link ${location.pathname.startsWith('/categorias') ? 'active' : ''}`}>
                            Categorías <i className="bi bi-chevron-down ms-1 mt-1" style={{fontSize: '0.7rem'}}></i>
                        </Link>
                        <Link to="/componentes?search=laptops" className={`bottom-nav-link ${location.search.includes('laptops') ? 'active' : ''}`}>
                            Laptops & Equipos <i className="bi bi-chevron-down ms-1 mt-1" style={{fontSize: '0.7rem'}}></i>
                        </Link>
                        <Link to="/componentes?search=perifericos" className={`bottom-nav-link ${location.search.includes('perifericos') ? 'active' : ''}`}>
                            Periféricos & Monitores
                        </Link>
                        
                        <div className="ms-auto d-flex align-items-center">
                            <Link to="/componentes?search=ofertas" className={`bottom-nav-link text-warning fw-bold me-3 ${location.search.includes('ofertas') ? 'active' : ''}`}>
                                Ofertas Destacadas
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
