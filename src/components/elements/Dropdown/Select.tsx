import { useState, useRef, useEffect, type ReactNode } from 'react';
import type { DropdownOption } from '@elements/Dropdown/index.ts';
import ChevronIcon from '@icons/chevron.svg';
import Icon from '@elements/Icon/Icon.tsx';
import Tooltip from '@elements/Tooltip/Tooltip.tsx';
import type { IIncludeTooltip } from '@elements/Tooltip';

export interface SelectProps extends IIncludeTooltip {
    id: string;
    children?: ReactNode;
    name?: string;
    label?: string;
    options: DropdownOption[];
    value?: DropdownOption['value'];
    onChange?: (value: DropdownOption['value']) => void;
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

export function Select({
    id,
    children = '',
    name = id,
    label = '',
    options,
    value = '',
    placeholder = 'Select options...',
    searchable = false,
    loading = false,
    tooltip,
    tooltipVariant = 'secondary',
    tooltipPosition = 'top',
    tooltipAfter,
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
    maxHeight = '300px',
    onChange,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const getDropdownClasses = (): string => {
        const baseClass = 'dropdown';
        const positionClass = position == 'top' ? 'dropdown-top' : 'dropdown-bottom';
        const alignClass = `dropdown-${align}`;
        return `${baseClass} ${positionClass} ${alignClass} w-full`;
    };

    const getDropdownContentPositionClasses = (): string => {
        return position === 'top'
            ? 'absolute bottom-full left-0 right-0 mb-1'
            : 'absolute top-full left-0 right-0 mt-1';
    };

    const filteredOptions = searchable
        ? options.filter(
            (option) =>
                (typeof option.label === 'string' &&
                    option.label?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                option.value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
        : options;

    // Helper function to find exact match
    const findExactMatch = (searchText: string) => {
        const normalizedSearch = searchText.trim().toLowerCase();

        return options.find((option) => {
            if (typeof option.label === 'string') {
                const normalizedLabel = option.label.toLowerCase();
                // Check for exact match or match without prefix (e.g., "CA - California" matches "California")
                const labelWithoutPrefix = normalizedLabel.split(' - ').pop()?.toLowerCase() || normalizedLabel;
                return normalizedLabel === normalizedSearch ||
                    normalizedLabel.replace(/^[a-z]{2}\s*-\s*/i, '') === normalizedSearch ||
                    labelWithoutPrefix === normalizedSearch ||
                    normalizedLabel.startsWith(normalizedSearch + ' -') ||
                    normalizedLabel.endsWith(' - ' + normalizedSearch);
            }
            return option.value.toString().toLowerCase() === normalizedSearch;
        });
    };

    // Auto-select when there's only one filtered option that matches exactly
    useEffect(() => {
        if (searchable && searchTerm && !value && onChange && isOpen) {
            const trimmedSearch = searchTerm.trim();
            if (trimmedSearch.length > 0) {
                // Check if there's exactly one filtered option and it matches the search term
                if (filteredOptions.length === 1) {
                    const match = filteredOptions[0];
                    const matchLabel = typeof match.label === 'string' ? match.label.toLowerCase() : '';
                    const normalizedSearch = trimmedSearch.toLowerCase();

                    // Check if it's an exact match
                    if (matchLabel === normalizedSearch ||
                        matchLabel.split(' - ').pop()?.toLowerCase() === normalizedSearch ||
                        matchLabel.replace(/^[a-z]{2}\s*-\s*/i, '') === normalizedSearch) {
                        // Small delay to ensure smooth UX
                        const timeoutId = setTimeout(() => {
                            onChange(match.value);
                            setSearchTerm('');
                            setIsOpen(false);
                        }, 500);

                        return () => clearTimeout(timeoutId);
                    }
                }
            }
        }
    }, [searchTerm, searchable, value, onChange, isOpen, filteredOptions]);

    // Auto-focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            // Small delay to ensure the input is rendered
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 50);
        }
    }, [isOpen, searchable]);

    const handleOptionChange = (optionValue: DropdownOption['value'], checked: boolean) => {
        if (!onChange) return;

        setIsOpen(false);
        setSearchTerm(''); // Clear search term after selection

        onChange(checked ? optionValue : '');
    };

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
                    <label className={`label ${required && label ? 'required' : ''} ${labelClassName}`} htmlFor={id}>
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

            <div className={`${getDropdownClasses()} ${isOpen ? 'dropdown-open' : ''} relative z-10`} ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                    type="button"
                    className={`validator input w-full cursor-pointer has-[:focus]:bg-base-100 text-left ${error ? 'input-error' : ''
                        } ${disabled ? 'input-disabled' : ''} ${btnClassName}`}
                    onClick={() => {
                        if (!disabled) {
                            setIsOpen(!isOpen);
                            // Focus search input when opening if searchable
                            if (searchable && !isOpen && searchInputRef.current) {
                                setTimeout(() => {
                                    searchInputRef.current?.focus();
                                }, 50);
                            }
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isOpen) {
                            e.preventDefault();
                            const form = e.currentTarget.closest('form');
                            if (form) {
                                form.requestSubmit();
                            }
                        }
                        // Clear selected value when Delete or Backspace is pressed
                        if ((e.key === 'Delete' || e.key === 'Backspace') && value && !searchable) {
                            e.preventDefault();
                            if (onChange) {
                                onChange('');
                            }
                        }
                    }}
                    onBlur={() =>
                        !disabled &&
                        setTimeout(() => {
                            setIsOpen(false);
                        }, 100)
                    }
                    onFocusCapture={() =>
                        !disabled &&
                        setTimeout(() => {
                            setIsOpen(true);
                        }, 100)
                    }
                    tabIndex={searchable ? -1 : 0}
                    disabled={disabled}
                >
                    <div className="flex items-center gap-x-3 gap-y-1 min-w-0 justify-start text-left">
                        <input
                            type="text"
                            className="absolute -z-10 opacity-0"
                            tabIndex={-1}
                            id={id}
                            name={name}
                            value={value}
                            readOnly
                            required={required}
                        />
                        {value && (() => {
                            const selectedOption = options.find((opt) => opt.value == value);
                            const labelText = typeof selectedOption?.label === 'string' ? selectedOption.label : String(selectedOption?.label || '');
                            return (
                                <div className="text-sm text-base-content min-w-0 flex-1 text-left" title={labelText}>
                                    {selectedOption?.label}
                                </div>
                            );
                        })()}
                        {!searchable && !value && (
                            <div className={`text-sm text-onlan-blue text-left ${placeholderClass}`}>{placeholder ?? 'Select'}</div>
                        )}

                        {searchable && (
                            <input
                                ref={searchInputRef}
                                type="search"
                                className="grow bg-transparent border-none outline-none min-w-0 flex-1 text-left"
                                placeholder={value ? '' : placeholder}
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    if (!isOpen) {
                                        setIsOpen(true);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        // If there's a search term, try to auto-select exact match or first filtered option
                                        if (searchTerm && !value) {
                                            const exactMatch = findExactMatch(searchTerm);
                                            if (exactMatch && onChange) {
                                                onChange(exactMatch.value);
                                                setSearchTerm('');
                                                setIsOpen(false);
                                                return;
                                            }
                                            // If no exact match but there's only one filtered option, select it
                                            if (filteredOptions.length === 1 && onChange) {
                                                onChange(filteredOptions[0].value);
                                                setSearchTerm('');
                                                setIsOpen(false);
                                                return;
                                            }
                                        }
                                        // If value is already selected, submit form
                                        if (value || !searchTerm) {
                                            const form = e.currentTarget.closest('form');
                                            if (form) {
                                                form.requestSubmit();
                                            }
                                        }
                                    }
                                    if (e.key === 'Tab' && searchTerm && !value && onChange) {
                                        // Auto-select on Tab key as well
                                        const exactMatch = findExactMatch(searchTerm);
                                        if (exactMatch) {
                                            e.preventDefault();
                                            onChange(exactMatch.value);
                                            setSearchTerm('');
                                            setIsOpen(false);
                                        } else if (filteredOptions.length === 1) {
                                            e.preventDefault();
                                            onChange(filteredOptions[0].value);
                                            setSearchTerm('');
                                            setIsOpen(false);
                                        }
                                    }
                                    if (e.key === 'Escape') {
                                        setSearchTerm('');
                                        setIsOpen(false);
                                    }
                                    // Clear selected value when Delete or Backspace is pressed and search is empty
                                    if ((e.key === 'Delete' || e.key === 'Backspace') && !searchTerm && value) {
                                        e.preventDefault();
                                        if (onChange) {
                                            onChange('');
                                        }
                                        setSearchTerm('');
                                    }
                                }}
                                onBlur={() => {
                                    // Auto-select exact match when losing focus
                                    // Use setTimeout to allow click events to process first
                                    setTimeout(() => {
                                        if (searchTerm && !value && onChange) {
                                            const exactMatch = findExactMatch(searchTerm);
                                            if (exactMatch) {
                                                onChange(exactMatch.value);
                                                setSearchTerm('');
                                                setIsOpen(false);
                                            }
                                        }
                                    }, 200);
                                }}
                                onFocus={() => !isOpen && setIsOpen(true)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isOpen) {
                                        setIsOpen(true);
                                    }
                                }}
                                disabled={disabled}
                                tabIndex={0}
                            />
                        )}
                    </div>
                    <span className="dropdown-arrow">
                        <Icon src={ChevronIcon} className={`size-4 transition-transform`} />
                    </span>
                </button>

                {isOpen && !loading && (
                    <ul
                        className={`menu w-full dropdown-content flex-nowrap overflow-y-auto bg-base-100 p-2 z-20 shadow-lg border border-onlan-lavender ${getDropdownContentPositionClasses()}`}
                        style={{ maxHeight: maxHeight || '300px' }}
                    >
                        {filteredOptions.length === 0 ? (
                            <li>
                                <div className="p-3 text-sm text-base-content/60">No options found</div>
                            </li>
                        ) : (
                            filteredOptions.map((option, index) => (
                                <li key={`${id}-${index}`}>
                                    <label
                                        htmlFor={`${name}-${index}`}
                                        className={`dropdown-item cursor-pointer p-3 ${option.disabled ? 'cursor-not-allowed opacity-50' : ''} ${option.value == value ? '!bg-onlan-white !text-primary' : ''} `}
                                    >
                                        <span className="text-sm">{option.label && option.label}</span>
                                        <input
                                            id={`${name}-${index}`}
                                            type="checkbox"
                                            name={name}
                                            value={option.value}
                                            className="checkbox ms-auto hidden checkbox-xs"
                                            checked={value == option.value}
                                            onChange={(e) => handleOptionChange(option.value, e.target.checked)}
                                            disabled={option.disabled || disabled}
                                            tabIndex={-1}
                                        />
                                    </label>
                                </li>
                            ))
                        )}
                    </ul>
                )}

                {loading && (
                    <div
                        className={`menu w-full dropdown-content flex-nowrap overflow-y-auto bg-base-100 p-2 ${getDropdownContentPositionClasses()}`}
                    >
                        <div className="p-3 text-sm text-base-content/60">Loading...</div>
                    </div>
                )}
            </div>

            {children && children}

            {error && <div className="validator-hint visible text-error">{error}</div>}

            {hint && !error && <div className="validator-hint hidden">{hint}</div>}
        </div>
    );
}
