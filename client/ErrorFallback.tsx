import React, { useEffect } from "react";
import { getWithExpiry, setWithExpiry } from "./storage";

export function ErrorFallback({ error }) {
  // Handles failed lazy loading of a JS/CSS chunks.
  useEffect(() => {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (error?.message && chunkFailedMessage.test(error.message)) {
      if (!getWithExpiry("chunk_failed")) {
        setWithExpiry("chunk_failed", "true", 10000);
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div>
      <p>.</p>
    </div>
  );
}
