import { ContentfulClientApi, createClient } from 'contentful';

let client: ContentfulClientApi | undefined;

export function getContentfulClient(): ContentfulClientApi {
   if (client === undefined) {
      const space = process.env.CONTENT_SPACE_ID;
      const accessToken = process.env.CONTENT_ACCESS_TOKEN;
      if (space === undefined || accessToken === undefined) {
         throw new Error('Space ID or access token not provided');
      }
      client = createClient({ space, accessToken });
   }
   return client;
}
