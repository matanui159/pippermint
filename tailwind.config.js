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
                  'h1,h2,h3,h4,blockquote': {
                     color: theme('colors.gray.50')
                  },
                  'hr': {
                     borderColor: theme('colors.gray.800')
                  },
                  'ul>li::before': {
                     backgroundColor: theme('colors.gray.700')
                  },
                  'ol>li::before': {
                     color: theme('colors.gray.400')
                  },
                  a: {
                     color: theme('colors.red.500')
                  }
               }
            }
         })
      }
   }
};
