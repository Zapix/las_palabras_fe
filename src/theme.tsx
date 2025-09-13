import { createTheme, type LinkProps } from "@mui/material";
import LinkBehavior from "./components/link-behavior";

export const theme = createTheme({
  components: {
    MuiLink: { defaultProps: { component: LinkBehavior } as LinkProps },
    MuiButtonBase: { defaultProps: { LinkComponent: LinkBehavior } }
  }
});
