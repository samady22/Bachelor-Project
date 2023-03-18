import logo from "./logo.png";
import "./Navbar.css";
import { useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SideMenu from "../SideMenu/SideMenu";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/authenticate";
import authService from "../../services/authService";
import { Logout } from "@mui/icons-material";
function Navbar(props: any) {
  const [tabValue, setTabValue] = useState(0);
  const screenSize = useTheme();
  const isPhone = useMediaQuery(screenSize.breakpoints.down("sm"));
  const pages = ["Home", "All Flights"];
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpenMenu(true);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <AppBar sx={{ background: "#2b3947" }} className="navbar-container">
        <Toolbar>
          <div
            onClick={() => {
              if (props.isSignIn) {
                setTabValue(0);
                navigate("/");
              }
            }}
            className="navbar-logo"
          >
            <img className="logo" src={logo} alt="logo"></img>
            <Typography sx={{ fontSize: "1.2rem" }}>FLIGHT TRACKER</Typography>
          </div>
          {isPhone ? (
            <>
              <SideMenu
                // signIn={signIn}
                isSignIn={props.isSignIn}
                setTabValue={setTabValue}
                pages={pages}
              />
            </>
          ) : (
            <>
              {props.isSignIn && (
                <Tabs
                  sx={{ marginLeft: "auto" }}
                  textColor="inherit"
                  value={tabValue === -1 ? false : tabValue}
                  onChange={(e, index) => {
                    if (index === 0) {
                      navigate("/");
                    } else {
                      navigate(
                        `/${pages[index].replace(" ", "").toLowerCase().trim()}`
                      );
                    }
                    setTabValue(index);
                  }}
                  indicatorColor="secondary"
                  color="secondary"
                >
                  {pages.map((page: any, index: number) => {
                    return <Tab key={index} label={page} />;
                  })}
                </Tabs>
              )}
              {props.isSignIn ? (
                <>
                  <Tooltip title="User">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: "white",
                          color: "black",
                        }}
                      >
                        {getCurrentUser().name[0]}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={null}
                    id="account-menu"
                    open={openMenu}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        ml: -3,
                        mt: -46,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 10,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      {getCurrentUser().name + " " + getCurrentUser().last_name}
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        authService.signOut().then((res) => {
                          if (res.data.status === 200) {
                            window.location.href = "/auth";
                          }
                        });
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Sign out
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  color="warning"
                  size="small"
                  variant="contained"
                  sx={{ marginLeft: "auto", borderRaduis: 10 }}
                  onClick={() => {
                    setTabValue(-1);
                    navigate("/auth");
                  }}
                >
                  Sign in
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
