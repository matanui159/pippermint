import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { LeftIcon } from './LeftIcon';
import { RightIcon } from './RightIcon';

interface ButtonProps {
   pageno: number;
}

const Button = ({ pageno, children }: PropsWithChildren<ButtonProps>): JSX.Element => (
   <div className='text-xl transform transition-transform hover:scale-110'>
      <Link href={`/blog/page/${pageno}`}>
         <a className='flex items-center space-x-4 ' style={{ textDecoration: 'none' }}>
            {children}
         </a>
      </Link>
   </div>
);

export interface PaginatorProps {
   pageno: number;
   lastPage?: boolean;
}

export function Paginator({ pageno, lastPage = false }: PaginatorProps): JSX.Element {
   return (
      <div className='flex justify-between'>
         {lastPage ? (
            <div />
         ) : (
            <Button pageno={pageno + 1}>
               <LeftIcon />
               <div>Older</div>
            </Button>
         )}
         {pageno === 0 ? (
            <div />
         ) : (
            <Button pageno={pageno - 1}>
               <div>Newer</div>
               <RightIcon />
            </Button>
         )}
      </div>
   );
}
