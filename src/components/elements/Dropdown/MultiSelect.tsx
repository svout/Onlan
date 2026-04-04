import { useEffect, useMemo, useRef, useState } from 'react';
import type { DropdownOption } from '@elements/Dropdown';
import ChevronIcon from '@icons/chevron.svg';
import MultiselectCloseIcon from '@icons/multiselect-close.svg';
import Icon from '@elements/Icon/Icon';
import Tooltip from '@elements/Tooltip/Tooltip';
import type { IIncludeTooltip } from '@elements/Tooltip';
import SearchInput from '../Input/SearchInput';

type ValueType = DropdownOption['value'];

interface BaseProps extends IIncludeTooltip {
    id: string;
    name?: string;
    label?: string;
    options: DropdownOption[];
    placeholder?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    position?: 'bottom' | 'top';
    align?: 'left' | 'center' | 'right';
    clearable?: boolean;
    searchable?: boolean;
    /** показывать ли иконку закрытия на выбранных элементах (только для multiple) */
    removable?: boolean;
    /** чекбокс Select All в заголовке списка */
    enableSelectAll?: boolean;
    selectAllLabel?: string;
    /** на что влияет Select All: на все опции или только отфильтрованные */
    selectAllAffects?: 'all' | 'filtered';
}

type SingleProps = {
    multiple?: false;
    value?: ValueType;
    defaultValue?: never;
    onChange?: (value: ValueType | '') => void;
};

type MultiProps = {
    multiple: true;
    value?: ValueType[];
    defaultValue?: ValueType[];
    onChange?: (value: ValueType[]) => void;
};

type SelectProps = BaseProps & (SingleProps | MultiProps);

export function MultiSelect({
    id,
    name = id,
    label = '',
    options,
    placeholder = 'Select...',
    tooltip,
    tooltipVariant = 'secondary',
    tooltipPosition = 'top',
    tooltipAfter,
    error,
    hint,
    required = false,
    disabled = false,
    className = '',
    position = 'bottom',
    align = 'center',
    clearable = false,
    searchable = true,
    removable = false,
    enableSelectAll = false,
    selectAllLabel = 'Send to All',
    selectAllAffects = 'all',
    multiple,
    value,
    defaultValue,
    onChange,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const isControlled = value !== undefined;
    const initialSelected = useMemo(() => {
        if (multiple) {
            const arr =
                (isControlled ? (value as ValueType[] | undefined) : (defaultValue as ValueType[] | undefined)) ?? [];
            return new Set(arr);
        } else {
            const v = (isControlled ? (value as ValueType | undefined) : undefined) ?? '';
            return new Set(v ? [v] : []);
        }
    }, [multiple, value, defaultValue, isControlled]);

    const [selected, setSelected] = useState<Set<ValueType>>(initialSelected);
    useEffect(() => {
        if (!isControlled) return;
        if (multiple) setSelected(new Set((value as ValueType[]) ?? []));
        else setSelected(new Set((value as ValueType | '') ? [value as ValueType] : []));
    }, [isControlled, multiple, value]);

    const selectedArray = useMemo(() => Array.from(selected), [selected]);
    const selectedOptions = useMemo(() => options.filter((o) => selected.has(o.value)), [options, selected]);

    const norm = searchTerm.trim().toLowerCase();
    const filtered = useMemo(() => {
        if (!searchable || !norm) return options;
        return options.filter(
            (o) =>
                (typeof o.label === 'string' && o.label.toLowerCase().includes(norm)) ||
                String(o.value).toLowerCase().includes(norm)
        );
    }, [options, norm, searchable]);

    const emit = (nextSet: Set<ValueType>) => {
        if (!onChange) return;
        if (multiple) onChange(Array.from(nextSet));
        else onChange(nextSet.size ? Array.from(nextSet)[0] : '');
    };

    const toggle = (opt: DropdownOption) => {
        if (opt.disabled || disabled) return;
        if (multiple) {
            const next = new Set(selected);
            if (next.has(opt.value)) {
                next.delete(opt.value);
            } else {
                next.add(opt.value);
            }
            if (!isControlled) setSelected(next);
            emit(next);
        } else {
            const next = new Set<ValueType>([opt.value]);
            if (!isControlled) setSelected(next);
            emit(next);
            setIsOpen(false);
            setSearchTerm('');
        }
    };

    const clearAll = () => {
        const next = new Set<ValueType>();
        if (!isControlled) setSelected(next);
        emit(next);
        setSearchTerm('');
    };

    // Select All
    const targetPool = selectAllAffects === 'filtered' ? filtered : options;
    const allSelectable = targetPool.filter((o) => !o.disabled);
    const allSelected = allSelectable.length > 0 && allSelectable.every((o) => selected.has(o.value));

    const onToggleAll = (checked: boolean) => {
        const next = new Set(selected);
        if (checked) {
            for (const o of allSelectable) next.add(o.value);
        } else {
            for (const o of allSelectable) next.delete(o.value);
        }
        if (!isControlled) setSelected(next);
        emit(next);
    };

    // Вне клика — закрыть
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!wrapperRef.current) return;
            if (wrapperRef.current.contains(e.target as Node)) return;
            setIsOpen(false);
            setActiveIndex(-1);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    // Клавиатура
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;
        switch (e.key) {
            case 'ArrowDown':
            case 'ArrowUp': {
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setActiveIndex(filtered.findIndex((o) => !o.disabled));
                    return;
                }
                const dir = e.key === 'ArrowDown' ? 1 : -1;
                let idx = activeIndex;
                do {
                    idx = Math.min(Math.max(idx + dir, 0), filtered.length - 1);
                } while (filtered[idx]?.disabled && idx > -1 && idx < filtered.length);
                setActiveIndex(idx);
                break;
            }
            case 'Enter': {
                if (!isOpen) {
                    e.preventDefault();
                    setIsOpen(true);
                    setActiveIndex(filtered.findIndex((o) => !o.disabled));
                    return;
                }
                e.preventDefault();
                const opt = filtered[activeIndex];
                if (opt) toggle(opt);
                if (!multiple) setIsOpen(false);
                break;
            }
            case 'Escape':
                setIsOpen(false);
                setActiveIndex(-1);
                break;
        }
    };

    // Автоскролл к активному пункту
    useEffect(() => {
        if (!isOpen || activeIndex < 0) return;
        const list = listRef.current;
        const el = list?.querySelector<HTMLLIElement>(`[data-idx="${activeIndex}"]`);
        if (list && el) {
            const t = el.offsetTop;
            const b = t + el.offsetHeight;
            if (t < list.scrollTop) list.scrollTop = t;
            else if (b > list.scrollTop + list.clientHeight) list.scrollTop = b - list.clientHeight;
        }
    }, [isOpen, activeIndex]);

    const listboxId = `${id}-listbox`;
    const getDropdownClasses = () => {
        const base = 'dropdown';
        const pos = position === 'top' ? 'dropdown-top' : 'dropdown-bottom';
        const al = `dropdown-${align}`;
        return `${base} ${pos} ${al} w-full`;
    };

    return (
        <div className={`field ${className}`} ref={wrapperRef}>
            <div className="flex items-center">
                {label && (
                    <label className={`label ${required && label ? 'required' : ''}`} htmlFor={id}>
                        &nbsp;{label}
                    </label>
                )}
                {tooltip && (
                    <Tooltip
                        className="ms-2 mb-2 align-middle"
                        variant={tooltipVariant}
                        position={tooltipPosition}
                        after={tooltipAfter}
                    >
                        {tooltip}
                    </Tooltip>
                )}
            </div>

            <div className={`${getDropdownClasses()} ${isOpen ? 'dropdown-open' : ''}`}>
                <button
                    id={id}
                    type="button"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-controls={listboxId}
                    className={`validator input flex w-full cursor-pointer flex-wrap items-center gap-2 bg-onlan-white has-[:focus]:bg-base-100 ${error ? 'input-error' : ''
                        } ${disabled ? 'input-disabled' : ''}`}
                    onClick={() => setIsOpen((o) => !o)}
                    onKeyDown={onKeyDown}
                    disabled={disabled}
                >
                    {/* скрытое значение для форм */}
                    {multiple ? (
                        <input
                            type="text"
                            className="absolute -z-10 opacity-0"
                            name={name}
                            value={selectedArray.join(',')}
                            readOnly
                            required={required && selectedArray.length === 0}
                            tabIndex={-1}
                        />
                    ) : (
                        <input
                            type="text"
                            className="absolute -z-10 opacity-0"
                            name={name}
                            value={selectedArray[0] ?? ''}
                            readOnly
                            required={required && selectedArray.length === 0}
                            tabIndex={-1}
                        />
                    )}

                    {multiple ? (
                        <>
                            {selectedOptions.length ? (
                                <div className="flex flex-wrap items-center gap-2">
                                    {selectedOptions.map((opt) => (
                                        <span
                                            key={`chip-${String(opt.value)}`}
                                            className="badge flex items-center justify-center gap-1.5 rounded-lg border badge-outline border-onlan-lavender bg-onlan-white px-2 py-1"
                                        >
                                            <span className="text-sm leading-tight">{opt.label}</span>
                                            {removable && (
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-center hover:opacity-70 -mr-0.5"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const next = new Set(selected);
                                                        next.delete(opt.value);
                                                        if (!isControlled) setSelected(next);
                                                        emit(next);
                                                    }}
                                                    aria-label={`Remove ${opt.label}`}
                                                >
                                                    <Icon src={MultiselectCloseIcon} className="size-3 text-onlan-blue" />
                                                </button>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-sm text-secondary">{placeholder}</span>
                            )}
                        </>
                    ) : (
                        <>
                            {selectedOptions[0]?.label ? (
                                <div className="text-sm text-base-content">{selectedOptions[0].label}</div>
                            ) : (
                                <div className="text-sm text-secondary">{placeholder}</div>
                            )}
                        </>
                    )}

                    {clearable && selectedArray.length > 0 && !disabled && (
                        <button
                            type="button"
                            className="btn ms-auto btn-ghost btn-xs"
                            aria-label="Clear selection"
                            onClick={(e) => {
                                e.stopPropagation();
                                clearAll();
                            }}
                        >
                            ×
                        </button>
                    )}

                    <span className="dropdown-arrow ms-auto">
                        <Icon src={ChevronIcon} className={`size-4 transition-transform`} />
                    </span>
                </button>

                {isOpen && (
                    <div className="absolute top-[54px] z-2 w-full rounded-box border border-onlan-lavender bg-base-100 p-0 shadow-lg">
                        {/* header: search + select-all */}
                        {(searchable || (multiple && enableSelectAll)) && (
                            <div className="flex w-full items-center gap-3 px-3 pt-3">
                                <div className="relative flex w-full flex-col">
                                    {searchable && (
                                        <SearchInput
                                            id="search"
                                            placeholder="Search"
                                            className="w-full"
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setActiveIndex(-1);
                                            }}
                                        />
                                    )}

                                    {multiple && enableSelectAll && (
                                        <div className={`relative flex w-full justify-end ${searchable ? 'pt-4' : ''}`}>
                                            <label className="flex items-center gap-2 text-sm whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-sm"
                                                    checked={allSelected}
                                                    onChange={(e) => onToggleAll(e.target.checked)}
                                                />
                                                {selectAllLabel}
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* list */}
                        <ul
                            id={listboxId}
                            ref={listRef}
                            role="listbox"
                            aria-multiselectable={!!multiple}
                            className="menu mt-2 max-h-80 w-full overflow-y-auto p-0 pb-3"
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {filtered.length === 0 ? (
                                <li className="w-full px-3 py-3 text-sm text-base-content/60">No options found</li>
                            ) : (
                                filtered.map((o, i) => {
                                    const idx = i;
                                    const isSelected = selected.has(o.value);
                                    return (
                                        <li
                                            key={`${id}-${i}`}
                                            data-idx={idx}
                                            className={`flex w-full items-center ${isSelected ? 'bg-base-200/60' : 'bg-transparent'
                                                }`}
                                            onMouseEnter={() => setActiveIndex(idx)}
                                        >
                                            <button
                                                type="button"
                                                role="option"
                                                aria-selected={isSelected}
                                                disabled={o.disabled}
                                                className={`flex w-full cursor-pointer items-center gap-3 rounded-none px-3 py-2 text-left ${o.disabled ? 'cursor-not-allowed opacity-50' : ''
                                                    }`}
                                                onClick={() => toggle(o)}
                                            >
                                                <span className="grow text-sm">{o.label}</span>

                                                {/* чекбокс справа */}
                                                {multiple ? (
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox checkbox-sm"
                                                        readOnly
                                                        checked={isSelected}
                                                    />
                                                ) : (
                                                    isSelected && <span>✓</span>
                                                )}
                                            </button>
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {error && <div className="validator-hint text-error">{error}</div>}
            {!error && hint && <div className="validator-hint hidden">{hint}</div>}
        </div>
    );
}
