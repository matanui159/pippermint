import { Entry, createClient } from 'contentful';

export async function getContentfulEntries<T>(
   query: unknown,
   preview = false
): Promise<Entry<T>[]> {
   const space = process.env.CONTENT_SPACE_ID;
   const accessToken = preview
      ? process.env.CONTENT_PREVIEW_TOKEN
      : process.env.CONTENT_ACCESS_TOKEN;
   const host = preview ? 'preview.contentful.com' : 'cdn.contentful.com';
   if (space === undefined || accessToken === undefined) {
      throw new Error('Space ID or access token not provided');
   }

   const client = createClient({ host, space, accessToken });
   const entries = await client.getEntries<T>(query);
   if (entries.errors !== undefined) {
      // eslint-disable-next-line no-console
      entries.errors.forEach((error) => console.error(error));
      throw new Error('Failed to query Contentful');
   }
   return entries.items;
}
