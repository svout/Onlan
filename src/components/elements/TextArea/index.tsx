import Tooltip from "@elements/Tooltip/Tooltip";
import type { IIncludeTooltip } from "@elements/Tooltip";
import type { ChangeEvent, CSSProperties, FocusEvent } from "react";

export type TextareaSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ITextareaProps extends IIncludeTooltip {
  id: string;
  name?: string;
  label?: string;
  size?: TextareaSize;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  rows?: number;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  textareaWrapClassName?: string;
  textareaWrapStyle?: CSSProperties;
  textareaClassName?: string;
  labelClassName?: string;
  prefix?: string;
  suffix?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
  autoHeight?: boolean;
  crystalBorder?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = ({
  id,
  name = id,
  label = "",
  size = "md",
  placeholder,
  value,
  maxLength,
  rows = 4,
  error,
  hint,
  required = false,
  disabled = false,
  readOnly = false,
  className = "",
  textareaWrapClassName = "",
  textareaWrapStyle,
  textareaClassName = "",
  labelClassName = "",
  prefix,
  suffix,
  tooltip,
  tooltipVariant = "secondary",
  tooltipPosition = "top",
  tooltipAfter,
  resize = "vertical",
  autoHeight = false,
  crystalBorder = false,
  onChange,
  onBlur,
}: ITextareaProps) => {
  const getSizeClass = () => {
    const sizes = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl",
    };
    return sizes[size] || sizes.md;
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (autoHeight) {
      const el = e.currentTarget;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
    onChange?.(e);
  };

  return (
    <div className={className}>
      {label && (
        <div className="flex items-center self-start">
          <label className={`label ${required ? "required" : ""} ${labelClassName}`} htmlFor={id}>
            {label}
          </label>
          {tooltip && (
            <Tooltip
              className="align-middle ms-2 mb-2"
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
          className={`textarea w-full validator outline-none focus:outline-none bg-onlan-white  ${textareaWrapClassName} ${getSizeClass()} ${
            error ? "input-error" : ""
          } ${disabled ? "is-disabled" : ""}`}
            style={textareaWrapStyle}
          data-has-prefix={!!prefix}
          data-has-suffix={!!suffix}
        >
          {prefix && <span className="affix prefix">{prefix}</span>}

          <textarea
            id={id}
            name={name}
            className={`w-full ${textareaClassName}`}
            placeholder={placeholder}
            value={value}
            maxLength={maxLength}
            rows={rows}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleChange}
            onBlur={onBlur}
            style={{ resize }}
          />

          {suffix && <span className="affix suffix">{suffix}</span>}
          </div>
        </div>

        {error && <p className="validator-hint text-error">{error}</p>}
        {hint && !error && <p className="validator-hint hidden">{hint}</p>}
      </div>
    </div>
  );
};
