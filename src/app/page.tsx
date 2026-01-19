"use client";
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { Perfume } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load from server on mount
  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const { getPerfumes } = await import('@/app/actions');
        const data = await getPerfumes();
        setPerfumes(data);
      } catch (e) {
        console.error("Failed to load data", e);
      }
    };
    fetchPerfumes();
  }, []);

  const handleImport = async (data: Perfume[]) => {
    // Optimistic update
    setPerfumes(data);

    // Save to server
    try {
      const { uploadPerfumes } = await import('@/app/actions');
      const result = await uploadPerfumes(data);
      if (!result.success) {
        console.error("Failed to save to server", result.error);
        // Maybe revert? For now, just log.
      }
    } catch (e) {
      console.error("Upload action failed", e);
    }
  };

  const filteredPerfumes = perfumes.filter(p => {
    const hasImage = p.bottleImage && p.bottleImage.trim() !== '';
    if (!hasImage) return false;

    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(query) ||
      (p.brand && p.brand.toLowerCase().includes(query));
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar onImport={handleImport} onSearch={setSearchQuery} />
      <Hero />

      <div className="container py-12">
        <div className="flex items-center justify-between mb-8 pb-4">
          <h2 className="text-2xl font-bold text-black">New Arrivals</h2>
          <button className="text-sm font-medium text-black underline decoration-1 underline-offset-4 hover:opacity-70">
            View all
          </button>
        </div>

        {perfumes.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
            <p className="text-white/50 mb-4">No perfumes loaded yet.</p>
            <p className="text-sm text-[#d4af37]">Use the Settings icon to import your Excel sheet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            <AnimatePresence>
              {filteredPerfumes.map((perfume, index) => (
                <ProductCard
                  key={index}
                  perfume={perfume}
                  onViewDetails={(p) => window.location.href = `/product/${encodeURIComponent(p.name)}`}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
