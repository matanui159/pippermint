import { useScrollY } from '../../hooks/useScrollY';
import { ThemeButton } from './ThemeButton';

export function Title(): JSX.Element {
   const scrollY = useScrollY();

   const titleBase = 'flex flex-col items-center m-4 border px-8 py-4 text-red-600 sm:flex-row sm:mx-8 dark:text-red-500';
   const title = 'flex-grow text-4xl font-title';
   const linksBase = 'flex items-center space-x-8 text-xl';

   return (
      <>
         <div className={`${titleBase} border-transparent space-y-8 sm:space-y-0`}>
            <div className={title}>Pippermint</div>
            <div className={linksBase}>
               <ThemeButton />
               <div>Blog</div>
               <div>Projects</div>
            </div>
         </div>
         {scrollY > 0 && (
            <div className='fixed top-0 z-10 w-full bg-gradient-to-b from-gray-50 via-gray-50 dark:from-gray-900 dark:via-gray-900'>
               <div className={`${titleBase} border-red-300 rounded-full bg-gray-50 dark:border-red-900 dark:bg-gray-900`}>
                  <div className={title}>Pippermint</div>
                  <div className={`${linksBase} hidden sm:flex`}>
                     <ThemeButton />
                     <div>Blog</div>
                     <div>Projects</div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
