import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'jhooks',
  favicon:
    '/simple-logo.png',
  logo: '/simple-logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
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
  // more config: https://d.umijs.org/config
});
