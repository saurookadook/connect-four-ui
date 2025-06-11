import * as React from 'react';

import './styles.css';

export type FlexRowProps = React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>;

export function FlexRow({ children, ...props }: FlexRowProps) {
    return (
        <div className="flex-row" {...props}>
            {children}
        </div>
    );
}
