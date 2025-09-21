import { forwardRef, useCallback, type MouseEvent } from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps
} from "react-router";

export const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] } & {
    "data-transition-type"?: "rtl" | "ltr" | "fade";
  }
>((props, ref) => {
  const { href, onClick: originalClick, ...other } = props;
  const transitionType = other["data-transition-type"] || "fade";

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      document.documentElement.dataset.transition = transitionType;
      if (originalClick) {
        originalClick(e);
      }
    },
    [transitionType]
  );

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
      viewTransition={true}
      onClick={handleClick}
      {...other}
    />
  );
});
