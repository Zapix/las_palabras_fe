import { useRef, useState, useEffect } from "react";
import { Outlet } from "react-router";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
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

  const appBarRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(":root");
    if (!root) {
      return;
    }
    const cssVar = getComputedStyle(root).getPropertyValue("--app-bar-size");
    console.log("Css var:", cssVar);

    const controller = new AbortController();
    window.addEventListener(
      "resize",
      () => {
        const appBarHeight = appBarRef.current?.clientHeight || 64;
        root.style.setProperty("--app-bar-size", `${appBarHeight}px`);
      },
      { signal: controller.signal }
    );

    console.log("Appbar height:", appBarRef.current?.clientHeight);
    return () => controller.abort();
  }, []);

  const menuItems = [
    { to: "/", title: "Home" },
    { to: "/info", title: "Info" },
    { to: "/vocabulary", title: "Vocabulary" }
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        ref={appBarRef}
      >
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
                sx={{ color: "#fff", "&:hover": { color: "#fff" } }}
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
        <Drawer
          open={drawerOpened}
          sx={{ my: "var(--app-bar-size)" }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: "flex", flexDirection: "start", flexGrow: 1 }}
            >
              Las Palabras
            </Typography>
          </Toolbar>
          <Divider />
          <List sx={{ width: 250 }}>
            {menuItems.map(({ to, title }) => (
              <ListItem key={`mobile-${to}`}>
                <ListItemButton href={to}>{title}</ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Box sx={{ my: "var(--app-bar-size)", width: "100vw" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
