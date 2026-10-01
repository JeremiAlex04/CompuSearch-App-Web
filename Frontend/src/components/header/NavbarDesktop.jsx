import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import ProfileSelectorModal from "../auth/ProfileSelectorModal";
import { getProfileNavigation } from "../../utils/profileNavigation";
import NavLinksList from "./NavLinksList";

const NavbarDesktop = ({ secondary = false }) => {
    const navigate = useNavigate();
    const { isAuthenticated, tipoUsuario } = useAuthStatus();
    const { path, iconClass, text } = getProfileNavigation(isAuthenticated, tipoUsuario);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // TODO: Reemplazar con llamadas al contexto de carrito y favoritos real (ej: useCart)
    const cartCount = 0;
    const cartTotal = 0;

    const handleProfileClick = () => {
        if (path === "/modal-selector") {
            setIsModalOpen(true);
        } else {
            navigate(path);
        }
    };

    if (secondary) {
        return (
            <ul className="navbar-nav mx-auto" style={{ gap: "5rem" }}>
                <NavLinksList itemClassName="" linkClassName="nav-link" />
            </ul>
        );
    }

    return (
        <div className="d-none d-lg-flex align-items-center gap-4">
            <button onClick={handleProfileClick} className="user-account-btn" title={text}>
                <div className="user-icon-circle">
                    <i className={`bi ${iconClass} fs-5`}></i>
                    {isAuthenticated && <span className="status-dot"></span>}
                </div>
                <div>
                    <p className="user-text-small">{isAuthenticated ? 'Hola, de nuevo' : 'Hola, Ingresa'}</p>
                    <p className="user-text-large">{isAuthenticated ? 'Mi Cuenta' : 'Mi Cuenta'}</p>
                </div>
            </button>


            <NavLink to="/" className="cart-btn-wrapper" onClick={(e) => { e.preventDefault(); alert("Carrito en desarrollo"); }}>
                <div className="cart-icon-circle">
                    <i className="bi bi-cart3"></i>
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </div>
                <div className="cart-text">
                    <span className="cart-label">Carrito</span>
                    <span className="cart-amount">${cartTotal.toFixed(2)}</span>
                </div>
            </NavLink>

            {isModalOpen && (
                <ProfileSelectorModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    navigate={navigate}
                />
            )}
        </div>
    );
};

export default NavbarDesktop;
