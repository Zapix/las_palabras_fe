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
  const url = URL.parse(href.toString(), window.location.toString());
  if (url === null) {
    throw new Error(`Invalid URL: ${href}`);
  }
  const locationSearch = new URLSearchParams(window.location.search);
  locationSearch.delete("refer");

  url.searchParams.append(
    "refer",
    window.location.pathname + "?" + locationSearch.toString()
  );
  const modifiedHref = url.pathname + url.search;

  return (
    <RouterLink
      data-testid="custom-link"
      ref={ref}
      to={modifiedHref}
      {...other}
    />
  );
});
