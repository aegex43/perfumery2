"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
    return (
        <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-gray-50">
            {/* Abstract Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-white to-gray-50" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl opacity-60" />

            <div className="relative z-10 text-center space-y-6 max-w-4xl px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#d4af37] tracking-[0.2em] uppercase text-sm font-medium"
                >
                    Discover the Essence of Luxury
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight"
                >
                    The Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b5952f]">Scent</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                >
                    Explore our curated collection of exquisite fragrances and exclusive decants.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pt-8"
                >
                    <button className="btn-primary rounded-full px-8 py-4">Explore Collection</button>
                </motion.div>
            </div>
        </div>
    );
};
