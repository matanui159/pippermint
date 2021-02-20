const withPlugins = require('next-compose-plugins');
const preact = require('next-plugin-preact');
const bundleAnalyzer = require('@next/bundle-analyzer');

module.exports = withPlugins([
   preact,
   bundleAnalyzer({
      enabled: process.env.NEXT_ANALYZE === 'true'
   })
], {
   rewrites: async () => [
      {
         source: '/blog',
         destination: '/blog/page/0'
      }
   ],
   images: {
      domains: ['images.ctfassets.net']
   }
});
