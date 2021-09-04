import { Asset } from 'contentful';
import { getPlaiceholder } from 'plaiceholder';
import { Placeholders } from '../components/PlaceholderProvider';

export async function getPlaceholders(
   images: (Asset | undefined)[]
): Promise<Placeholders> {
   const placeholders: Placeholders = {};
   await Promise.all(
      images.map(async (image) => {
         if (image !== undefined) {
            const { base64 } = await getPlaiceholder(`https:${image.fields.file.url}`);
            placeholders[image.sys.id] = base64;
         }
      })
   );
   return placeholders;
}
