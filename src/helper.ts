import { URLConfigType, DEFAULT_URLS } from "./data";

export function getCfg(): Promise<URLConfigType> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(["webconfigHelper"], (res) => {
        resolve({ ...DEFAULT_URLS, ...(res.webconfigHelper || {}) });
      });
    });
  }
  
export function setCfg(patch: Partial<URLConfigType>): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(["webconfigHelper"], (res) => {
        const curr = res.webconfigHelper || {};
        chrome.storage.sync.set({ webconfigHelper: { ...curr, ...patch } }, () => resolve());
      });
    });
  }