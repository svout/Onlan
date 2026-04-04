import { useState, useEffect } from 'react';
import { Input } from '@/components/elements/Input/Input';

export interface RangeInputsProps {
    min?: number;
    max?: number;
    step?: number;
    onRangeChange?: (min: number, max: number) => void;
    prefix?: string;
    showLabels?: boolean;
    labelMin?: string;
    labelMax?: string;
    className?: string;
    placeholderMin?: string;
    placeholderMax?: string;
}

// Helper function to parse number from formatted string
const parseNumber = (value: string): number => {
    if (value === '') return 0;
    const cleaned = value.replace(/,/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
};

// Helper function to format number with commas
const formatNumber = (value: string | number): string => {
    if (value === '' || value === null || value === undefined) return '';
    const num = typeof value === 'string' ? parseNumber(value) : value;
    if (isNaN(num)) return '';
    // Return "0" for zero, not empty string
    if (num === 0) return '0';
    return num.toLocaleString('en-US');
};

export const RangeInputs = ({
    min = 0,
    max = 0,
    onRangeChange,
    prefix,
    showLabels = false,
    labelMin = 'min',
    labelMax = 'max',
    className = '',
    placeholderMin = 'min',
    placeholderMax = 'max',
}: RangeInputsProps) => {
    // Keep internal input state formatted with commas (e.g. 1000 -> "1,000")
    const [minValue, setMinValue] = useState<string>(min === 0 ? '' : formatNumber(min));
    const [maxValue, setMaxValue] = useState<string>(max === 0 ? '' : formatNumber(max));

    // Reset values when min prop changes
    useEffect(() => {
        setMinValue(min === 0 ? '' : formatNumber(min));
        setMaxValue(max === 0 ? '' : formatNumber(max));
    }, [min, max]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // Remove all non-digit characters except for decimal point
        const cleaned = inputValue.replace(/[^0-9.]/g, '');
        
        // If empty, set empty string
        if (cleaned === '') {
            setMinValue('');
            onRangeChange?.(0, parseNumber(maxValue));
            return;
        }
        
        // Parse the number first
        const num = parseNumber(cleaned);
        
        // Only format and update if we have a valid number
        if (!isNaN(num) && num >= 0) {
            const formatted = formatNumber(num);
            setMinValue(formatted);
            
            const numMaxValue = parseNumber(maxValue);
            onRangeChange?.(num, numMaxValue);
        }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // Remove all non-digit characters except for decimal point
        const cleaned = inputValue.replace(/[^0-9.]/g, '');
        
        // If empty, set empty string
        if (cleaned === '') {
            setMaxValue('');
            onRangeChange?.(parseNumber(minValue), 0);
            return;
        }
        
        // Parse the number first
        const num = parseNumber(cleaned);
        
        // Only format and update if we have a valid number
        if (!isNaN(num) && num >= 0) {
            const formatted = formatNumber(num);
            setMaxValue(formatted);
            
            const numMinValue = parseNumber(minValue);
            onRangeChange?.(numMinValue, num);
        }
    };

    return (
        <div className={`flex w-full items-center gap-2 ${className}`}>
            {showLabels && (
                <span className="hidden lg:block text-base font-medium text-onlan-blue whitespace-nowrap shrink-0">{labelMin}</span>
            )}
            <Input
                id="range-min"
                type="text"
                placeholder={placeholderMin}
                prefix={prefix}
                value={minValue}
                onChange={handleMinChange}
                className="flex-1 min-w-0"
                inputClassName="w-full"
            />
            <span className="text-sm text-onlan-blue shrink-0">-</span>
            {showLabels && (
                <span className="hidden lg:block text-base font-medium text-onlan-blue whitespace-nowrap shrink-0">{labelMax}</span>
            )}
            <Input
                id="range-max"
                type="text"
                placeholder={placeholderMax}
                prefix={prefix}
                value={maxValue}
                onChange={handleMaxChange}
                className="flex-1 min-w-0"
                inputClassName="w-full"
            />
        </div>
    );
};

