import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';
import { Asset, EntryFields, RichTextContent } from 'contentful';
import { AssetImage } from './AssetImage';
import { BlankLink } from './BlankLink';

export interface RichTextProps {
   text: EntryFields.RichText;
}

interface HyperlinkData {
   uri: string;
}

interface EmbeddedAssetData {
   target: Asset;
}

export function RichText({ text }: RichTextProps): JSX.Element {
   return (
      <>
         {documentToReactComponents(text as Document, {
            renderNode: {
               [INLINES.HYPERLINK]: (node, children) => {
                  // eslint-disable-next-line react/destructuring-assignment
                  const data = node.data as HyperlinkData;
                  return <BlankLink href={data.uri}>{children}</BlankLink>;
               },
               [BLOCKS.EMBEDDED_ASSET]: (node) => {
                  // eslint-disable-next-line react/destructuring-assignment
                  const data = node.data as EmbeddedAssetData;
                  return <AssetImage image={data.target} />;
               },
            },
         })}
      </>
   );
}

export function getRichTextImages(text: EntryFields.RichText | RichTextContent): Asset[] {
   const images = text.content?.flatMap((content) => getRichTextImages(content)) ?? [];
   if ((text.nodeType as string) === 'embedded-asset-block') {
      const data = text.data as EmbeddedAssetData;
      images.push(data.target);
   }
   return images;
}
