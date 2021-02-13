import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
   public render(): JSX.Element {
      return (
         <Html lang='en'>
            <Head>
               <link rel='preconnect' href='https://fonts.gstatic.com' />
               <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800&display=swap' />
               <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Fredoka+One&display=block&text=Pipermnt' />
            </Head>
            <body className='bg-gray-50 font-body dark:bg-gray-900'>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}
