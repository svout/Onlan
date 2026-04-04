import Skeleton from '@elements/Loading/Skeleton.tsx';

type SkeletonBreakpoints = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SkeletonLineType = number | Record<SkeletonBreakpoints, number | undefined>;

interface TableSkeletonProps {
    className?: string;
    rows?: SkeletonLineType;
    cols?: SkeletonLineType;
    colClasses?: string[];
}

export default function TableSkeleton({ className = '', rows = 5, cols = 4, colClasses = [] }: TableSkeletonProps) {
    const getMaxValue = (value: SkeletonLineType) => {
        if (typeof value == 'number') {
            return value;
        }
        return Math.max(...Object.values(value).filter((v): v is number => typeof v === 'number'));
    };

    const breakpointClasses: Record<string, string> = {
        sm: 'sm:hidden',
        md: 'md:hidden',
        lg: 'lg:hidden',
        xl: 'xl:hidden',
        '2xl': '2xl:hidden',
    };

    const showBreakpointClasses: Record<string, string> = {
        sm: 'sm:block',
        md: 'md:block',
        lg: 'lg:block',
        xl: 'xl:block',
        '2xl': '2xl:block',
    };

    const getHiddenClasses = (j: number, cols: SkeletonLineType): string => {
        if (typeof cols !== 'object') return '';

        const hiddenClassList: string[] = [];

        for (const [bp, maxCols] of Object.entries(cols)) {
            if (typeof maxCols === 'number' && j >= maxCols) {
                hiddenClassList.push(breakpointClasses[bp]);
            } else if (maxCols !== undefined && j < maxCols) {
                hiddenClassList.push(showBreakpointClasses[bp]);
            }
        }

        return hiddenClassList.join(' ');
    };

    return (
        <div className={`grid gap-2 bg-onlan-white ${className}`}>
            {[...Array(getMaxValue(rows)).keys()].map((_, i) => {
                return (
                    <div className="flex items-center justify-between gap-3 border-b border-onlan-lavender px-3 py-3" key={i}>
                        {[...Array(getMaxValue(cols)).keys()].map((_, j) => {
                            const customColClass = colClasses[j] || '';
                            return (
                                <Skeleton
                                    className={`h-5 w-full rounded ${customColClass} ${getHiddenClasses(j, cols)}`}
                                    key={j}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
