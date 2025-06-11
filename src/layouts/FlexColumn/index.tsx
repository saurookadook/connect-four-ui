import * as React from 'react';

import './styles.css';

export type FlexColumnProps = React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>;

export function FlexColumn({ children, ...props }: FlexColumnProps) {
    return (
        <div className="flex-column" {...props}>
            {children}
        </div>
    );
}
