export interface TitleProps {
   title: string;
   date: string;
}

export function Title({ title, date }: TitleProps): JSX.Element {
   return (
      <>
         <h1 style={{ marginBottom: 0 }}>{title}</h1>
         <p className='text-gray-500 dark:text-gray-400' style={{ marginTop: 0 }}>
            {date}
         </p>
      </>
   );
}
