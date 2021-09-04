import { Asset } from 'contentful';
import Image from 'next/image';
import { usePlaceholder } from './PlaceholderProvider';

export interface AssetImageProps {
   image: Asset;
   priority?: boolean;
}

export function AssetImage({ image, priority = false }: AssetImageProps): JSX.Element {
   const { file, title, description } = image.fields;
   const { id } = image.sys;
   const placeholder = usePlaceholder(id);

   return (
      <div className='my-8'>
         <Image
            className='rounded'
            src={`https:${file.url}`}
            width={file.details.image?.width ?? 0}
            height={file.details.image?.height ?? 0}
            placeholder={placeholder === undefined ? undefined : 'blur'}
            blurDataURL={placeholder}
            priority={priority}
            alt={title}
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
