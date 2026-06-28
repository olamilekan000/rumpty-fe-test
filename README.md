# Rumpty FE Test

Small static frontend used to test Rumpty deployments.

## Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The app is intentionally simple and should be detected as a static frontend app. It includes:

- Vite build output
- Static asset from `public/`
- Client-side route test at `/routes/demo`
- Optional environment values:
  - `VITE_APP_NAME`
  - `VITE_DEPLOY_ENV`
  - `VITE_API_BASE_URL`
# rumpty-fe-test
