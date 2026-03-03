import { SemiRspackPlugin } from '@douyinfe/semi-rspack-plugin';
import { appTools, defineConfig } from '@modern-js/app-tools';
import { bffPlugin } from '@modern-js/plugin-bff';
import { polyfillPlugin } from '@modern-js/plugin-polyfill';

export default defineConfig({
  bff: {
    enableHandleWeb: process.env.NODE_ENV === 'production'
  },
  server: {
    port: 8889
  },
  plugins: [appTools(), bffPlugin(), polyfillPlugin()],
  html: {
    title: 'BYD 定制版地图工具'
  },
  tools: {
    sass: {
      sassOptions: {
        silenceDeprecations: ['global-builtin', 'import']
      }
    },
    rspack: {
      plugins: [
        new SemiRspackPlugin({
          theme: '@semi-bot/semi-theme-automap'
        })
      ]
    }
  },
  output: {
    polyfill: 'ua'
  }
});
