import { defineConfig } from 'dumi';

const publicPath = process.env.NODE_ENV === 'production' ? './' : '/';

export default defineConfig({
  title: 'jhooks',
  favicon: `${publicPath}simple-logo.png`,
  logo: `${publicPath}simple-logo.png`,
  outputPath: 'docs-dist',
  mode: 'site',
  publicPath,
  navs: [
    {
      title: 'Hooks',
      path: '/hooks',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/wjjhhh/jhooks',
    },
  ],
  // chainWebpack: (config) => {
   
  // },
  // more config: https://d.umijs.org/config
});
