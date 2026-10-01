import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { AuthProvider } from "./context/AuthProvider";

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  const { worker } = await import('./mocks/browser')
  return worker.start({
    onUnhandledRequest(request, print) {
      // Ignorar navegación general y recursos estáticos para evitar "Failed to fetch" de MSW
      if (request.mode === 'navigate' || request.url.includes('/src/') || request.url.includes('@vite')) {
        return;
      }
      // Para cualquier otro unhandled, simplemente se deja pasar silenciosamente
    }
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
});

