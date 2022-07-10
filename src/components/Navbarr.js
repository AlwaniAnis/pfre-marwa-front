import * as React from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";

import { TndevCtx } from "../contexts/TndevContext";
import Cookies from "js-cookie";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";

import MoreIcon from "@mui/icons-material/MoreVert";

import Drawers from "./Drawers";
import SignInSignOutButton from "./SignInSignOutButton ";
import WelcomeName from "./WelcomeName";
import { loginRequest } from "../authConfig";
import { callMsGraph } from "../utils/MsGraphApiCall";
import { useEffect } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbarr() {
  const { instance, inProgress } = useMsal();

  const states = TndevCtx();
  const isAuthenticated = useIsAuthenticated();
  const { loguedIn, setLoguedIn, user, setUser, role, setRole } = states;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <SignInSignOutButton />
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAuthenticated && <WelcomeName />}
      <SignInSignOutButton />
    </Menu>
  );

  const preventDefault = (event) => event.preventDefault();

  const [state, setState] = React.useState({
    left: false,
    top: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      callMsGraph()
        .then((response) => {
          console.log("test");
          console.log(response);
        })
        .catch((e) => {
          if (e instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
              ...loginRequest,
              account: instance.getActiveAccount(),
            });
          }
        });
    }
    if (isAuthenticated) {
      setLoguedIn(isAuthenticated);
      let a = instance.getActiveAccount();
      setUser(a);
      setRole(a.idTokenClaims.roles[0]);
    }
  }, [inProgress, instance]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawers state={state} anchor={state.left} toggleDrawer={toggleDrawer} />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
          color: "Khaki",
        }}
      >
        <Toolbar
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
            //  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
            color: "Khaki",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1, display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer(Object.keys(state)[0], true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            // noWrap
            component="div"
            sx={{
              display: { xs: "block", sm: "block" },
              fontSize: { xs: "1rem", md: "1.5rem" },
            }}
          >
            3S
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ width: "50%", color: "orange" }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                typography: "body",

                "& > :not(style) + :not(style)": {
                  ml: 2,
                },
                display: { xs: "none", md: "block" },
              }}
              onClick={preventDefault}
            >
              <Link
                to="/calendrier"
                style={{ color: "white", textDecoration: "none" }}
              >
                Calendrier
              </Link>
              <Link
                to="/incidents"
                style={{ color: "white", textDecoration: "none" }}
              >
                Incidents
              </Link>

              <Link
                to="/interventions"
                style={{ color: "white", textDecoration: "none" }}
              >
                Interventions
              </Link>
              <Link
                to="/taches"
                style={{ color: "white", textDecoration: "none" }}
              >
                Taches
              </Link>
              {role === "admin" && (
                <Link
                  to="validations"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Validation
                </Link>
              )}
              <Link
                to="/stats"
                style={{ color: "white", textDecoration: "none" }}
              >
                Statistiques
              </Link>
            </Box>
          </Box>
          <Box>
            <Typography>
              {" "}
              {isAuthenticated && (
                <WelcomeName
                  el={
                    role === "admin" ? (
                      <span style={{ fontWeight: "700" }}>
                        {loguedIn && `Administrateur`}
                      </span>
                    ) : (
                      <span style={{ fontWeight: "700" }}>
                        {" "}
                        {loguedIn && `Ingénieur`}
                      </span>
                    )
                  }
                />
              )}
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
