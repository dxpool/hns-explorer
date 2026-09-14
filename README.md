# hns-explorer


----------
This is a Handshake explorer front-end developed based on Angular10 using API provided by hns-backend.
The Handshake explorer can display information about Handshake, such as blocks, addresses, transactions, names, and mining pools.

## Getting Started

### 1. Dependencies
* `npm install`

### 2. Environment Configuration
* Development uses `src/environments/environment.ts` and the local `/api` proxy.
* Production configuration is generated from `API_BASE_URL` before each build. The generated `src/environments/environment.prod.ts` file is intentionally ignored by Git.

### 3. Local Test
* When running locally, you need to configure the API proxy to forward the request to the correct route. Create a file `proxy.conf.json` under the directory `src/`, and configure it as follows, where `target` can be configured as the `hns-backend` service run by yourself：

```
{
  "/api": {
    "target": "http://e.hnsfans.com/api",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

### 4. Build
* Configure the public HTTPS API endpoint and build:

```
API_BASE_URL=https://api.hnsfans.com npm run build
```

The production output is written to `dist/hns-explorer`.

### 5. Cloudflare Workers

The Worker configuration is pinned to the DxPool Cloudflare account in
`wrangler.jsonc`. Build and deploy the static Angular application with:

```
API_BASE_URL=https://api.hnsfans.com npm run build
npx wrangler@4.131.2 deploy
```

The Worker serves `dist/hns-explorer` as static assets and falls back to
`index.html` for Angular routes.
