import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import UnoCss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { isCustomElement } from 'leafer-vue/compiler';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5180,
    proxy: {
      '/mimic': 'http://localhost:3000',
      '/data': 'http://localhost:3000',
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement,
        },
      },
    }),
    vueJsx(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      dts: 'src/types/auto/auto-import.d.ts',
    }),
    codeInspectorPlugin({ bundler: 'vite' }),
    UnoCss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@mimic': fileURLToPath(new URL('./src/views/mimic', import.meta.url)),
      '@foxui': fileURLToPath(new URL('./packages/fox-ui', import.meta.url)),
    },
  },
  esbuild: {
    target: 'es2022',
    tsconfigRaw: {
      compilerOptions: {
        useDefineForClassFields: true,
      },
    },
  },
});
