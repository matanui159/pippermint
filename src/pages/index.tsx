import { useRouter } from 'next/router';
import Head from 'next/head';
import { Title } from '../components/title/Title';
import { useEffect } from 'react';

export default function Index(): JSX.Element {
   const router = useRouter();

   useEffect(() => {
      router.replace('/blog/hello-world')
   }, []);

   return (
      <>
         <Head>
            <title>Pippermint</title>
         </Head>
         <Title />
      </>
   );
}
