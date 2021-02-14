import { PropsWithChildren } from 'react';

export function Prose({ children }: PropsWithChildren<{}>): JSX.Element {
   return (
      <div className='prose box-content mx-auto p-4 pt-0 dark:prose-dark'>
         {children}
      </div>
   );
}
