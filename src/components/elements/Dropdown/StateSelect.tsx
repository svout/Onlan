import { type ReactNode } from 'react';
import type { DropdownOption } from '@elements/Dropdown/index.ts';
import { Select } from '@elements/Dropdown/Select.tsx';
import { usStates } from '@utils/constants.ts';
import type { IIncludeTooltip } from '@elements/Tooltip';

interface StateSelectProps extends IIncludeTooltip {
    id: string;
    children?: ReactNode;
    name?: string;
    label?: string;
    options?: DropdownOption[];
    value?: DropdownOption['value'];
    onChange?: (value: string) => void;
    placeholder?: string;
    searchable?: boolean;
    loading?: boolean;
    error?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    labelClassName?: string;
    btnClassName?: string;
    placeholderClass?: string;
    position?: 'bottom' | 'top';
    align?: 'left' | 'center' | 'right';
    maxHeight?: string;
}

export default function StateSelect({
    id,
    children = '',
    name = id,
    label = 'State',
    options,
    value = '',
    placeholder = 'State',
    searchable = true,
    error,
    hint,
    required = false,
    disabled = false,
    className = '',
    labelClassName = '',
    btnClassName = '',
    placeholderClass = '',
    position = 'bottom',
    align = 'center',
    maxHeight,
    onChange,
    ...props
}: StateSelectProps) {
    const stateOptions: DropdownOption[] = usStates.map((state) => {
        const formattedName = state.name
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return {
            value: state.abbreviation,
            label: `${state.abbreviation} - ${formattedName}`,
        };
    });

    return (
        <Select
            id={id}
            name={name}
            className={className}
            btnClassName={btnClassName}
            labelClassName={labelClassName}
            label={label}
            placeholderClass={placeholderClass}
            placeholder={placeholder}
            options={options ? options : stateOptions}
            required={required}
            disabled={disabled}
            hint={required ? 'State is required' : hint}
            position={position}
            align={align}
            searchable={searchable}
            error={error}
            value={value}
            maxHeight={maxHeight}
            onChange={(value) => (onChange ? onChange(value.toString()) : undefined)}
            {...props}
        >
            {children && children}
        </Select>
    );
}
