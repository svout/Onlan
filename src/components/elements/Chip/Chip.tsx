import React from 'react';

export const Chip: React.FC<{
    label: string;
    icon?: React.ReactNode;
    onEdit?: () => void;
}> = ({ label, icon, onEdit }) => (
    <span className="inline-flex items-center gap-1 rounded-xl bg-onlan-lavender px-3 py-1 text-xs text-onlan-blue ring-1 ring-onlan-lavender">
        {icon && <span className="text-onlan-blue">{icon}</span>}
        {label}
        {onEdit && (
            <button onClick={onEdit} className="ml-1 rounded p-0.5 text-onlan-blue hover:bg-onlan-lavender hover:text-onlan-blue">
                ✎
            </button>
        )}
    </span>
);
