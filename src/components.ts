import { URLConfigType } from "./data";
import { setCfg } from "./helper";
import { request } from "./utilities";

export function addDivider(menu: HTMLElement) {
  const hr = document.createElement("div");
  hr.id = "divider";
  hr.style.cssText = "height:1px;background:#2a2a2a;margin:8px 4px";
  menu.appendChild(hr);
}

export function createGearButton(label = "⚙️"): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.id = "gear_button";
  btn.textContent = label;
  Object.assign(btn.style, {
    width: "44px",
    height: "44px",
    borderRadius: "999px",
    background: "rgba(0,0,0,0.75)",
    color: "#fff",
    border: "0",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
  } as CSSStyleDeclaration);
  return btn;
}

export function createMenuContainer(): HTMLDivElement {
  const menu = document.createElement("div");
  menu.id = "menu_container";
  menu.style.cssText =
    "display:none;margin-top:8px;min-width:280px;background:rgba(17,17,17,0.75);color:#f3f3f3;border-radius:12px;padding:8px;box-shadow:0 12px 30px rgba(0,0,0,0.35)";
  return menu;
}

export function addSectionTitle(menu: HTMLElement, text: string) {
  const title = document.createElement("div");
  title.textContent = text;
  title.style.cssText =
    "font-size:12px;opacity:.7;margin:8px 8px 6px;text-transform:uppercase;letter-spacing:.02em;";
  menu.appendChild(title);
}

export function createCurrentEndpointDisplay(
  currentValue: string
): HTMLElement {
  const box = document.createElement("div");
  box.style.cssText =
    "font-size:12px;padding:10px 10px;margin:4px 4px 8px;border-radius:6px;background:#1b1b1b;word-break:break-all;";
  box.textContent = currentValue ? `${currentValue}` : "(none)";
  return box;
}

export function createEndpointsList(cfg: URLConfigType): HTMLElement {
  const ul = document.createElement("ul");
  ul.style.cssText =
    "list-style:none;padding:0;margin:0;max-height:240px;overflow:auto";

  cfg.urls.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = u.label;
    li.title = u.value;
    li.style.cssText =
      "padding:8px 10px;border-radius:8px;margin:4px;cursor:pointer;font-size:12px;display:flex;justify-content:space-between;align-items:center;gap:8px;";
    li.onmouseenter = () => (li.style.background = "#585757");
    li.onmouseleave = () => (li.style.background = "transparent");
    li.onclick = async () => {
      await request("setLocalStorage", { key: cfg.key, value: u.value });
      toast(`Set ${cfg.key} = ${u.value}`);
      location.reload();
    };
    li.appendChild(qrButton(u.label))
    ul.appendChild(li);
  });

  return ul;
}

export function toast(msg: string) {
  const t = document.createElement("div");
  t.id = "toast_container";
  t.textContent = msg;
  Object.assign(t.style, {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%) translateY(12px)",
    bottom: "16px",
    background: "#111",
    color: "#f3f3f3",
    padding: "10px 14px",
    borderRadius: "10px",
    zIndex: "2147483647",
    opacity: "0",
    transition: "opacity .25s ease, transform .25s ease",
  } as CSSStyleDeclaration);
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = "1";
    (t.style as any).transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    t.style.opacity = "0";
    setTimeout(() => t.remove(), 250);
  }, 1400);
}

export function createRoot(): HTMLDivElement {
  const root = document.createElement("div");
  root.style.cssText =
    "position:fixed;right:16px;bottom:54px;z-index:2147483647";
  return root;
}

export function settingsButton() {
  const btn = document.createElement("button");
  btn.id = "gear_button";
  btn.textContent = "⚙️";
  Object.assign(btn.style, {
    position: "absolute",
    top: "58px",
    right: "8px",
    width: "16px",
    height: "16px",
    borderRadius: "999px",
    color: "#fff",
    border: "0",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
  } as CSSStyleDeclaration);
  return btn;
}

export function showQRCodeModal(labelName: string) {
  // Create modal overlay
  const overlay = document.createElement("div");
  overlay.id = "qr_code_modal_overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: "2147483648",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  } as CSSStyleDeclaration);

  // Create modal content container
  const modalContent = document.createElement("div");
  Object.assign(modalContent.style, {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    maxWidth: "90%",
    maxHeight: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    cursor: "default",
  } as CSSStyleDeclaration);

  // Determine image filename based on label
  // Add .png extension if not present
  const imageName = labelName.endsWith('.png') ? labelName : `${labelName}.png`;
  
  // Create title
  const title = document.createElement("div");
  title.textContent = labelName;
  Object.assign(title.style, {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  } as CSSStyleDeclaration);

  // Create image element
  const img = document.createElement("img");
  img.src = chrome.runtime.getURL(imageName);
  img.alt = `QR Code for ${labelName}`;
  Object.assign(img.style, {
    maxWidth: "400px",
    maxHeight: "400px",
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  } as CSSStyleDeclaration);
  
  // Handle image load error
  img.onerror = () => {
    img.style.display = "none";
    const errorMsg = document.createElement("div");
    errorMsg.textContent = `QR code image not found: ${imageName}`;
    Object.assign(errorMsg.style, {
      color: "#ff4444",
      fontSize: "14px",
      padding: "20px",
    } as CSSStyleDeclaration);
    modalContent.insertBefore(errorMsg, closeBtn);
  };

  // Create close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  Object.assign(closeBtn.style, {
    padding: "8px 24px",
    borderRadius: "6px",
    border: "none",
    background: "#3a3a3a",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  } as CSSStyleDeclaration);

  // Close modal on overlay click or close button click
  overlay.onclick = () => overlay.remove();
  closeBtn.onclick = () => overlay.remove();
  modalContent.onclick = (e) => e.stopPropagation(); // Prevent closing when clicking on content

  // Assemble modal
  modalContent.appendChild(title);
  modalContent.appendChild(img);
  modalContent.appendChild(closeBtn);
  overlay.appendChild(modalContent);
  document.body.appendChild(overlay);
}

export function qrButton(endpointName: string){
  const btn = document.createElement("button")
  btn.id = `qr_button-${endpointName}`
  btn.textContent = 'QR'
  Object.assign(btn.style, {
    flexShrink: "0",
    width: "40px",
    height: "24px",
    borderRadius: "4px",
    color: "#fff",
    backgroundColor: "#3a3a3a",
    border: "0",
    cursor: "pointer",
    fontSize: "10px",
    fontWeight: "500",
  } as CSSStyleDeclaration);
  btn.onclick = async (e) => {
    e.stopPropagation(); // Prevent li click from firing
    showQRCodeModal(endpointName);
  }
  return btn;
}

export function settingsMenu(){
  const settingMenu = document.createElement("div");
  settingMenu.id = "settings_menu_container";
  settingMenu.style.cssText =
    "display:none;margin-top:8px;min-width:280px;background:rgba(17,17,17,0.75);color:#f3f3f3;border-radius:12px;padding:8px;box-shadow:0 12px 30px rgba(0,0,0,0.35)";
  return settingMenu;
}

export function createCustomEndpointSection(cfg: URLConfigType): HTMLElement {
  const wrap = document.createElement("div");
  wrap.style.cssText = "display:flex;gap:6px;align-items:center;margin:6px 4px";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Custom endpoint (https://...)";
  Object.assign(input.style, {
    flex: "1 1 auto",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #2a2a2a",
    background: "#181818",
    color: "#f3f3f3",
    fontSize: "10px"
  } as CSSStyleDeclaration);
  if (cfg.lastCustom) input.value = cfg.lastCustom;

  const setBtn = document.createElement("button");
  setBtn.textContent = "Set";
  Object.assign(setBtn.style, {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "0",
    background: "#e9e9e9",
    color: "#111",
    cursor: "pointer",
    flex: "0 0 auto",
  } as CSSStyleDeclaration);

  const apply = async () => {
    const val = input.value.trim();
    if (!val) return toast("Enter a URL");
    try {
      new URL(val);
    } catch {
      toast("Invalid URL");
      return;
    }
    await setCfg({ lastCustom: val });
    await request("setLocalStorage", { key: cfg.key, value: val });
    toast(`Set ${cfg.key} = ${val}`);
    location.reload();
  };

  setBtn.onclick = apply;
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") apply();
  });

  wrap.appendChild(input);
  wrap.appendChild(setBtn);
  return wrap;
}
