import React from "react";

const FooterBottom = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="footer-bottom text-center">
            <small>© {currentYear} Grupo CompuSearch - Todos los derechos reservados</small>
        </div>
    );
};

export default FooterBottom;