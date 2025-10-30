(function () {
    function findToken(keys) {
      keys = Array.isArray(keys) ? keys : [];
      for (const k of keys) {
        try { const v = window.localStorage.getItem(k); if (v) return v; } catch {}
      }
      try {
        for (let i = 0; i < window.localStorage.length; i++) {
          const k = window.localStorage.key(i) || "";
          if (/token/i.test(k)) {
            const v = window.localStorage.getItem(k);
            if (v) return v;
          }
        }
      } catch {}
      const cookie = document.cookie.split("; ").find(c => /token/i.test((c.split("=")[0] || "")));
      return cookie ? decodeURIComponent(cookie.split("=")[1] || "") : "";
    }
  
    function setLS(key, value) {
      try {
        window.localStorage.setItem(key, value);
        // notify SPA listeners
        window.dispatchEvent(new StorageEvent("storage", { key, newValue: value }));
        return true;
      } catch { return false; }
    }
  
    window.addEventListener("webconfig-helper:request", (e) => {
      const d = (e && e.detail) || {};
      if (d.action === "setLocalStorage") {
        const ok = setLS(d.key, d.value);
        window.dispatchEvent(new CustomEvent("webconfig-helper:response", { detail: { requestId: d.requestId, ok } }));
      } else if (d.action === "getToken") {
        const token = findToken(d.keys);
        window.dispatchEvent(new CustomEvent("webconfig-helper:response", { detail: { requestId: d.requestId, token } }));
      } else if (d.action === "getCurrentEndpoint") {
        let current = "";
        try { current = window.localStorage.getItem(d.key) || ""; } catch {}
        window.dispatchEvent(new CustomEvent("webconfig-helper:response", {
          detail: { requestId: d.requestId, value: current }
        }));
      }
    });
  })();
  