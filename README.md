# React + TypeScript + Vite

## Cash availability backend

The map uses OpenStreetMap for nearby ATM locations. Cash availability must come from a bank or ATM-network provider, so the project includes a server-side proxy at `/api/atm-status`. Provider credentials are never exposed to the browser.

1. Copy `.env.example` to `.env`.
2. Set `ATM_PROVIDER_URL` and `ATM_PROVIDER_API_KEY` from your provider.
3. Start the API in one terminal:

```bash
npm run api
```

4. Start the frontend in another terminal:

```bash
npm run dev
```

The provider endpoint should accept `latitude`, `longitude`, and `radius` query parameters and return JSON in this shape:

```json
{
  "available": true,
  "status": "cash_available",
  "lastUpdated": "2026-09-08T10:00:00Z"
}
```

Without a configured provider, the UI intentionally displays `Cash status unavailable`; it does not fabricate a cash balance.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
