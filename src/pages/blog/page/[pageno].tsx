import { Entry } from 'contentful';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';
import { getContentfulEntries } from '../../../backend/contentful';
import { AssetImage } from '../../../components/AssetImage';
import { Prose } from '../../../components/Prose';
import { Paginator } from '../../../components/paginator/Paginator';
import { Title } from '../../../components/title/Title';
import NotFound from '../../404';
import { BlogArticleFields } from '../[slug]';

const ARTICLES_PER_PAGE = 10;
const PRIORITY_PER_PAGE = 3;

export type BlogPageFields = Omit<BlogArticleFields, 'body'>;

export interface BlogPageProps {
   pageno: number;
   lastPage: boolean;
   entries: Entry<BlogPageFields>[];
}

export default function BlogPage({
   entries,
   pageno,
   lastPage,
}: BlogPageProps): JSX.Element {
   if (entries.length === 0) {
      return <NotFound />;
   }

   return (
      <>
         <Head>
            <title>Blog - Peppermint</title>
         </Head>
         <Title />
         <Prose>
            {entries.map((entry, index) => (
               <Fragment key={entry.sys.id}>
                  <Link href={`/blog/${entry.fields.slug}`}>
                     <a
                        className='block transform transition-transform hover:scale-105'
                        style={{ textDecoration: 'none' }}
                     >
                        <AssetImage
                           image={entry.fields.image}
                           priority={index < PRIORITY_PER_PAGE}
                        />
                        <h1>{entry.fields.title}</h1>
                     </a>
                  </Link>
                  <hr />
               </Fragment>
            ))}
            <Paginator pageno={pageno} lastPage={lastPage} />
         </Prose>
      </>
   );
}

export async function getStaticProps({
   params,
}: GetStaticPropsContext<{ pageno: string }>): Promise<
   GetStaticPropsResult<BlogPageProps>
> {
   const revalidate = 3600;
   const pageno = Number.parseInt(params?.pageno ?? 'NaN', 10);
   if (Number.isNaN(pageno)) {
      return {
         props: {
            pageno,
            lastPage: true,
            entries: [],
         },
         revalidate,
      };
   }

   const entries = await getContentfulEntries<BlogArticleFields>({
      content_type: 'blog',
      skip: ARTICLES_PER_PAGE * pageno,
      limit: ARTICLES_PER_PAGE + 1,
      order: '-sys.createdAt',
   });
   return {
      props: {
         pageno,
         lastPage: entries.length <= ARTICLES_PER_PAGE,
         entries: entries.slice(0, ARTICLES_PER_PAGE).map((entry) => {
            const { body, ...fields } = entry.fields;
            return {
               ...entry,
               fields,
            };
         }),
      },
      revalidate,
   };
}

export function getStaticPaths(): Promise<GetStaticPathsResult> {
   return Promise.resolve({
      paths: ['/blog/page/0'],
      fallback: 'blocking',
   });
}
