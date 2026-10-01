import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { getProfileNavigation } from "../../utils/profileNavigation";

const RedirectIfAuthenticated = ({ children }) => {
    const { tipoUsuario, sessionReady } = useAuth();

    if (!sessionReady) return null;

    if (tipoUsuario) {
        const { path } = getProfileNavigation(true, tipoUsuario);
        return <Navigate to={path} replace />;
    }

    return children;
};

export default RedirectIfAuthenticated;
