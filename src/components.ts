import { URLConfigType } from "./data";
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
      "padding:8px 10px;border-radius:8px;margin:4px;cursor:pointer";
    li.onmouseenter = () => (li.style.background = "#585757");
    li.onmouseleave = () => (li.style.background = "transparent");
    li.onclick = async () => {
      await request("setLocalStorage", { key: cfg.key, value: u.value });
      toast(`Set ${cfg.key} = ${u.value}`);
      location.reload();
    };
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

export function settingsMenu(){
  const settingMenu = document.createElement("div");
  settingMenu.id = "settings_menu_container";
  settingMenu.style.cssText =
    "display:none;margin-top:8px;min-width:280px;background:rgba(17,17,17,0.75);color:#f3f3f3;border-radius:12px;padding:8px;box-shadow:0 12px 30px rgba(0,0,0,0.35)";
  return settingMenu;
}
