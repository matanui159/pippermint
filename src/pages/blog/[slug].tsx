import { Asset, Entry, EntryFields } from 'contentful';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { getContentfulClient } from '../../backend/contentful';
import { Title } from '../../components/title/Title';
import { RichText } from '../../components/RichText';
import Head from 'next/head';
import { Prose } from '../../components/Prose';
import { AssetImage } from '../../components/AssetImage';

export interface BlogFields {
   slug: EntryFields.Symbol;
   title: EntryFields.Symbol;
   image: Asset;
   body: EntryFields.RichText;
}

export interface BlogProps {
   entry: Entry<BlogFields>;
}

export default function Blog({ entry }: BlogProps): JSX.Element {
   return (
      <>
         <Head>
            <title>{entry.fields.title} - Pippermint</title>
         </Head>
         <Title />
         <Prose>
            <AssetImage image={entry.fields.image} />
            <h1>{entry.fields.title}</h1>
            <RichText text={entry.fields.body} />
         </Prose>
      </>
   );
}

export type BlogParams = {
   slug: string;
}

export async function getStaticProps({ params }: GetStaticPropsContext<BlogParams>): Promise<GetStaticPropsResult<BlogProps>> {
   if (params === undefined) {
      throw new Error('Failed to get URL parameters');
   }
   const client = getContentfulClient();
   const entries = await client.getEntries<BlogFields>({
      limit: 1,
      content_type: 'blog',
      'fields.slug': params.slug
   });

   if (entries.errors !== undefined) {
      entries.errors.forEach(error => console.error(error));
   }
   if (entries.errors !== undefined || entries.items.length === 0) {
      throw new Error('Failed to get Contentful entry');
   }
   return {
      props: {
         entry: entries.items[0]
      },
      revalidate: 3600
   };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
   return {
      paths: [],
      fallback: 'blocking'
   };
}
