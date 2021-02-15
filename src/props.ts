import { PropsWithChildren } from 'react';

export interface ClassProps {
   className?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type ChildProps = PropsWithChildren<{}>;

export type CommonProps = PropsWithChildren<ClassProps>;
