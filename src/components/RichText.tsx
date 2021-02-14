import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { EntryFields } from 'contentful';
import { Prose } from './Prose';

export interface RichTextProps {
   text: EntryFields.RichText;
}

export function RichText({ text }: RichTextProps): JSX.Element {
   return (
      <>
         {documentToReactComponents(text as any)}
      </>
   );
}
