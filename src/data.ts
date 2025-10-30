export type URLConfigType = {
    key: string;
    urls: { label: string; value: string }[];
    tokenKeys: string[];
    lastCustom?: string;
  };

  export const DEFAULT_URLS: URLConfigType = {
    key: import.meta.env.VITE_KEY || "EndpointUrl",
    urls: [
      {
        label: import.meta.env.VITE_NBT_LABEL || "Local",
        value: import.meta.env.VITE_NBT_URL || "http://localhost:3000/"
      },
      {
        label: import.meta.env.VITE_FB_LABEL || "Dev",
        value: import.meta.env.VITE_FB_URL || "https://dev.api.example.com"
      },
      {
        label: import.meta.env.VITE_AUTOTEST_1_LABEL || "Staging",
        value: import.meta.env.VITE_AUTOTEST_1_URL || "https://staging.api.example.com"
      },
      {
        label: import.meta.env.VITE_AUTOTEST_2_LABEL || "Prod",
        value: import.meta.env.VITE_AUTOTEST_2_URL || "https://api.example.com"
      }
    ],
    tokenKeys: (import.meta.env.VITE_TOKEN_KEYS || "authToken,accessToken,token,idToken,jwt")
      .split(',')
      .map(key => key.trim())
  };