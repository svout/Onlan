import Tooltip from '@elements/Tooltip/Tooltip.tsx';
import type { IIncludeTooltip } from '@elements/Tooltip';
import type { ChangeEvent, FocusEvent } from 'react';

interface IInputProps extends IIncludeTooltip {
    id: string;
    name?: string;
    label: string;
    placeholder?: string;
    value?: string | number;
    min?: number | string;
    max?: number | string;
    maxLength?: number;
    step?: string | number;
    error?: string;
    hint?: string;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    wrapClassName?: string;
    inputClassName?: string;
    prefix?: string;
    suffix?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export default function DateInput({
    id,
    name = id,
    label,
    placeholder,
    value,
    min,
    max,
    maxLength,
    step,
    error,
    hint,
    pattern,
    required = false,
    disabled = false,
    readOnly = false,
    className = '',
    wrapClassName = '',
    inputClassName = '',
    prefix,
    suffix,
    tooltip,
    tooltipVariant = 'secondary',
    tooltipPosition = 'top',
    tooltipAfter,
    onChange,
    onBlur,
}: IInputProps) {
    return (
        <div className={className}>
            <div className="flex items-center">
                <label className={`label ${required ? 'required' : ''}`} htmlFor={id}>
                    {label}
                </label>
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

            <div className={`validator input ${wrapClassName} ${error ? 'input-error' : ''}`}>
                {prefix && <span>{prefix}</span>}
                <input
                    id={id}
                    type="date"
                    name={name}
                    className={`${value ? 'has-value' : ''} ${inputClassName}`}
                    placeholder={placeholder}
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    maxLength={maxLength}
                    pattern={pattern}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {suffix && <span>{suffix}</span>}
            </div>

            {error && <p className="validator-hint visible text-error">{error}</p>}

            {hint && !error && <p className="validator-hint hidden">{hint}</p>}
        </div>
    );
}
