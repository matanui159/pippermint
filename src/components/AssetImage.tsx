import { Asset } from 'contentful';
import Image from 'next/image';

export interface AssetImageProps {
   image: Asset;
   priority?: boolean;
}

export function AssetImage({ image, priority = false }: AssetImageProps): JSX.Element {
   const { file, title } = image.fields;

   return (
      <div className='my-8'>
         <Image
            className='rounded'
            src={`https:${file.url}`}
            alt={title}
            width={file.details.image?.width ?? 1}
            height={file.details.image?.height ?? 1}
            priority={priority}
         />
      </div>
   );
}
