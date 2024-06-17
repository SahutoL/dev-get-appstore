import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import OneSignal from "react-onesignal";

OneSignal.init({
  appId: import.meta.env.VITE_PUBLIC_ONESIGNAL_APP_ID || "",
});

OneSignal.showSlidedownPrompt();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
