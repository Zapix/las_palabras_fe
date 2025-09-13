import { forwardRef } from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps
} from "react-router";

export const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return (
    <RouterLink
      data-testid="custom-link"
      ref={ref}
      to={href}
      {...other}
    />
  );
});
