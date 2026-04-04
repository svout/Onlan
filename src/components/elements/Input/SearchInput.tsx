import type { ChangeEvent, FocusEvent } from 'react';
import Icon from '@elements/Icon/Icon.tsx';
import SearchIcon from '@icons/search.svg';

interface SearchInputProps {
    id: string;
    name?: string;
    label?: string;
    placeholder?: string;
    value?: string | number;
    defaultValue?: string | number;
    maxLength?: number;
    error?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    inputClassName?: string;
    suffix?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
    id,
    name = id,
    label = '',
    placeholder,
    value,
    defaultValue,
    maxLength,
    error,
    hint,
    required = false,
    disabled = false,
    readOnly = false,
    className = '',
    inputClassName = '',
    suffix,
    onChange,
    onBlur,
}: SearchInputProps) {
    return (
        <div className={`group-search ${className}`}>
            {label && (
                <div className="flex items-center">
                    <label className={`label ${required ? 'required' : ''}`} htmlFor={id}>
                        {label}
                    </label>
                </div>
            )}

            <div
                className={`validator input group-hover:border-onlan-lavender group-hover:bg-onlan-lavender ${error ? 'input-error' : ''}`}
            >
                <input
                    id={id}
                    type="search"
                    name={name}
                    className={`peer order-2 ${inputClassName}`}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    maxLength={maxLength}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <span className="order-1 text-onlan-blue peer-placeholder-shown:!text-onlan-blue peer-focus:!text-onlan-blue">
                    <Icon src={SearchIcon} className="size-4" />
                </span>
                {suffix && <span className="order-3">{suffix}</span>}
            </div>

            {error && <p className="validator-hint visible text-error">{error}</p>}

            {hint && !error && <p className="validator-hint hidden">{hint}</p>}
        </div>
    );
}
