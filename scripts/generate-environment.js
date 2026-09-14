'use strict';

const fs = require('fs');
const path = require('path');

const value = process.env.API_BASE_URL;

if (!value) {
  console.error('API_BASE_URL is required for a production build.');
  process.exit(1);
}

let apiBaseUrl;

try {
  const url = new URL(value);

  if (url.protocol !== 'https:')
    throw new Error('API_BASE_URL must use HTTPS.');

  if (url.origin === 'null' || url.username || url.password || url.pathname !== '/' || url.search || url.hash)
    throw new Error('API_BASE_URL must be an HTTPS origin without a path, query, or credentials.');

  apiBaseUrl = url.origin;
} catch (err) {
  console.error(`Invalid API_BASE_URL: ${err.message}`);
  process.exit(1);
}

const contents = `export const environment = {
  production: true,
  apiBaseUrl: '${apiBaseUrl}',
  gtm: {
    enabled: false,
    id: 'GTM-XXXXX'
  }
};
`;

const output = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');
fs.writeFileSync(output, contents);
console.log(`Generated ${path.relative(process.cwd(), output)}.`);
