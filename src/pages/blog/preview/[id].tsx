import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { getContentfulEntries } from '../../../backend/contentful';
import BlogArticle, { BlogArticleFields, BlogArticleProps } from '../[slug]';

export default function BlogPreview({ entry }: BlogArticleProps): JSX.Element {
   return (
      <>
         <Head>
            <meta name='robots' content='noindex' />
         </Head>
         <BlogArticle entry={entry} />
      </>
   );
}

export async function getServerSideProps({
   params,
}: GetServerSidePropsContext<{ id: string }>): Promise<
   GetServerSidePropsResult<BlogArticleProps>
> {
   if (params === undefined) {
      return {
         notFound: true,
      };
   }

   const entries = await getContentfulEntries<BlogArticleFields>(
      {
         content_type: 'blog',
         limit: 1,
         'sys.id': params.id,
      },
      true
   );
   if (entries.length === 0) {
      return {
         notFound: true,
      };
   }
   return {
      props: {
         entry: entries[0],
      },
   };
}
