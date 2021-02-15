import { ChildProps } from '../props';

export function Prose({ children }: ChildProps): JSX.Element {
   return (
      <div className='prose prose-red box-content mx-auto px-4 pt-0 pb-8 dark:prose-dark'>
         {children}
      </div>
   );
}
