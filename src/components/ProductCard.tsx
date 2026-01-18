"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Perfume } from '@/lib/types';
import { ImageView } from './ImageView';

interface ProductCardProps {
    perfume: Perfume;
    onViewDetails: (perfume: Perfume) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ perfume, onViewDetails }) => {
    const [isBroken, setIsBroken] = React.useState(false);

    if (isBroken) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => onViewDetails(perfume)}
            className="group cursor-pointer flex flex-col h-full bg-white rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
            {/* Image Container - Fixed Aspect Ratio */}
            <div className="w-full aspect-[4/5] relative bg-gray-50 flex items-center justify-center p-4">
                <ImageView
                    src={perfume.bottleImage || ''}
                    alt={perfume.name}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                    onLoadError={() => setIsBroken(true)}
                />
            </div>

            {/* Details Section - Flex grow to push content consistently */}
            <div className="flex flex-col flex-grow p-4 space-y-2 text-center">
                <div className="flex-grow">
                    <h3 className="text-sm font-medium text-black leading-tight line-clamp-2 min-h-[2.5em]">{perfume.name}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{perfume.brand}</p>
                </div>
                <p className="text-sm font-bold text-black pt-2 border-t border-gray-100">AED {perfume.price2ml}</p>
            </div>
        </motion.div>
    );
};
