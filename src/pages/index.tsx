import Head from 'next/head';
import Link from 'next/link';
import { BlankLink } from '../components/BlankLink';
import { Prose } from '../components/Prose';
import { Title } from '../components/title/Title';

export default function Index(): JSX.Element {
   return (
      <>
         <Head>
            <title>Pippermint</title>
         </Head>
         <Title />
         <Prose>
            <h1>Welcome!</h1>
            <h4>I am Joshua &lsquo;Pip&rsquo; Minter.</h4>
            <h4>I enjoy programming and having pineapple on pizza.</h4>
            <h4>I am smart enough to program in C but not smart enough to avoid it.</h4>
            <h4>
               I work at <BlankLink href='https://clipchamp.com/en/'>Clipchamp</BlankLink>{' '}
               where I spend my time playing{' '}
               <BlankLink href='https://boardgamegeek.com/boardgame/131357/coup'>
                  Coup
               </BlankLink>
               .
            </h4>
            <h4>
               I created{' '}
               <BlankLink href='https://github.com/matanui159/ReplaySorcery'>
                  ReplaySorcery
               </BlankLink>{' '}
               (pretty good) and{' '}
               <BlankLink href='https://imgdrop.app'>Image Drop</BlankLink> (not so good).
            </h4>
            <h4>
               I will use my <Link href='/blog'>blog</Link> as a dumping ground of various
               thoughts.
            </h4>
            <h4>All opinions are my own. No one cares about them anyway.</h4>
         </Prose>
      </>
   );
}
