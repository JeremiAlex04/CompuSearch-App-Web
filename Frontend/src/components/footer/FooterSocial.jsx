import React from "react";

const FooterSocial = () => (
    <>
        <h6 className="fw-bold">LEGAL</h6>
        <ul className="list-unstyled">
            <li>
                <a href="#" className="footer-link">Términos de uso</a>
            </li>
            <li>
                <a href="#" className="footer-link">Políticas de Privacidad</a>
            </li>
        </ul>

        <h6 className="fw-bold mt-4">SÍGUENOS</h6>
        <div className="d-flex justify-content-center justify-content-md-start gap-3">
            <a href="#" className="footer-social-icon" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" className="footer-social-icon" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="footer-social-icon" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
            </a>
        </div>
    </>
);

export default FooterSocial;
