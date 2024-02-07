import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="965008521931-eq4010ukchibqsc69orami7385pk5grm.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
