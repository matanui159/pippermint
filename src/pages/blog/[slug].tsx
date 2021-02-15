import { Asset, Entry, EntryFields } from 'contentful';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { Title } from '../../components/title/Title';
import { RichText } from '../../components/RichText';
import Head from 'next/head';
import { Prose } from '../../components/Prose';
import { AssetImage } from '../../components/AssetImage';
import { getContentfulEntries } from '../../backend/contentful';
import NotFound from '../404';

export interface BlogArticleFields {
   slug: EntryFields.Symbol;
   title: EntryFields.Symbol;
   image: Asset;
   body: EntryFields.RichText;
}

export interface BlogArticleProps {
   entry: Entry<BlogArticleFields> | null;
}

export default function BlogArticle({ entry }: BlogArticleProps): JSX.Element {
   if (entry === null) {
      return <NotFound />
   }

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
   const revalidate = 3600;
   if (params === undefined) {
      return {
         props: {
            entry: null
         },
         revalidate
      };
   }

   const entries = await getContentfulEntries<BlogArticleFields>({
      content_type: 'blog',
      limit: 1,
      'fields.slug': params.slug
   });
   return {
      props: {
         entry: entries.pop() ?? null
      },
      revalidate
   };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
   return {
      paths: [],
      fallback: 'blocking'
   };
}
