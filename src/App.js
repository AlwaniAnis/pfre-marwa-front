import "./App.css";
import Navbarr from "./components/Navbarr";
// pages
import Login from "./pages/auth/Login";
import Calendrier from "./pages/calendrier/Calendrier";
import Incidents from "./pages/incidents/Incidents";
import Interventions from "./pages/interventions/Interventions";
import Validations from "./pages/validations/Validations";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
} from "@azure/msal-react";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  useNavigate,
  Route,
} from "react-router-dom";

import Taches from "./pages/taches/Taches";
import Stats from "./pages/stats/Stats";
// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { CustomNavigationClient } from "./utils/NavigationClient";
import SignInSignOutButton from "./components/SignInSignOutButton ";
import { useEffect } from "react";
import { callMsGraph } from "./utils/MsGraphApiCall";

function App({ pca }) {
  // const history = useNavigate();
  // const navigationClient = new CustomNavigationClient(history);
  // pca.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={pca}>
      <Router>
        <Navbarr />
        <Routes>
          <Route
            path="/"
            element={
              <UnauthenticatedTemplate>
                <UNAUTH />
              </UnauthenticatedTemplate>
            }
          />
          <Route
            path="/calendrier"
            element={
              <>
                <AuthenticatedTemplate>
                  <Calendrier />
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                  <UNAUTH />
                </UnauthenticatedTemplate>
              </>
            }
          />
          <Route
            path="/incidents"
            element={
              <>
                <AuthenticatedTemplate>
                  <Incidents />
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                  <UNAUTH />
                </UnauthenticatedTemplate>
              </>
            }
          />
          <Route
            path="/interventions"
            element={
              <>
                <AuthenticatedTemplate>
                  <Interventions />
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                  <UNAUTH />
                </UnauthenticatedTemplate>
              </>
            }
          />
          <Route
            path="/taches"
            element={
              <>
                <AuthenticatedTemplate>
                  <Taches />
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                  <UNAUTH />
                </UnauthenticatedTemplate>
              </>
            }
          />
          <Route
            path="/validations"
            element={
              <>
                <AuthenticatedTemplate>
                  <Validations />
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                  <UNAUTH />
                </UnauthenticatedTemplate>
              </>
            }
          />
          <Route
            path="/stats"
            element={
              <>
                <AuthenticatedTemplate>
                  <Stats />
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                  <UNAUTH />
                </UnauthenticatedTemplate>
              </>
            }
          />
          <Route
            path="*"
            element={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "9rem",
                  fontSize: "3rem",
                }}
              >
                page: 404
              </div>
            }
          />
        </Routes>
      </Router>
    </MsalProvider>
  );
}

export default App;
const UNAUTH = () => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    }}
  >
    <SignInSignOutButton />
  </div>
);
