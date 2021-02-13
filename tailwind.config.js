const typography = require('@tailwindcss/typography');

module.exports = {
   plugins: [typography],
   purge: ['**/*.tsx'],
   darkMode: 'class',
   variants: {
      typography: ['dark']
   },
   theme: {
      extend: {
         fontFamily: {
            body: ['Nunito', 'ui-sans-serif', 'sans-serif'],
            title: ['"Fredoka One"', 'ui-sans-serif', 'sans-serif']
         },
         typography: theme => ({
            dark: {
               css: {
                  color: theme('colors.gray.300'),
                  'h1,h2,h3,h4': {
                     color: theme('colors.gray.50')
                  }
               }
            }
         })
      }
   }
};
