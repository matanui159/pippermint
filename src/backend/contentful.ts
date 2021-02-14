import { createClient, Entry } from 'contentful';

export async function getContentfulEntries<T>(query: unknown): Promise<Entry<T>[]> {
   const space = process.env.CONTENT_SPACE_ID;
   const accessToken = process.env.CONTENT_ACCESS_TOKEN;
   if (space === undefined || accessToken === undefined) {
      throw new Error('Space ID or access token not provided');
   }
   const client = createClient({ space, accessToken });
   const entries = await client.getEntries<T>(query);
   if (entries.errors !== undefined) {
      entries.errors.forEach(error => console.error(error));
      throw new Error('Failed to query Contentful');
   }
   return entries.items;
}
