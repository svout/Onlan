import type { CardOption } from "@elements/CardPicker/index.ts";
import Icon from "@elements/Icon/Icon.tsx";
import CheckIcon from "@icons/check.svg";

export interface ICardPickerProps {
    name: string;
    label?: string;
    options: CardOption[];
    value?: CardOption["value"];
    onChange?: (value: CardOption["value"]) => void;
    multiple?: boolean;
    selectedValues?: string[];
    onMultiChange?: (values: CardOption["value"][]) => void;
    columns?: 1 | 2 | 3 | 4;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
}

export default function CardPicker({
    name,
    label,
    options,
    value,
    onChange,
    multiple = false,
    selectedValues = [],
    onMultiChange,
    columns = 2,
    size = 'lg',
    disabled = false,
    className = ''
}: ICardPickerProps) {

    const getCardClasses = (option: CardOption, isSelected: boolean): string => {
        const baseClasses = 'relative cursor-pointer transition-all duration-200 rounded-xl border border-primary';

        const sizeClasses = {
            sm: 'p-3',
            md: 'p-4',
            lg: 'p-4 md:p-6'
        };

        let stateClasses = '';
        if (option.disabled || disabled) {
            stateClasses = 'opacity-50 cursor-not-allowed border-onlan-lavender bg-onlan-white';
        } else if (isSelected) {
            stateClasses = 'border-onlan-black bg-onlan-white';
        } else {
            stateClasses = 'border-onlan-black bg-onlan-white hover:bg-onlan-white';
        }

        return `${baseClasses} ${sizeClasses[size]} ${stateClasses}`;
    };

    const getGridClasses = (): string => {
        const columnClasses = {
            1: 'grid-cols-1',
            2: 'grid-cols-1 md:grid-cols-2',
            3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        };
        return `grid gap-4 ${columnClasses[columns]}`;
    };

    const handleCardClick = (optionValue: string) => {
        if (disabled) return;

        const option = options.find(opt => opt.value === optionValue);
        if (option?.disabled) return;

        if (multiple) {
            const newValues = selectedValues.includes(optionValue)
                ? selectedValues.filter(v => v !== optionValue)
                : [...selectedValues, optionValue];
            onMultiChange?.(newValues);
        } else {
            onChange?.(optionValue);
        }
    };

    const isSelected = (optionValue: string): boolean => {
        return multiple ? selectedValues.includes(optionValue) : value === optionValue;
    };

    return (
        <div className={`card-picker ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-onlan-blue mb-3">
                    {label}
                </label>
            )}

            <div className={getGridClasses()}>
                {options.map((option, index) => {
                    const selected = isSelected(option.value);

                    return (
                        <div
                            key={index}
                            className={getCardClasses(option, selected)}
                            onClick={() => handleCardClick(option.value)}
                        >
                            <div className="flex justify-between items-center h-10">
                                {option.icon && (
                                    <div className={`flex-shrink-0 ${size === 'sm' ? 'mt-0.5' : 'mt-1'}`}>
                                        <div className={`text-onlan-black`}>
                                            <Icon src={option.icon} className="size-10" width={40} height={40} />
                                        </div>
                                    </div>
                                )}

                                {selected && (
                                    <div
                                        className="bg-blue-500 rounded-full flex items-center justify-center">
                                        <Icon src={CheckIcon} className="size-6 rounded-full bg-onlan-blue text-onlan-white" />
                                    </div>
                                )}
                                {!selected && (
                                    <div
                                        className="size-6 rounded-full flex items-center justify-center">
                                        <span
                                            className="size-6 rounded-full border border-onlan-lavender bg-transparent"></span>
                                    </div>
                                )}

                            </div>

                            <div className="flex items-start space-x-3 mt-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-medium text-onlan-black text-xl md:text-2xl`}>
                                        {option.title}
                                    </h3>
                                    <p className={`text-onlan-blue mt-2 text-sm md:text-base`}>
                                        {option.description}
                                    </p>
                                </div>
                            </div>

                            <input
                                type={multiple ? 'checkbox' : 'radio'}
                                name={multiple ? `${name}[]` : name}
                                value={option.value}
                                checked={selected}
                                onChange={() => {
                                }}
                                className="sr-only"
                                disabled={option.disabled || disabled}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
