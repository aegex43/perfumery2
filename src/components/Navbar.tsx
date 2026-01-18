"use client";
import React, { useState } from 'react';
import { Settings, Search, Menu } from 'lucide-react';
import { SettingsModal } from './SettingsModal';
import { Perfume } from '@/lib/types';

interface NavbarProps {
    onImport: (data: Perfume[]) => void;
    onSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onImport, onSearch }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="container h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">

                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-gray-600">
                        <a href="#" className="hover:text-black transition-colors">Collection</a>
                        <a href="#" className="hover:text-black transition-colors">Brands</a>
                        <a href="#" className="hover:text-black transition-colors">Decants</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-full md:w-64' : 'w-auto'}`}>
                            {isSearchOpen ? (
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) => {
                                            setSearchValue(e.target.value);
                                            onSearch(e.target.value);
                                        }}
                                        placeholder="Search..."
                                        className="w-full pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-[#d4af37] bg-gray-50/50"
                                        autoFocus
                                        onBlur={() => {
                                            if (!searchValue) setIsSearchOpen(false);
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            setSearchValue("");
                                            onSearch("");
                                            setIsSearchOpen(false);
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                                    >
                                        <Search size={14} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="text-gray-500 hover:text-black transition-colors"
                                >
                                    <Search size={20} />
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="text-gray-500 hover:text-[#d4af37] transition-colors"
                        >
                            <Settings size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onImport={onImport}
            />
        </>
    );
};
