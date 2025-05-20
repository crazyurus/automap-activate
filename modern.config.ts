import { appTools, defineConfig } from '@modern-js/app-tools';
import { bffPlugin } from '@modern-js/plugin-bff';
import { koaPlugin } from '@modern-js/plugin-koa';
import { polyfillPlugin } from '@modern-js/plugin-polyfill';
import { SemiRspackPlugin } from '@douyinfe/semi-rspack-plugin';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  bff: {
    enableHandleWeb: process.env.NODE_ENV === 'production',
  },
  server: {
    port: 8889,
  },
  runtime: {
    router: true,
  },
  plugins: [
    appTools({
      bundler: 'rspack',
    }),
    bffPlugin(),
    koaPlugin(),
    polyfillPlugin(),
  ],
  html: {
    title: '比亚迪定制版地图激活查询工具',
  },
  tools: {
    sass: {
      sassOptions: {
        silenceDeprecations: ['global-builtin', 'import'],
      },
    },
    rspack(config, context) {
      context.appendPlugins([
        new SemiRspackPlugin({
          theme: '@semi-bot/semi-theme-automap',
        }),
      ]);
    },
  },
  output: {
    polyfill: 'ua',
  },
});
