import { US_STATE_ABBREVIATIONS } from '@utils/constants.ts';

export function getSlug(
    text: string,
    options: {
        lowercase?: boolean;
        separator?: string;
        maxLength?: number;
        strict?: boolean;
    } = {}
): string {
    const { lowercase = true, separator = '-', maxLength, strict = true } = options;

    if (!text || typeof text !== 'string') {
        return '';
    }

    let slug = text.trim();

    // Remove diacritics and accents
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (lowercase) {
        slug = slug.toLowerCase();
    }

    if (strict) {
        // Strict mode: only allow alphanumeric characters and separators
        slug = slug.replace(/[^a-zA-Z0-9\s-_]/g, '');
    } else {
        // Remove special characters but keep some common ones
        slug = slug.replace(/[^\w\s-_.]/g, '');
    }

    // Replace multiple spaces/separators with single separator
    slug = slug.replace(/[\s_-]+/g, separator);

    // Remove leading/trailing separators
    slug = slug.replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');

    // Truncate if maxLength is specified
    if (maxLength && slug.length > maxLength) {
        slug = slug.substring(0, maxLength);
        // Remove trailing separator if truncation created one
        slug = slug.replace(new RegExp(`${separator}+$`), '');
    }

    return slug;
}

export function moneyFormatter(amount: number, minDigits: number = 0, maxDigits: number = 2): string {
    return new Intl.NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: minDigits,
        maximumFractionDigits: maxDigits,
        // useGrouping: true,
    }).format(amount);
}

export function moneyValueFormatter(amount: number, minDigits: number = 2, maxDigits: number = 2): number {
    const formattedCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: minDigits,
        maximumFractionDigits: maxDigits,
    }).format(amount);

    return parseFloat(formattedCurrency.replace(/[^0-9.-]+/g, ''));
}

export function percentageFormatter(percent: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(percent);
}

export function percentageFormatterWithSign(
    percent: number,
    signDisplay: 'never' | 'auto' | 'always' | 'exceptZero' | undefined = 'auto'
): string {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        signDisplay: signDisplay,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(percent);
}

export function dateTimeFormatter(date: string | Date) {
    try {
        if (typeof date == 'string') {
            date = new Date(date + 'Z');
        }
        return new Intl.DateTimeFormat('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 24-hour format
            timeZone: 'America/New_York',
        })
            .format(date)
            .replace(',', '');
    } catch (er) {
        console.error(er, date);
        return '';
    }
}

export function dateFormatter(date: string | Date) {
    try {
        if (typeof date == 'string') {
            date = new Date(date);
        }
        return new Intl.DateTimeFormat('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: false, // 24-hour format
            timeZone: 'America/New_York',
        }).format(date);
    } catch (er) {
        console.error(er, date);
        return '';
    }
}

export function getEmailPattern(): string {
    return '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}';
}

export function getPhonePattern(): string {
    return '\\(\\d{3}\\) \\d{3}-\\d{4}';
}

export function getEINPattern(): string {
    return '\\d{2}-\\d{7}';
}

export function getZIPPattern(): string {
    return '^\\d{5}$';
}

export function sanitizePhoneInput(input: string): string {
    // Only allow digits, spaces, parentheses, periods, and dashes
    return input.replace(/[^\d().\- ]/g, '');
}

export function formatPhoneNumber(value: string): string {
    const result = sanitizePhoneInput(value);
    const digits = result.replace(/\D/g, '').slice(0, 10);

    if (digits.length === 0) return '';

    // if (digits.length <= 3) {
    //     return `(${digits}`;
    // } else if (digits.length <= 6) {
    //     return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    // }
    if (digits.length >= 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else {
        return result;
    }
}

export function formatEIN(value: string): string {
    const result = value.replace(/[^\d().\- ]/g, '');
    const digits = result.replace(/\D/g, '').slice(0, 9);

    if (digits.length === 0) return '';

    if (digits.length >= 9) {
        return `${digits.slice(0, 2)}-${digits.slice(2, 9)}`;
    } else {
        return result;
    }
}

export function formatDate(value: string): string {
    const result = sanitizePhoneInput(value);
    const digits = result.replace(/\D/g, '').slice(0, 8);

    if (digits.length === 0) return '';

    if (digits.length >= 8) {
        return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
    } else {
        return result;
    }
}

export function isValidZip(zip: string): boolean {
    const zipRegex = /^[0-9]{5}$/;
    return zipRegex.test(zip);
}

export function stripExtraProps<T>(obj: T, keys: (keyof T)[]): Partial<T> {
    const result: Partial<T> = {};
    for (const key of keys) {
        // @ts-ignore
        if (key in obj) result[key] = obj[key];
    }
    return result;
}

export function removeProps<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj };
    for (const key of keys) {
        delete result[key];
    }
    return result;
}

export function downloadFile(blob: Blob, filename: string = 'file.csv') {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}

export function extractFilename(contentDisposition?: string, fallback = 'download') {
    if (!contentDisposition) return fallback;

    const match = contentDisposition.match(/filename="?([^"]+)"?/);
    return match?.[1] ?? fallback;
}

export function getCurrentDateString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

export const currencyShort = (n: number) => {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}m`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
    return `$${n}`;
};

export const onlyDigits = (v: string) => v.replace(/[^\d]/g, '');
export const trimStr = (v: string) => v.trim();
export const normalizeZip = (v: string) => v.replace(/[^A-Za-z0-9- ]/g, '').trim();
export const normalizeEIN = (v: string) => onlyDigits(v).slice(0, 9);
export const normalizePhone = (v: string) => onlyDigits(v).slice(0, 20);

export const isStateCode = (code: string): boolean => (US_STATE_ABBREVIATIONS as readonly string[]).includes(code);

const URL_LAX_RE =
    /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/\/)?(?:localhost|(?:\d{1,3}\.){3}\d{1,3}|(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,})(?::\d{2,5})?(?:[/?#][^\s]*)?$/i;

export function validateWebsite(v?: string): string | null {
    const s = (v ?? '').trim();
    if (!s) return null;

    if (/\s/.test(s)) return 'URL must not contain spaces';

    return URL_LAX_RE.test(s) ? null : 'Invalid URL';
}

export function normalizeWebsite(v: string): string {
    let s = v.trim();
    if (!s) return s;
    if (!/^[a-z][a-z0-9+\-.]*:\/\//i.test(s)) s = 'https://' + s;
    try {
        const u = new URL(s);

        u.hash = u.hash;
        return u.toString();
    } catch {
        return v;
    }
}
