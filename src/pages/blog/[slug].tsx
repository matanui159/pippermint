import { Asset, Entry, EntryFields } from 'contentful';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { getContentfulEntries } from '../../backend/contentful';
import { getPlaceholders } from '../../backend/placeholders';
import { AssetImage } from '../../components/AssetImage';
import { PlaceholderProvider, Placeholders } from '../../components/PlaceholderProvider';
import { Prose } from '../../components/Prose';
import { RichText, getRichTextImages } from '../../components/RichText';
import { Title } from '../../components/Title';
import { Header } from '../../components/header/Header';

export interface BlogArticleFields {
   slug: EntryFields.Symbol;
   image?: Asset;
   title: EntryFields.Symbol;
   date: EntryFields.Date;
   body: EntryFields.RichText;
}

export interface BlogArticleProps {
   entry: Entry<BlogArticleFields>;
   placeholders?: Placeholders;
}

export default function BlogArticle({
   entry,
   placeholders = {},
}: BlogArticleProps): JSX.Element {
   const router = useRouter();
   const title = `${entry.fields.title} - Pippermint`;

   return (
      <PlaceholderProvider placeholders={placeholders}>
         <Head>
            <title>{title}</title>
            <meta property='og:title' content={title} />
            <meta property='og:type' content='article' />
            <meta property='og:image' content={entry.fields.image?.fields.file.url} />
            <meta property='og:url' content={`https://pippermint.io${router.asPath}`} />
            <meta property='og:article:published_date' content={entry.fields.date} />
            <meta property='og:article:author' content="Joshua 'Pip' Minter" />
         </Head>
         <Header />
         <Prose>
            {entry.fields.image && <AssetImage image={entry.fields.image} priority />}
            <Title title={entry.fields.title} date={entry.fields.date} />
            <RichText text={entry.fields.body} />
         </Prose>
      </PlaceholderProvider>
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

   const { image, body } = entries[0].fields;
   const placeholders = await getPlaceholders([image, ...getRichTextImages(body)]);
   return {
      props: {
         entry: entries[0],
         placeholders,
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
