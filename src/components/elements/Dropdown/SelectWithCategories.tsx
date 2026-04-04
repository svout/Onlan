import { useState, useRef, useEffect, type ReactNode } from 'react';
import type { DropdownOption } from '@elements/Dropdown/index.ts';
import ChevronIcon from '@icons/chevron.svg';
import Icon from '@elements/Icon/Icon.tsx';
import Tooltip from '@elements/Tooltip/Tooltip.tsx';
import type { IIncludeTooltip } from '@elements/Tooltip';

interface SelectProps extends IIncludeTooltip {
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
}

export default function SelectWithCategories({
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
    onChange,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentView, setCurrentView] = useState<'categories' | 'reasons'>('categories');
    const [selectedCategory, setSelectedCategory] = useState<DropdownOption | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getDropdownClasses = (): string => {
        const baseClass = 'dropdown';
        const positionClass = position == 'top' ? 'dropdown-top' : 'dropdown-bottom';
        const alignClass = `dropdown-${align}`;
        return `${baseClass} ${positionClass} ${alignClass} w-full`;
    };

    const filteredOptions = searchable
        ? options.filter(
            (option) =>
                (typeof option.label === 'string' &&
                    option.label?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                option.value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
        : options;

    // Check if any option has reasons (hierarchical structure)
    const hasHierarchicalStructure = options.some((option) => option.reasons && option.reasons.length > 0);

    // Find selected reason label from all categories
    const getSelectedLabel = (): string | ReactNode => {
        if (!value) return '';
        for (const option of options) {
            if (option.reasons) {
                const foundReason = option.reasons.find((reason) => reason.value == value);
                if (foundReason) return foundReason.label;
            }
            if (option.value == value) return option.label;
        }
        return '';
    };

    const handleCategoryClick = (category: DropdownOption, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (category.reasons && category.reasons.length > 0) {
            setSelectedCategory(category);
            setCurrentView('reasons');
            // Keep dropdown open
            setIsOpen(true);
        } else {
            // If category has no reasons, treat it as a direct selection
            handleOptionChange(category.value, true);
        }
    };

    const handleReasonClick = (reason: DropdownOption, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        handleOptionChange(reason.value, true);
    };

    const goBackToCategories = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setCurrentView('categories');
        setSelectedCategory(null);
        // Keep dropdown open
        setIsOpen(true);
    };

    const handleOptionChange = (optionValue: DropdownOption['value'], checked: boolean) => {
        if (!onChange) return;

        setIsOpen(false);
        setCurrentView('categories');
        setSelectedCategory(null);

        if (searchTerm) {
            setSearchTerm('');
        }

        onChange(checked ? optionValue : '');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setCurrentView('categories');
                setSelectedCategory(null);
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

            <div className={`${getDropdownClasses()} ${isOpen ? 'dropdown-open' : ''}`} ref={dropdownRef}>
                <button
                    type="button"
                    className={`validator input w-full cursor-pointer has-[:focus]:bg-base-100 ${error ? 'input-error' : ''
                        } ${disabled ? 'input-disabled' : ''} ${btnClassName}`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onBlur={(e) => {
                        // Don't close if clicking inside the dropdown content
                        if (
                            !disabled &&
                            dropdownRef.current &&
                            !dropdownRef.current.contains(e.relatedTarget as Node)
                        ) {
                            setTimeout(() => {
                                setIsOpen(false);
                                setCurrentView('categories');
                                setSelectedCategory(null);
                            }, 100);
                        }
                    }}
                    onFocusCapture={() =>
                        !disabled &&
                        setTimeout(() => {
                            setIsOpen(true);
                        }, 100)
                    }
                    tabIndex={searchable ? -1 : 0}
                    disabled={disabled}
                >
                    <div className="flex items-center gap-x-3 gap-y-1">
                        <input
                            type="text"
                            className="absolute -z-10 opacity-0"
                            tabIndex={-1}
                            id={id}
                            name={name}
                            value={value}
                            required={required}
                        />
                        {value && <div className="text-sm text-base-content">{getSelectedLabel()}</div>}
                        {!searchable && !value && (
                            <div className={`text-sm text-onlan-blue ${placeholderClass}`}>{placeholder ?? 'Select'}</div>
                        )}

                        {searchable && (
                            <input
                                type="search"
                                className="grow"
                                placeholder={value ? '' : placeholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => isOpen && setIsOpen(true)}
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
                    <div className="menu max-h-96 w-full dropdown-content flex-nowrap overflow-y-auto border border-onlan-lavender bg-base-100 p-0">
                        {hasHierarchicalStructure && currentView === 'categories' && (
                            <>
                                <div className="flex w-full items-center justify-start border-b border-onlan-lavender bg-onlan-lavender px-4 py-2 text-xs font-normal">
                                    <span>Choose Category</span>
                                </div>
                                <ul className="m-0 w-full list-none p-0">
                                    {filteredOptions.length === 0 ? (
                                        <li className="m-0 w-full border-b border-onlan-lavender">
                                            <div className="w-full px-4 py-3 text-sm text-base-content/60">
                                                No options found
                                            </div>
                                        </li>
                                    ) : (
                                        filteredOptions.map((option, index) => (
                                            <li
                                                key={`${id}-${index}`}
                                                className="m-0 w-full border-b border-onlan-lavender last:border-b-0"
                                            >
                                                <button
                                                    type="button"
                                                    className={`flex w-full items-center justify-between px-4 py-3 text-left ${option.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-onlan-white'}`}
                                                    onClick={(e) => !option.disabled && handleCategoryClick(option, e)}
                                                    disabled={option.disabled || disabled}
                                                >
                                                    <span className="text-sm">{option.label && option.label}</span>
                                                    {option.reasons && option.reasons.length > 0 && (
                                                        <Icon src={ChevronIcon} className="size-4 rotate-270" />
                                                    )}
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </>
                        )}

                        {hasHierarchicalStructure && currentView === 'reasons' && selectedCategory && (
                            <>
                                <div className="flex w-full items-center justify-between border-b border-onlan-lavender bg-onlan-lavender px-4 py-2 text-xs font-normal">
                                    <button
                                        type="button"
                                        className="flex items-center gap-1 hover:text-base-content"
                                        onClick={(e) => goBackToCategories(e)}
                                    >
                                        <Icon src={ChevronIcon} className="size-4 rotate-90" />
                                        <span>Choose Reason</span>
                                    </button>
                                    <span className="truncate text-right text-base-content/60">
                                        {String(selectedCategory.label)}
                                    </span>
                                </div>
                                <ul className="m-0 w-full list-none p-0">
                                    {selectedCategory.reasons && selectedCategory.reasons.length === 0 ? (
                                        <li className="m-0 w-full border-b border-onlan-lavender">
                                            <div className="w-full px-4 py-3 text-sm text-base-content/60">
                                                No reasons found
                                            </div>
                                        </li>
                                    ) : (
                                        selectedCategory.reasons?.map((reason, index) => (
                                            <li
                                                key={`${id}-reason-${index}`}
                                                className="m-0 w-full border-b border-onlan-lavender last:border-b-0"
                                            >
                                                <button
                                                    type="button"
                                                    className={`flex w-full items-center justify-between px-4 py-3 text-left ${reason.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-onlan-white'} ${reason.value == value ? '!bg-onlan-white !text-primary' : ''}`}
                                                    onClick={(e) => !reason.disabled && handleReasonClick(reason, e)}
                                                    disabled={reason.disabled || disabled}
                                                >
                                                    <span className="text-sm">{reason.label && reason.label}</span>
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </>
                        )}

                        {!hasHierarchicalStructure && (
                            <ul className="m-0 w-full list-none p-0">
                                {filteredOptions.length === 0 ? (
                                    <li className="m-0 w-full border-b border-onlan-lavender">
                                        <div className="w-full px-4 py-3 text-sm text-base-content/60">
                                            No options found
                                        </div>
                                    </li>
                                ) : (
                                    filteredOptions.map((option, index) => (
                                        <li
                                            key={`${id}-${index}`}
                                            className="m-0 w-full border-b border-onlan-lavender last:border-b-0"
                                        >
                                            <label
                                                htmlFor={`${name}-${index}`}
                                                className={`flex w-full cursor-pointer items-center justify-between px-4 py-3 hover:bg-onlan-white ${option.disabled ? 'cursor-not-allowed opacity-50' : ''} ${option.value == value ? '!bg-onlan-white !text-primary' : ''}`}
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
                    </div>
                )}

                {loading && (
                    <div className="menu w-full dropdown-content flex-nowrap overflow-y-auto bg-base-100 p-2">
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
