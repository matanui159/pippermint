import Link from 'next/link';
import { useScrollY } from '../../hooks/useScrollY';
import { ClassProps, CommonProps } from '../../props';
import { ThemeButton } from './ThemeButton';

const HeaderBase = ({ className = '', children }: CommonProps) => (
   <div
      className={`flex flex-col items-center m-4 border px-8 py-4 text-red-600 sm:flex-row sm:mx-8 dark:text-red-500 ${className}`}
   >
      {children}
   </div>
);

const Title = () => (
   <div className='flex-grow text-4xl font-title'>
      <Link href='/'>Pippermint</Link>
   </div>
);

const Links = ({ className = '' }: ClassProps) => (
   <div className={`flex items-center space-x-8 text-xl ${className}`}>
      <ThemeButton />
      <div className='transform transition-transform hover:scale-110'>
         <Link href='/blog'>Blog</Link>
      </div>
      <div className='transform transition-transform hover:scale-110'>
         <Link href='/projects'>Projects</Link>
      </div>
   </div>
);

export function Header(): JSX.Element {
   const scrollY = useScrollY();

   return (
      <>
         <HeaderBase className='border-transparent space-y-8 sm:space-y-0'>
            <Title />
            <Links />
         </HeaderBase>
         {scrollY > 0 && (
            <div className='fixed top-0 z-10 w-full bg-gradient-to-b from-gray-50 via-gray-50 dark:from-gray-900 dark:via-gray-900'>
               <HeaderBase className='border-red-300 rounded-full bg-gray-50 dark:border-red-900 dark:bg-gray-900'>
                  <Title />
                  <Links className='hidden sm:flex' />
               </HeaderBase>
            </div>
         )}
      </>
   );
}
