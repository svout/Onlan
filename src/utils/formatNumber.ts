/**
 * Formats a number with commas for thousands separator
 * For numbers with 4+ digits before decimal point
 */
export function formatNumberWithCommas(value: string | number): string {
    const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
    
    if (isNaN(num)) return String(value);
    
    // Check if number has 4+ digits before decimal
    const parts = num.toString().split('.');
    const integerPart = parts[0];
    
    if (integerPart.length >= 4) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: parts[1]?.length || 0,
            maximumFractionDigits: parts[1]?.length || 2,
        }).format(num);
    }
    
    return String(value);
}

/**
 * Formats a currency value with commas
 */
export function formatCurrencyWithCommas(value: string | number): string {
    const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
    
    if (isNaN(num)) return typeof value === 'string' ? value : `$${value}`;
    
    // Check if number is whole (no decimal part)
    const isWhole = num % 1 === 0;
    
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: isWhole ? 0 : 2,
        maximumFractionDigits: isWhole ? 0 : 2,
    }).format(num);
    
    return formatted;
}

