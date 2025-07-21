import { defineConfig } from '@kubb/core';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginReactQuery } from '@kubb/plugin-react-query';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginZod } from '@kubb/plugin-zod';

export default defineConfig({
  input: {
    path: '../onec-backend/swagger.json',
  },
  output: {
    path: 'src/generated',
    clean: true,
  },
  plugins: [
    pluginOas(),
    pluginTs(),
    pluginReactQuery({
      output: {
        path: './hooks',
      },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Hooks`,
      },
      client: {
        dataReturnType: 'full',
        importPath: '../../../http/client-kubb.ts',
      },
      mutation: {
        methods: ['post', 'delete', 'put'],
      },
      infinite: {
        queryParam: 'next_page',
        initialPageParam: 0,
        cursorParam: 'nextCursor',
      },
      query: {
        methods: ['get'],
        importPath: '@tanstack/react-query',
      },
    }),
    pluginZod({
      output: {
        path: './zod',
      },
      group: { type: 'tag', name: ({ group }) => `${group}Schemas` },
      typed: true,
      dateType: 'stringOffset',
      unknownType: 'unknown',
      importPath: 'zod',
    }),
  ],
});
