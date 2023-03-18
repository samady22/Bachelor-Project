import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/authenticate";
import authService from "../../services/authService";
import { Logout } from "@mui/icons-material";
import _ from "lodash";

export default function SideMenu(props: any) {
  const [openSideBar, setOpenSideBar] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Drawer
        anchor="right"
        PaperProps={{
          sx: { width: "40%" },
        }}
        open={openSideBar}
        onClose={() => setOpenSideBar(false)}
      >
        <IconButton sx={{ ml: "auto" }} onClick={() => setOpenSideBar(false)}>
          <CloseIcon fontSize="small"></CloseIcon>
        </IconButton>

        {props.isSignIn ? (
          <>
            <Typography padding={1} textAlign={"center"}>
              {getCurrentUser().name}
            </Typography>
            <Button
              color="secondary"
              size="small"
              variant="contained"
              startIcon={<Logout fontSize="small" />}
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                borderRaduis: 10,
              }}
              onClick={() => {
                authService.signOut().then((res) => {
                  if (_.isEqual(res.data.status, 200)) {
                    window.location.href = "/auth";
                  }
                });
              }}
            >
              Sign out
            </Button>
            <List>
              {props.pages.map((page: any, index: number) => {
                return (
                  <ListItemButton
                    onClick={(e) => {
                      let path = e.currentTarget.innerText
                        .replace(" ", "")
                        .toLowerCase();
                      if (path === "home") {
                        navigate("/");
                      } else {
                        navigate(`/${path}`);
                      }
                      setOpenSideBar(false);
                    }}
                    key={index}
                  >
                    <ListItemIcon>
                      <ListItemText>{page}</ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                );
              })}
            </List>
          </>
        ) : (
          <Button
            color="warning"
            size="small"
            variant="contained"
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 5,
              borderRaduis: 10,
            }}
            onClick={() => {
              navigate("/auth");
            }}
          >
            Sign in
          </Button>
        )}
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto", color: "white" }}
        onClick={() => setOpenSideBar(true)}
      >
        <MenuIcon></MenuIcon>
      </IconButton>
    </>
  );
}
