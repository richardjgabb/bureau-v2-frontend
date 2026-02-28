import type { ColumnContainerProps } from './types';

const ColumnContainer = ({ children }: ColumnContainerProps) => {

    return (
        <div className="flex flex-col gap-1">
            {children}
        </div>
    )
}

export default ColumnContainer