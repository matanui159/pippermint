import { Asset, Entry, EntryFields } from 'contentful';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { Title } from '../../components/title/Title';
import { RichText } from '../../components/RichText';
import Head from 'next/head';
import { Prose } from '../../components/Prose';
import { AssetImage } from '../../components/AssetImage';
import { getContentfulEntries } from '../../backend/contentful';

export interface BlogArticleFields {
   slug: EntryFields.Symbol;
   title: EntryFields.Symbol;
   image: Asset;
   body: EntryFields.RichText;
}

export interface BlogArticleProps {
   entry: Entry<BlogArticleFields>;
}

export default function BlogArticle({ entry }: BlogArticleProps): JSX.Element {
   return (
      <>
         <Head>
            <title>{entry.fields.title} - Pippermint</title>
         </Head>
         <Title />
         <Prose>
            <AssetImage image={entry.fields.image} priority />
            <h1>{entry.fields.title}</h1>
            <RichText text={entry.fields.body} />
         </Prose>
      </>
   );
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>): Promise<GetStaticPropsResult<BlogArticleProps>> {
   if (params === undefined) {
      throw new Error('Failed to get article slug');
   }
   const entries = await getContentfulEntries<BlogArticleFields>({
      content_type: 'blog',
      limit: 1,
      'fields.slug': params.slug
   });

   if (entries.length === 0) {
      throw new Error('Failed to get Contentful entry');
   }
   return {
      props: {
         entry: entries[0]
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
