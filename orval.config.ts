import { defineConfig } from 'orval';
import { env } from './src/env/node';
import {} from '../onec-backend/swagger.json'

export default defineConfig({
  api: {
    input: '../onec-backend/swagger.json',
    output: {
      mode: 'split',
      baseUrl: `${env.VITE_API_URL}`,
      target: './src/http/generated/api.ts',
      schemas: './src/http/models/',
      
      client: 'react-query',
      httpClient: 'axios',
      clean: true,

      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
        mutator: {
          path: './src/http/client.ts',
          name: 'http',
        },
      },
    },
  },
});
