import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import posthog from "posthog-js";
import { PostHogProvider } from "@posthog/react";

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host:
    import.meta.env.VITE_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
});

const rootEl = document.getElementById("root");
if (!rootEl) {
  document.body.innerHTML =
    '<p style="padding:2rem;color:#e2e8f0;background:linear-gradient(135deg,#0a0a1a,#0f0f2a);">#root 요소를 찾을 수 없습니다.</p>';
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <PostHogProvider client={posthog}>
        <App />
      </PostHogProvider>
    </StrictMode>,
  );
}
