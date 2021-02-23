const withBundleAnalyzer = require('@next/bundle-analyzer');

module.exports = withBundleAnalyzer({
   enabled: process.env.NEXT_ANALYZE === 'true'
})({
   productionBrowserSourceMaps: true,
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
