import { defineConfig } from 'orval';
import {} from '../onec-backend/swagger.json';

export default defineConfig({
  api: {
    input: '../onec-backend/swagger.json',
    output: {
      baseUrl: 'http://localhost:3333',
      target: './src/http/generated/api.ts',
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
