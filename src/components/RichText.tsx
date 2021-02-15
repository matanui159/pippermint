import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import { EntryFields } from 'contentful';

export interface RichTextProps {
   text: EntryFields.RichText;
}

export function RichText({ text }: RichTextProps): JSX.Element {
   return <>{documentToReactComponents(text as Document)}</>;
}
