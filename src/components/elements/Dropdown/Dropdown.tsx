import { useState, useRef, useEffect } from 'react';
import type { DropdownOption } from '@elements/Dropdown/index.ts';
import ChevronIcon from '@icons/chevron.svg';
import Icon from '@elements/Icon/Icon.tsx';
import Tooltip from '@elements/Tooltip/Tooltip.tsx';
import { Tag } from '@elements/Tag/Tag.tsx';
import type { IIncludeTooltip } from '@elements/Tooltip';
import CloseIcon from '@icons/close.svg';
import type { TagSize, TagVariant } from '@elements/Tag';

interface IDropdownProps extends IIncludeTooltip {
    id: string;
    name?: string;
    label?: string;
    options: DropdownOption[];
    selectedValues?: DropdownOption['value'][];
    onChange?: (selectedValues: DropdownOption['value'][]) => void;
    placeholder?: string;
    searchable?: boolean;
    multiple?: boolean;
    error?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    removable?: boolean;
    className?: string;
    btnClass?: string;
    tagVariant?: TagVariant;
    tagSize?: TagSize;
    position?: 'bottom' | 'top';
    align?: 'left' | 'center' | 'right';
}

export function Dropdown({
    id,
    name = id,
    label = '',
    options,
    selectedValues = [],
    placeholder = 'Select options...',
    searchable = true,
    multiple = true,
    tooltip,
    tooltipVariant = 'secondary',
    tooltipPosition = 'top',
    tooltipAfter,
    error,
    hint,
    required = false,
    disabled = false,
    removable = false,
    className = '',
    btnClass = 'btn-md',
    tagVariant = 'primary',
    tagSize = 'md',
    position = 'bottom',
    align = 'center',
    onChange,
}: IDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getDropdownClasses = (): string => {
        const baseClass = 'dropdown';
        const positionClass = `dropdown-${position}`;
        const alignClass = `dropdown-${align}`;
        return `${baseClass} ${positionClass} ${alignClass} w-full`;
    };

    const filteredOptions = options.filter(
        (option) => typeof option.label === 'string' && option.label?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOptionChange = (optionValue: DropdownOption['value'], checked: boolean) => {
        if (!onChange) return;

        let newSelectedValues: DropdownOption['value'][];

        if (multiple) {
            if (checked) {
                newSelectedValues = [...selectedValues, optionValue];
            } else {
                newSelectedValues = selectedValues.filter((value) => value !== optionValue);
            }
        } else {
            newSelectedValues = checked ? [optionValue] : [];
            setIsOpen(false);
        }

        onChange(newSelectedValues);
    };

    const onRemove = (tag: DropdownOption) => {
        if (!onChange) return;
        const newSelectedValues = selectedValues.filter((value) => value !== tag.value);

        onChange(newSelectedValues);
    };

    useEffect(() => {
        if (searchTerm && !isOpen) {
            setIsOpen(true);
        }
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`field ${className}`}>
            <div className="flex items-center">
                {label && (
                    <label className={`label ${required && label ? 'required' : ''}`} htmlFor={id}>
                        &nbsp;{label}
                    </label>
                )}
                {tooltip && (
                    <Tooltip
                        className={'ms-2 mb-2 align-middle'}
                        variant={tooltipVariant}
                        position={tooltipPosition}
                        after={tooltipAfter}
                    >
                        {tooltip}
                    </Tooltip>
                )}
            </div>

            <div className={`${getDropdownClasses()} ${isOpen ? 'dropdown-open' : ''} relative z-50`} ref={dropdownRef}>
                <button
                    type="button"
                    className={`btn validator input w-full cursor-pointer has-[:focus]:bg-base-100 ${error ? 'input-error' : ''
                        } ${disabled ? 'input-disabled' : ''} ${btnClass} btn btn-md`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                >
                    <div className="flex items-center gap-x-3 gap-y-1">
                        {!!selectedValues?.length && (
                            <div className="flex gap-x-3 gap-y-1" id={id}>
                                {options
                                    .filter((opt) => selectedValues.includes(opt.value))
                                    .map((tag) => (
                                        <div key={tag.value}>
                                            <Tag variant={tagVariant} size={tagSize} className="items-center">
                                                {tag.label}
                                                {removable && (
                                                    <Icon
                                                        src={CloseIcon}
                                                        className="!size-5 align-middle text-secondary"
                                                        onClick={() => onRemove(tag)}
                                                    />
                                                )}
                                            </Tag>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {!searchable && selectedValues?.length < 2 && !selectedValues[0] && (
                            <div className="text-sm text-secondary">{placeholder ?? 'Select'}</div>
                        )}

                        {searchable && (
                            <input
                                type="search"
                                className="grow"
                                placeholder={placeholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => {
                                    if (!isOpen) setIsOpen(true);
                                }}
                                disabled={disabled}
                            />
                        )}
                    </div>
                    <span className="dropdown-arrow">
                        <Icon src={ChevronIcon} className={`size-4 transition-transform`} />
                    </span>
                </button>

                {isOpen && (
                    <ul tabIndex={0} className="menu w-full dropdown-content bg-base-100 p-2 z-[9999] shadow-lg border border-onlan-lavender absolute top-full left-0 right-0 mt-1 overflow-y-auto" style={{ maxHeight: '300px' }}>
                        {filteredOptions.length === 0 ? (
                            <li>
                                <div className="p-3 text-sm text-base-content/60">No options found</div>
                            </li>
                        ) : (
                            filteredOptions.map((option, index) => (
                                <li key={`${id}-${index}`}>
                                    <label
                                        htmlFor={`${name}-${index}`}
                                        className={`dropdown-item cursor-pointer p-3 ${option.disabled ? 'cursor-not-allowed opacity-50' : ''
                                            }`}
                                    >
                                        <span className="text-sm">{option.label}</span>
                                        <input
                                            id={`${name}-${index}`}
                                            type={'checkbox'}
                                            name={multiple ? `${name}[]` : name}
                                            value={option.value}
                                            className={`checkbox ms-auto checkbox-xs ${multiple ? '' : 'hidden'}`}
                                            checked={selectedValues.includes(option.value)}
                                            onChange={(e) => handleOptionChange(option.value, e.target.checked)}
                                            disabled={option.disabled || disabled}
                                        />
                                    </label>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>

            {error && <div className="validator-hint visible text-error">{error}</div>}

            {hint && !error && <div className="validator-hint hidden">{hint}</div>}
        </div>
    );
}
