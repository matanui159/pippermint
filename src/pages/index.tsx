import Head from 'next/head';
import { Title } from '../components/title/Title';

export default function Index(): JSX.Element {
   return (
      <>
         <Head>
            <title>Pippermint</title>
         </Head>
         <Title />
      </>
   );
}
