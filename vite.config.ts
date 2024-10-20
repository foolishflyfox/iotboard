import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import UnoCss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5180,
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
      dts: 'src/types/auto/auto-import.d.ts',
    }),
    Components({
      dirs: ['src/components'],
      dts: 'src/types/auto/components.d.ts',
      resolvers: [NaiveUiResolver()],
    }),
    codeInspectorPlugin({ bundler: 'vite' }),
    UnoCss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@mimic': fileURLToPath(new URL('./src/views/mimic', import.meta.url)),
    },
  },
});
