"use client";

import { useEffect } from "react";

type Identity = {
  on: (event: string, callback: (user?: unknown) => void) => void;
};

declare global {
  interface Window {
    netlifyIdentity?: Identity;
  }
}

function hasAuthHash() {
  const hash = window.location.hash;
  return (
    hash.includes("invite_token=") ||
    hash.includes("recovery_token=") ||
    hash.includes("confirmation_token=")
  );
}

export function NetlifyIdentity() {
  useEffect(() => {
    if (!hasAuthHash()) return;

    const script = document.createElement("script");
    script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
    script.async = true;
    script.onload = () => {
      const identity = window.netlifyIdentity;
      if (!identity) return;
      identity.on("init", (user) => {
        if (!user) {
          identity.on("login", () => {
            window.location.assign("/admin/");
          });
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
