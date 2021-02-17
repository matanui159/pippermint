import { Asset, Entry, EntryFields } from 'contentful';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { getContentfulEntries } from '../../backend/contentful';
import { AssetImage } from '../../components/AssetImage';
import { Prose } from '../../components/Prose';
import { RichText } from '../../components/RichText';
import { Title } from '../../components/title/Title';

export interface BlogArticleFields {
   slug: EntryFields.Symbol;
   image?: Asset;
   title: EntryFields.Symbol;
   date: EntryFields.Date;
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
            {entry.fields.image && <AssetImage image={entry.fields.image} priority />}
            <h1>{entry.fields.title}</h1>
            <RichText text={entry.fields.body} />
         </Prose>
      </>
   );
}

export async function getStaticProps({
   params,
}: GetStaticPropsContext<{ slug: string }>): Promise<
   GetStaticPropsResult<BlogArticleProps>
> {
   const revalidate = 60;
   if (params === undefined) {
      return {
         notFound: true,
         revalidate,
      };
   }

   const entries = await getContentfulEntries<BlogArticleFields>({
      content_type: 'blog',
      limit: 1,
      'fields.slug': params.slug,
   });
   if (entries.length === 0) {
      return {
         notFound: true,
         revalidate,
      };
   }
   return {
      props: {
         entry: entries[0],
      },
      revalidate,
   };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
   const entries = await getContentfulEntries<BlogArticleFields>({
      content_type: 'blog',
      limit: 10,
      order: '-sys.createdAt',
   });
   return {
      paths: entries.map((entry) => `/blog/${entry.fields.slug}`),
      fallback: 'blocking',
   };
}
