import type { ReactNode } from 'react';

export interface DropdownOption {
    value: string | number;
    label: string | ReactNode;
    disabled?: boolean;
    reasons?: DropdownOption[];
}
