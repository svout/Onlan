import React from 'react';

export const Divider: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`h-px w-full bg-onlan-lavender ${className}`} />
);
