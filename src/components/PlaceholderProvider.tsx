import { createContext, useContext } from 'react';
import { ChildProps } from '../props';

export type Placeholders = Record<string, string | undefined>;

const PlaceholderContext = createContext<Placeholders | undefined>(undefined);

export interface PlaceholderProviderProps extends ChildProps {
   placeholders: Placeholders;
}

export function PlaceholderProvider({
   placeholders,
   children,
}: PlaceholderProviderProps): JSX.Element {
   return (
      <PlaceholderContext.Provider value={placeholders}>
         {children}
      </PlaceholderContext.Provider>
   );
}

export function usePlaceholder(id: string): string | undefined {
   const placeholders = useContext(PlaceholderContext);
   return placeholders?.[id];
}
