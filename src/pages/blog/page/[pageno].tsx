import { Entry } from 'contentful';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';
import { getContentfulEntries } from '../../../backend/contentful';
import { getPlaceholders } from '../../../backend/placeholders';
import { AssetImage } from '../../../components/AssetImage';
import {
   PlaceholderProvider,
   Placeholders,
} from '../../../components/PlaceholderProvider';
import { Prose } from '../../../components/Prose';
import { Title } from '../../../components/Title';
import { Header } from '../../../components/header/Header';
import { Paginator } from '../../../components/paginator/Paginator';
import { BlogArticleFields } from '../[slug]';

const ARTICLES_PER_PAGE = 10;

export type BlogPageFields = Omit<BlogArticleFields, 'body'>;

export interface BlogPageProps {
   pageno: number;
   lastPage: boolean;
   entries: Entry<BlogPageFields>[];
   placeholders: Placeholders;
}

export default function BlogPage({
   entries,
   pageno,
   lastPage,
   placeholders,
}: BlogPageProps): JSX.Element {
   return (
      <PlaceholderProvider placeholders={placeholders}>
         <Head>
            <title>Blog - Peppermint</title>
         </Head>
         <Header />
         <Prose>
            {entries.map((entry, index) => (
               <Fragment key={entry.sys.id}>
                  <Link href={`/blog/${entry.fields.slug}`}>
                     <a
                        className='block transform transition-transform hover:scale-105'
                        style={{ textDecoration: 'none' }}
                     >
                        {entry.fields.image && (
                           <AssetImage
                              image={entry.fields.image}
                              priority={index === 0}
                           />
                        )}
                        <Title title={entry.fields.title} date={entry.fields.date} />
                     </a>
                  </Link>
                  <hr />
               </Fragment>
            ))}
            <Paginator pageno={pageno} lastPage={lastPage} />
         </Prose>
      </PlaceholderProvider>
   );
}

export async function getStaticProps({
   params,
}: GetStaticPropsContext<{ pageno: string }>): Promise<
   GetStaticPropsResult<BlogPageProps>
> {
   const revalidate = 60;
   const pageno = Number.parseInt(params?.pageno ?? 'NaN', 10);
   if (Number.isNaN(pageno)) {
      return {
         notFound: true,
         revalidate,
      };
   }

   const entries = await getContentfulEntries<BlogArticleFields>({
      content_type: 'blog',
      skip: ARTICLES_PER_PAGE * pageno,
      limit: ARTICLES_PER_PAGE + 1,
      order: '-fields.date',
   });
   if (entries.length === 0) {
      return {
         notFound: true,
         revalidate,
      };
   }

   const placeholders = await getPlaceholders(entries.map((entry) => entry.fields.image));
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
         placeholders,
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
