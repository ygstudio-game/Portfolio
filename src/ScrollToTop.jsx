import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset browser scroll position
    window.scrollTo(0, 0);

    // If ScrollSmoother exists, also reset it
    if (window.ScrollSmoother && window.ScrollSmoother.get()) {
      window.ScrollSmoother.get().scrollTop(0);
    }
  }, [pathname]);

  return null;
}
