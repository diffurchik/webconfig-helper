# WebConfig Helper

A Chrome extension that provides a floating menu to quickly switch between API endpoints and copy authentication tokens. Perfect for developers working across multiple environments (local, dev, staging, production).

## Features

- 🎯 **Quick Endpoint Switching**: Switch between predefined API endpoints with a single click
- 🔧 **Custom Endpoints**: Set custom endpoint URLs on the fly
- 🔑 **Token Management**: Automatically find and copy authentication tokens from localStorage or cookies
- 🎨 **Minimal UI**: Floating gear button with sleek dark-themed dropdown menu
- 💾 **Persistent Settings**: Remembers your last custom endpoint
- ⚡ **Auto-reload**: Automatically reloads the page after changing endpoints

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm, pnpm, or yarn package manager
- Google Chrome or Chromium-based browser

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd webconfig-helper
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Host permission - which websites the extension can access
# Use "*://*/*" for all sites, or specify particular domains
VITE_HOST_PERMISSION=*://*/*

# LocalStorage key name where your endpoint URL is stored
VITE_KEY=EndpointUrl

# Predefined endpoint configurations
# Endpoint 1 (e.g., Local)
VITE_NBT_LABEL=Local
VITE_NBT_URL=http://localhost:3000/

# Endpoint 2 (e.g., Dev)
VITE_FB_LABEL=Dev
VITE_FB_URL=https://dev.api.example.com

# Endpoint 3 (e.g., Staging)
VITE_AUTOTEST_1_LABEL=Staging
VITE_AUTOTEST_1_URL=https://staging.api.example.com

# Endpoint 4 (e.g., Production)
VITE_AUTOTEST_2_LABEL=Prod
VITE_AUTOTEST_2_URL=https://api.example.com

# Token keys to search for in localStorage (comma-separated)
# The extension will look for these keys when copying tokens
VITE_TOKEN_KEYS=authToken,accessToken,token,idToken,jwt
```

#### Environment Variables Explained

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_HOST_PERMISSION` | Yes | Defines which websites the extension can access. Use `*://*/*` for all sites or specific domains like `https://*.example.com/*` | `*://*/*` |
| `VITE_KEY` | Yes | The localStorage key name where your app stores the endpoint URL | `EndpointUrl` |
| `VITE_NBT_LABEL` | No | Display label for the first endpoint | `Local` |
| `VITE_NBT_URL` | No | URL for the first endpoint | `http://localhost:3000/` |
| `VITE_FB_LABEL` | No | Display label for the second endpoint | `Dev` |
| `VITE_FB_URL` | No | URL for the second endpoint | `https://dev.api.example.com` |
| `VITE_AUTOTEST_1_LABEL` | No | Display label for the third endpoint | `Staging` |
| `VITE_AUTOTEST_1_URL` | No | URL for the third endpoint | `https://staging.api.example.com` |
| `VITE_AUTOTEST_2_LABEL` | No | Display label for the fourth endpoint | `Prod` |
| `VITE_AUTOTEST_2_URL` | No | URL for the fourth endpoint | `https://api.example.com` |
| `VITE_TOKEN_KEYS` | No | Comma-separated list of localStorage keys to search for tokens | `authToken,accessToken,token,idToken,jwt` |

### 4. Build the Extension

#### Development Build (with hot reload)

```bash
npm run dev
# or
pnpm dev
```

This starts a development server that watches for changes.

#### Production Build

```bash
npm run build
# or
pnpm build
```

This creates an optimized build in the `dist/` directory.

### 5. Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `dist` folder from your project directory
5. The extension should now appear in your extensions list

## Usage

### Switching Endpoints

1. Navigate to any webpage where your web app is running
2. Look for the floating **⚙️ gear button** in the bottom-right corner
3. Click the gear button to open the menu
4. Select one of the predefined endpoints or enter a custom URL
5. The page will automatically reload with the new endpoint

### Using Custom Endpoints

1. Open the extension menu
2. Find the "Custom endpoint" input field
3. Enter your custom endpoint URL (e.g., `https://my-custom-api.com`)
4. Click **Set** or press **Enter**
5. The extension will remember this custom endpoint for future use

### Copying Authentication Tokens

1. Open the extension menu
2. Click the **Copy Token** button
3. The extension will search for authentication tokens in:
   - localStorage (using the keys specified in `VITE_TOKEN_KEYS`)
   - Any localStorage key containing the word "token"
   - Browser cookies containing the word "token"
4. If found, the token is copied to your clipboard
5. A toast notification confirms the action

## Project Structure

```
webconfig-helper/
├── dist/                    # Built extension (generated)
├── public/
│   └── injected.js         # Script injected into page context
├── src/
│   ├── main.ts             # Main entry point & logic
│   ├── components.ts       # UI component builders
│   ├── data.ts             # Configuration & types
│   ├── utilities.ts        # Helper functions
│   ├── helper.ts           # Chrome storage helpers
│   └── vite-env.d.ts       # TypeScript definitions
├── manifest.config.ts      # Chrome extension manifest
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies & scripts
├── .env                    # Environment variables (create this)
└── README.md               # This file
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run preview` - Preview production build

### Making Changes

1. Edit source files in `src/`
2. If running `npm run dev`, changes are automatically reloaded
3. If you built with `npm run build`, rebuild and reload the extension in Chrome:
   - Go to `chrome://extensions/`
   - Click the refresh icon on your extension card

### Modifying the Extension

#### Adding More Endpoints

Add more environment variables to your `.env` file:

```env
VITE_CUSTOM_LABEL=My Custom Env
VITE_CUSTOM_URL=https://my-custom.example.com
```

Then update `src/data.ts` to include the new endpoint in the `urls` array.

#### Changing Token Search Logic

Modify the `findToken` function in `public/injected.js` to customize how tokens are located.

#### Styling

All inline styles are defined in `src/components.ts`. Update the style objects to customize the appearance.

## Troubleshooting

### Extension Not Working

- **Check permissions**: Ensure `VITE_HOST_PERMISSION` in `.env` matches your target website
- **Rebuild**: Run `npm run build` after changing `.env` or source files
- **Reload extension**: Go to `chrome://extensions/` and click the refresh icon
- **Check console**: Open DevTools on your webpage and check for errors

### Token Not Found

- Verify the localStorage keys in `VITE_TOKEN_KEYS` match your application's token storage
- Check if your app stores tokens in localStorage or cookies
- Open DevTools > Application tab > Local Storage to see available keys

### Endpoint Not Changing

- Ensure your web application reads the endpoint from the localStorage key specified in `VITE_KEY`
- Check that the localStorage key name matches between the extension and your app
- Verify the endpoint URLs are correct in your `.env` file

### Build Errors

- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear the `dist` folder: `rm -rf dist && npm run build`
- Ensure all environment variables in `.env` are properly formatted (no trailing spaces)

## Security Considerations

- This extension has access to localStorage and cookies on matched websites
- Only install this extension on websites you control and trust
- Be careful when sharing tokens - they provide authentication to your services
- Consider limiting `VITE_HOST_PERMISSION` to specific domains instead of `*://*/*`

## Browser Compatibility

This extension is built for **Manifest V3** and is compatible with:
- Google Chrome (v88+)
- Microsoft Edge (v88+)
- Brave
- Other Chromium-based browsers

**Note**: This extension does not work with Firefox, which has different extension APIs.

## Technologies Used

- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Fast build tool
- [@crxjs/vite-plugin](https://crxjs.dev/) - Chrome extension development with Vite
- Chrome Extension Manifest V3

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review the browser console for error messages
3. Open an issue in the repository

---

**Happy Coding! 🚀**

