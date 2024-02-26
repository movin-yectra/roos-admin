import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/main.scss";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-loading-skeleton/dist/skeleton.css";
import "react-datepicker/dist/react-datepicker.css";

//Phone number css
import "react-phone-input-2/lib/style.css";

//react text editer css
import "react-quill/dist/quill.snow.css";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";

import LoadingAppAlertProvider from "./common/hooks/useAppAlert";

//azure msal and config
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./config/auth";
import { MsalProvider } from "@azure/msal-react";

//msal logic
const msalInstance = new PublicClientApplication(msalConfig);

if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  msalInstance.setActiveAccount(msalInstance.getActiveAccount());
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const accounts = event.payload;
    msalInstance.setActiveAccount(accounts[0]);
  }
});

function RootComponent() {
  return (
    <Router>
      <Provider store={store}>
        <LoadingAppAlertProvider>
          <MsalProvider instance={msalInstance}>
            <App />
          </MsalProvider>
        </LoadingAppAlertProvider>
      </Provider>
    </Router>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RootComponent />);
