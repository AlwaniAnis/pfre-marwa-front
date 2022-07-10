import FormData from "form-data";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { msalInstance } from "..";
import { loginRequest } from "../authConfig";

export const TndevContext = createContext({ loguedIn: true });

export const TndevCtx = () => {
  return useContext(TndevContext);
};

// config

console.clear();
// console.warn("Contact Developer:");
// console.warn("Name: CH");
// console.warn("Website: https://tndev-art.tn");
// console.warn("WhatsApp/Tel: +216 55 38 54 74");
// console.warn("Email: tndev8@gmail.com");
// console.warn("facebook: https://www.facebook.com/TndevArt");

console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_BASE_API_ENDPOINT);

const api = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: process.env.REACT_APP_BASE_API_ENDPOINT,
});

api.interceptors.request.use(async function (config) {
  let accessToken = null;
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: account,
  });
  accessToken = response.accessToken;

  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  // .then((response) => {

  // });
  console.log("anisssssssssssssssss");
  // const token = Cookies.get("token3s") ? Cookies.get("token3s") : null;
  return config;
});

// authMethods  zone  --> loginController
export const apiLogin = async (cred) => {
  let url = "/login";
  const { data } = await api.post(url, cred);
  return data;
};

// authMethods  zone  --> loginController
export const apiLogout = async () => {
  let url = "/logout";
  const { data } = await api.get(url);
  return data;
};

const authMethods = {
  apiLogin,
  apiLogout,
};
// incidents  zone  --> IncidenController
export const apiIncidentsAll = async (
  statut = "",
  priority = "",
  page,
  take
) => {
  console.log("test");
  let payload = {
    params: {
      statut,
      priority,
      page,
      take,
    },
  };
  let url = "/incident";
  const { data } = await api.get(url, payload);
  console.log(data);
  return data;
};
export const apiIncidentsAllValidations = async (
  statut = "",
  priority = "",
  page,
  take
) => {
  console.log("test");
  let payload = {
    params: {
      statut,
      priority,
      page,
      take,
    },
  };
  let url = "/incident/getValidations";
  const { data } = await api.get(url, payload);
  console.log(data);
  return data;
};
export const apiIncidentCreate = async (dt) => {
  let url = "/incident";
  const { data } = await api.post(url, dt, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return data;
};

export const apiIncidentDelete = async (id) => {
  let payload = {
    params: {},
  };
  let url = "/incident/" + id;
  const { data } = await api.delete(url, payload);
  return data;
};

export const apiIncidentUpdate = async (payload) => {
  console.log(payload);

  let url = "/incident";
  const { data } = await api.put(url, payload, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return data;
};

export const incidentsMethods = {
  apiIncidentsAll,
  apiIncidentDelete,
  apiIncidentCreate,
  apiIncidentUpdate,
  apiIncidentsAllValidations,
};

// interventions  zone  --> interventionController
export const apiInterventionsAll = async (order = "asc") => {
  let payload = {
    params: {
      order,
    },
  };
  let url = "/intervention";
  const { data } = await api.get(url, payload);
  console.log(data);
  return data;
};

export const apiInterventionCreate = async (dt) => {
  let url = "/intervention";
  const { data } = await api.post(url, dt);
  return data;
};

export const apiInterventionDelete = async (id) => {
  let payload = {
    params: {},
  };
  let url = "/intervention/" + id;
  const { data } = await api.delete(url, payload);
  return data;
};

export const apiInterventionUpdate = async (payload) => {
  console.log(payload);

  let url = "/intervention";
  const { data } = await api.put(url, payload);
  return data;
};

export const interventionsMethods = {
  apiInterventionsAll,
  apiInterventionCreate,
  apiInterventionDelete,
  apiInterventionUpdate,
};

// Tache  zone  --> TacheController
export const apiTachesAll = async (order = "asc") => {
  let payload = {
    params: {
      order,
    },
  };
  let url = "/tache";
  const { data } = await api.get(url, payload);
  return data;
};

export const apiTacheCreate = async (dt) => {
  let url = "/tache";
  const { data } = await api.post(url, dt);
  return data;
};

export const apiTacheDelete = async (id) => {
  let payload = {
    params: {},
  };
  let url = "/tache/" + id;
  const { data } = await api.delete(url, payload);
  return data;
};

export const apiTacheUpdate = async (payload) => {
  console.log(payload);

  let url = "/tache";
  const { data } = await api.put(url, payload);
  return data;
};

export const tachesMethods = {
  apiTachesAll,
  apiTacheDelete,
  apiTacheUpdate,
  apiTacheCreate,
};
// event  zone  --> eventController
export const apiEventsAll = async (tri = "asc") => {
  let payload = {
    params: {
      tri: tri,
    },
  };
  let url = "/event";
  const { data } = await api.get(url, payload);
  return data;
};

export const apiEventCreate = async (dt) => {
  let url = "/event";
  const { data } = await api.post(url, dt);
  return data;
};

export const apiEventDelete = async (id) => {
  let payload = {
    params: {},
  };
  let url = "/event/" + id;
  const { data } = await api.delete(url, payload);
  return data;
};

export const apiEventUpdate = async (dt) => {
  let payload = {
    id: dt.id,
    data: dt.data,
  };
  console.log(payload);

  let url = "/event";
  const { data } = await api.put(url, payload);
  return data;
};

export const eventsMethods = {
  apiEventsAll,
  apiEventDelete,
  apiEventUpdate,
  apiEventCreate,
};
// Validations  zone  --> ValidationController
export const apiValidationsAll = async (tri = "asc") => {
  let payload = {
    params: {
      tri: tri,
    },
  };
  let url = "/validation";
  const { data } = await api.get(url, payload);
  return data;
};

export const apiAskToCloseIncident = async (dt) => {
  let payload = {
    id: dt.id,
    data: dt.data,
  };
  console.log(payload);

  let url = "/ask-to-close-incident";
  const { data } = await api.put(url, payload);
  return data;
};
export const apiCloseTache = async (dt) => {
  let payload = {
    id: dt.id,
    data: dt.data,
  };
  console.log(payload);

  let url = "/close-tache";
  const { data } = await api.put(url, payload);
  return data;
};
export const apiCloseIntervention = async (dt) => {
  let payload = {
    id: dt.id,
    data: dt.data,
  };
  console.log(payload);

  let url = "/close-intervention";
  const { data } = await api.put(url, payload);
  return data;
};

export const validationsMethods = {
  apiValidationsAll,
  apiAskToCloseIncident,
  apiCloseIntervention,
  apiCloseTache,
};

// Stat  zone  --> StatController
export const apiStatAll = async () => {
  let url = "/statistics";
  const { data } = await api.get(url);
  return data;
};

export const TndevProvider = ({ children }) => {
  // init check
  const [loguedIn, setLoguedIn] = useState(
    Cookies.get("token3s") ? true : false
  );
  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : ""
  );
  const [role, setRole] = useState("admin");
  const [incidents, setincidents] = useState([]);
  const [total, settotal] = useState(0);

  const [interventions, setinterventions] = useState([]);
  const [taches, setTaches] = useState([]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [events, setevents] = useState([]);
  const states = {
    openDrawer,
    events,
    setevents,
    setOpenDrawer,
    loguedIn,
    setLoguedIn,
    user,
    setUser,
    incidents,
    setincidents,
    interventions,
    setinterventions,
    taches,
    setTaches,
    total,
    settotal,
    role,
    setRole,
  };

  return (
    <TndevContext.Provider value={states}>{children}</TndevContext.Provider>
  );
};
