import { toast } from "./components";
import { URLConfigType } from "./data";

export function request<T = any>(action: string, detail: Record<string, any> = {}) {
    return new Promise<T>((resolve) => {
      const id = `webconfig-helper-${Math.random().toString(36).slice(2)}`;
      const handler = (e: Event) => {
        const ev = e as CustomEvent;
        if ((ev.detail || {}).requestId === id) {
          window.removeEventListener("webconfig-helper:response", handler as EventListener);
          resolve(ev.detail as T);
        }
      };
      window.addEventListener("webconfig-helper:response", handler as EventListener);
      window.dispatchEvent(
        new CustomEvent("webconfig-helper:request", { detail: { action, requestId: id, ...detail } })
      );
    });
  }

  export function createCopyTokenButton(cfg: URLConfigType): HTMLButtonElement {
    const tokenBtn = document.createElement("button");
    tokenBtn.textContent = "Copy Token";
    Object.assign(tokenBtn.style, {
      width: "100%", padding: "8px 10px", borderRadius: "8px", border: "0",
      background: "#e9e9e9", color: "#111", cursor: "pointer"
    } as CSSStyleDeclaration);
    tokenBtn.onmouseenter = () => (tokenBtn.style.filter = "brightness(0.95)");
    tokenBtn.onmouseleave = () => (tokenBtn.style.filter = "none");
    tokenBtn.onclick = async () => {
      const { token } = await request<{ token?: string }>("getToken", { keys: cfg.tokenKeys });
      if (!token) return toast("Token not found");
      await navigator.clipboard.writeText(token);
      toast("Token copied");
    };
    return tokenBtn;
  }

  export async function getCurrentEndpoint(key: string): Promise<string> {
    const res = await request<{ value?: string }>("getCurrentEndpoint", { key });
    return res.value || "";
  }