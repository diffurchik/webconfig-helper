import {
  addDivider,
  addSectionTitle,
  createEndpointsList,
  createGearButton,
  createMenuContainer,
  createRoot,
  createCurrentEndpointDisplay,
  toast,
} from "./components";
import { URLConfigType } from "./data";
import { getCfg, setCfg } from "./helper";
import {
  createCopyTokenButton,
  getCurrentEndpoint,
  request,
} from "./utilities";

function injectPageHelper(): Promise<void> {
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = chrome.runtime.getURL("injected.js");
    (document.head || document.documentElement).appendChild(s);
    s.onload = () => {
      s.remove();
      resolve();
    };
  });
}

function createCustomEndpointSection(cfg: URLConfigType): HTMLElement {
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

function wireOpenClose(root: HTMLElement, btn: HTMLElement, menu: HTMLElement) {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  });
  document.addEventListener("click", (e) => {
    if (!root.contains(e.target as Node)) menu.style.display = "none";
  });
}

async function main() {
  await injectPageHelper();
  const cfg = await getCfg();

  const root = createRoot();
  const btn = createGearButton();
  const menu = createMenuContainer();

  addSectionTitle(menu, `Current endpoint`);
  const currentValue = await getCurrentEndpoint(cfg.key);
  const currentDisplay = createCurrentEndpointDisplay(currentValue);
  menu.appendChild(currentDisplay);

  addSectionTitle(menu, `Set ${cfg.key}`);
  menu.appendChild(createEndpointsList(cfg));
  addDivider(menu);
  menu.appendChild(createCustomEndpointSection(cfg));
  addDivider(menu);
  menu.appendChild(createCopyTokenButton(cfg));

  wireOpenClose(root, btn, menu);

  root.appendChild(btn);
  root.appendChild(menu);
  document.documentElement.appendChild(root);
}

main();
