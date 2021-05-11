# hns-explorer


----------
This is a Handshake explorer front-end developed based on Angular10 using API provided by hns-backend.
The Handshake explorer can display information about Handshake, such as blocks, addresses, transactions, names, and mining pools.

## Getting Started

### 1. Dependencies
* `npm install`

### 2. Environment Configuration
* All the configuration files are under `src/environments`. The default configuration file is `environment.ts`. In `--prod` mode, `environment.prod.ts` will be used.

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
* In the `src/environments/`, copy `environment.ts` and rename it to `environment.prod.ts`; if there is a `Google Tag Manager` configuration, you can configure the ID in the file.
* `npm run build`