import { HTMLProps } from 'react';

export function BlankLink({ rel, children, ...props }: HTMLProps<HTMLAnchorElement>): JSX.Element {
   return (
      <a rel={`noopener noreferrer ${rel}`} target='_blank' {...props}>
         {children}
      </a>
   );
}
