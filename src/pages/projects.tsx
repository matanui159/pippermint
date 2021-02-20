import { Asset, Entry, EntryFields } from 'contentful';
import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { getContentfulEntries } from '../backend/contentful';
import { AssetImage } from '../components/AssetImage';
import { BlankLink } from '../components/BlankLink';
import { Prose } from '../components/Prose';
import { Header } from '../components/header/Header';

export interface ProjectFields {
   order: EntryFields.Integer;
   url: EntryFields.Symbol;
   name: EntryFields.Symbol;
   image: Asset;
}

export interface ProjectsProps {
   entries: Entry<ProjectFields>[];
}

export default function Projects({ entries }: ProjectsProps): JSX.Element {
   return (
      <>
         <Head>
            <title>Projects - Pippermint</title>
         </Head>
         <Header />
         <Prose>
            {entries.map((entry, index) => (
               <Fragment key={entry.sys.id}>
                  {index > 0 && <hr />}
                  <BlankLink
                     className='block transform transition-transform hover:scale-105'
                     style={{ textDecoration: 'none' }}
                     href={entry.fields.url}
                  >
                     <AssetImage image={entry.fields.image} priority={index === 0} />
                     <h1>{entry.fields.name}</h1>
                  </BlankLink>
               </Fragment>
            ))}
         </Prose>
      </>
   );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<ProjectsProps>> {
   const entries = await getContentfulEntries<ProjectFields>({
      content_type: 'project',
      order: 'fields.order',
   });
   return {
      props: {
         entries,
      },
      revalidate: 60,
   };
}
