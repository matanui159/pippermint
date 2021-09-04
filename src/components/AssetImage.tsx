import { Asset } from 'contentful';
import Image from 'next/image';

export interface AssetImageProps {
   image: Asset;
   priority?: boolean;
}

export function AssetImage({ image, priority = false }: AssetImageProps): JSX.Element {
   const { file, title, description } = image.fields;
   const { id } = image.sys;

   return (
      <div className='my-8'>
         <Image
            className='rounded'
            src={`https:${file.url}`}
            alt={title}
            width={file.details.image?.width ?? 0}
            height={file.details.image?.height ?? 0}
            priority={priority}
            aria-describedby={description === undefined ? undefined : id}
         />
         {description !== undefined && (
            <div className='hidden' id={id}>
               {description}
            </div>
         )}
      </div>
   );
}
