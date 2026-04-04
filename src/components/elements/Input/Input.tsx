import type { InputSize, InputType } from '@elements/Input/index.ts';
import Tooltip from '@elements/Tooltip/Tooltip.tsx';
import type { IIncludeTooltip } from '@elements/Tooltip';
import type { ChangeEvent, CSSProperties, FocusEvent, KeyboardEvent, ReactNode } from 'react';

interface IInputProps extends IIncludeTooltip {
    id: string;
    children?: ReactNode;
    name?: string;
    label?: string | ReactNode;
    type?: InputType;
    size?: InputSize;
    placeholder?: string;
    value?: string | number;
    min?: number;
    max?: number | string;
    minLength?: number;
    maxLength?: number;
    step?: string | number;
    error?: string;
    hint?: string;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    inputWrapClassName?: string;
    inputWrapStyle?: CSSProperties;
    inputClassName?: string;
    labelClassName?: string;
    prefix?: string;
    suffix?: string;
    prefixClassName?: string;
    crystalBorder?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({
    id,
    children,
    name = id,
    label = '',
    type = 'text',
    size = 'md',
    placeholder,
    value,
    min,
    max,
    minLength,
    maxLength,
    step,
    error,
    hint,
    pattern,
    required = false,
    disabled = false,
    readOnly = false,
    className = '',
    inputWrapClassName = '',
    inputWrapStyle,
    inputClassName = '',
    labelClassName = '',
    prefix,
    suffix,
    tooltip,
    tooltipVariant = 'secondary',
    tooltipPosition = 'top',
    tooltipAfter,
    prefixClassName = '',
    crystalBorder = false,
    onChange,
    onBlur,
    onKeyDown,
}: IInputProps) => {
    const getSizeClass = () => {
        const sizes = {
            xs: 'input-xs',
            sm: 'input-sm',
            md: 'input-md',
            lg: 'input-lg',
            xl: 'input-xl',
        };
        return sizes[size] || sizes.md;
    };

    return (
        <div className={className}>
            {label && (
                <div className="flex items-center self-start">
                    <label className={`label ${required ? 'required' : ''} ${labelClassName}`} htmlFor={id}>
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
            )}

            <div>
                <div className={crystalBorder ? 'relative' : ''} style={crystalBorder ? { borderRadius: 8 } : {}}>
                    {crystalBorder && (
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                padding: 1,
                                borderRadius: 8,
                                background:
                                    'linear-gradient(151.57deg, rgba(255, 255, 255, 0.53) 14.18%, rgba(255, 255, 255, 0.11) 82.44%)',
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                maskComposite: 'exclude',
                                pointerEvents: 'none',
                            }}
                        />
                    )}
                    <div
                        className={`validator input ${inputWrapClassName} ${getSizeClass()} ${error ? 'input-error!' : ''}`}
                        style={inputWrapStyle}
                >
                    {prefix && <span className={`${prefixClassName ?? ''}`}>{prefix}</span>}
                    <input
                        id={id}
                        type={type}
                        name={name}
                        className={`${inputClassName}`}
                        placeholder={placeholder}
                        value={value}
                        min={min}
                        max={max}
                        step={step}
                        minLength={minLength}
                        maxLength={maxLength}
                        pattern={pattern}
                        required={required}
                        disabled={disabled}
                        readOnly={readOnly}
                        onChange={onChange}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                    />
                    {suffix && <span>{suffix}</span>}
                    </div>
                </div>

                {children && children}
                {error && <p className="validator-hint visible text-error">{error}</p>}

                {hint && !error && <p className="validator-hint hidden">{hint}</p>}
            </div>
        </div>
    );
};
