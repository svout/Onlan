import type { ReactNode } from 'react';
import TableHeader from '@elements/Table/TableHeader.tsx';
import TableSkeleton, { type SkeletonLineType } from '@elements/Loading/TableSkeleton.tsx';

interface TableProps<T> {
    className?: string;
    wrapClassName?: string;
    headerClassName?: string;
    rowClassName?: string;
    data: T[];
    renderHeader?: () => ReactNode;
    renderRow: (item: T, index: number) => ReactNode;
    children?: ReactNode;
    pagination?: ReactNode;
    emptyState?: ReactNode;
    loading?: boolean;
    skeletonRows?: SkeletonLineType;
    skeletonCols?: SkeletonLineType;
    skeletonColClasses?: string[];
}

export function Table<T>({
    className = '',
    wrapClassName = '',
    headerClassName = '',
    rowClassName = '',
    data = [],
    renderHeader,
    renderRow,
    children,
    pagination,
    emptyState,
    loading = false,
    skeletonRows = 4,
    skeletonCols = 4,
    skeletonColClasses = [],
}: TableProps<T>) {
    const isEmpty = !data || data.length === 0;

    return (
        <div className={`${className}`}>
            <div
                className={`grid gap-6 md:gap-0 md:rounded-2xl md:border md:border-[#EBECEE] md:bg-base-100 ${wrapClassName}`}
            >
                <div className="w-max-w grid overflow-x-auto">
                    {renderHeader && <TableHeader className={headerClassName}>{renderHeader()}</TableHeader>}

                    <div className={`grid gap-6 max-md:px-4 md:join-vertical md:join md:gap-0 ${rowClassName}`}>
                        {loading ? (
                            <TableSkeleton rows={skeletonRows} cols={skeletonCols} colClasses={skeletonColClasses} />
                        ) : isEmpty && emptyState ? (
                            emptyState
                        ) : (
                            data.map((item, index) => renderRow(item, index))
                        )}
                    </div>
                    {children && children}
                </div>
                {pagination && pagination}
            </div>
        </div>
    );
}
