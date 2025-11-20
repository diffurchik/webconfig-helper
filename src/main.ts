import {
  addDivider,
  addSectionTitle,
  createEndpointsList,
  createGearButton,
  createMenuContainer,
  createRoot,
  createCurrentEndpointDisplay,
  settingsButton,
  settingsMenu,
  createCustomEndpointSection,
} from "./components";
import { getCfg } from "./helper";
import {
  createCopyTokenButton,
  getCurrentEndpoint,
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
  const settingsBtn = settingsButton();
  const settingsMenuContainer = settingsMenu();

  addSectionTitle(menu, `Current endpoint`);
  const currentValue = await getCurrentEndpoint(cfg.key);
  const currentDisplay = createCurrentEndpointDisplay(currentValue);
  menu.appendChild(currentDisplay);

  addSectionTitle(menu, `Set ${cfg.key}`);
  menu.appendChild(settingsBtn);
  menu.appendChild(createEndpointsList(cfg));
  addDivider(menu);
  menu.appendChild(createCustomEndpointSection(cfg));
  addDivider(menu);
  menu.appendChild(createCopyTokenButton(cfg));

  wireOpenClose(root, btn, menu);
  wireOpenClose(root, settingsBtn, settingsMenuContainer);

  root.appendChild(btn);
  root.appendChild(menu);
  root.appendChild(settingsMenuContainer)

  document.documentElement.appendChild(root);
}

main();
