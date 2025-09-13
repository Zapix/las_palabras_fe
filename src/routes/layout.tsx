import { useState } from "react";
import { Outlet } from "react-router";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

export const Layout = () => {
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const toggleDrawer = () => setDrawerOpened((x) => !x);
  const closeDrawer = () => setDrawerOpened(false);
  const menuItems = [
    { to: "/", title: "Home" },
    { to: "/info", title: "Info" }
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ display: "flex", flexDirection: "start", flexGrow: 1 }}
          >
            Las Palabras
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {menuItems.map(({ to, title }) => (
              <Button
                key={`desktop-${to}`}
                sx={{ color: "#fff" }}
                href={to}
              >
                {title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={closeDrawer}
      >
        <Drawer open={drawerOpened}>
          <List sx={{ width: 250 }}>
            {menuItems.map(({ to, title }) => (
              <ListItem key={`mobile-${to}`}>
                <ListItemButton href={to}>{title}</ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Outlet />
    </Box>
  );
};
