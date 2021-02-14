module.exports = {
   rewrites: async () => [
      {
         source: '/blog',
         destination: '/blog/page/0'
      }
   ],
   images: {
      domains: ['images.ctfassets.net']
   }
};
