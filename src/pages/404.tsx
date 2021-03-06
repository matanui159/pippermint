import Head from 'next/head';
import { Header } from '../components/header/Header';

export default function NotFound(): JSX.Element {
   return (
      <>
         <Head>
            <title>404 - Pippermint</title>
         </Head>
         <div className='fixed top-0 w-full'>
            <Header />
         </div>
         <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <div className='text-gray-900 text-9xl font-extrabold dark:text-gray-50'>
               404
            </div>
            <div className='text-gray-700 text-xl dark:text-gray-300'>
               I&apos;m not like the other pages
            </div>
         </div>
      </>
   );
}
