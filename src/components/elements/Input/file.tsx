import { useState } from 'react';

export function FileUpload({
    onFileSelect,
    accept,
    fileRef,
    maxSizeKB = 2048,
    className = 'items-start',
}: {
    onFileSelect: (file: File | undefined) => void;
    accept?: string;
    fileRef?: React.RefObject<HTMLInputElement>;
    maxSizeKB?: number;
    className?: string;
}) {
    const [fileName, setFileName] = useState('No file chosen');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (file?: File) => {
        if (!file) {
            setFileName('No file chosen');
            setError(null);
            onFileSelect(undefined);
            return;
        }

        const maxBytes = maxSizeKB * 1024;

        if (file.size > maxBytes) {
            setError(`File too large — maximum ${maxSizeKB} KB`);
            setFileName('No file chosen');
            onFileSelect(undefined);
            return;
        }

        setError(null);
        setFileName(file.name);
        onFileSelect(file);
    };

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <div className="flex items-center gap-3">
                <label className="relative inline-flex cursor-pointer items-center rounded-md border border-onlan-lavender bg-onlan-white px-3 py-1.5 text-sm font-medium text-onlan-blue hover:bg-onlan-white">
                    Choose File
                    <input
                        ref={fileRef}
                        type="file"
                        accept={accept}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        onChange={(e) => handleChange(e.target.files?.[0])}
                    />
                </label>
                <span className="max-w-50 truncate text-sm text-onlan-blue">{fileName}</span>
            </div>

            {error && <span className="text-sm text-onlan-blue">{error}</span>}
        </div>
    );
}
