"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';

interface ImageViewProps {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    width?: number;
    height?: number;
    onLoadError?: () => void;
}

export const ImageView: React.FC<ImageViewProps> = ({ src, alt, className, fill, width, height, onLoadError }) => {
    const [error, setError] = useState(false);

    if (error) {
        return null; // Return nothing if image fails to load, as requested
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => {
                setError(true);
                if (onLoadError) onLoadError();
            }}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
    );
};
