"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { Perfume } from '@/lib/types';
import { ImageView } from '@/components/ImageView';
import { Navbar } from '@/components/Navbar'; // Reuse navbar for consistency, but maybe without import capabilities here?

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const [perfume, setPerfume] = useState<Perfume | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerfume = async () => {
            const slug = typeof params.slug === 'string' ? decodeURIComponent(params.slug) : '';
            if (!slug) {
                setLoading(false);
                return;
            }

            try {
                const { getPerfumeBySlug } = await import('@/app/actions');
                // The server action does the search.
                const found = await getPerfumeBySlug(slug);
                setPerfume(found || null);
            } catch (e) {
                console.error("Failed to load product", e);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfume();
    }, [params.slug]);

    if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#d4af37]">Loading...</div>;
    if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-black">Loading...</div>;
    if (!perfume) return <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-black">Product not found.</p>
        <button onClick={() => router.push('/')} className="text-[#d4af37] underline">Return Home</button>
    </div>;

    return (
        <div className="min-h-screen bg-white">
            <nav className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-gradient-to-b from-white/90 to-transparent">
                <button onClick={() => router.back()} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-black transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex gap-4">
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-black transition-colors"><Heart size={20} /></button>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-black transition-colors"><Share2 size={20} /></button>
                </div>
            </nav>

            <div className="container pt-24 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
                {/* Image Gallery Side */}
                <div className="space-y-6">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 relative border border-gray-100">
                        <ImageView src={perfume.bottleImage || ''} alt={perfume.name} className="w-full h-full object-contain p-8" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                            <ImageView src={perfume.scentProfileImage || ''} alt="Scent Profile" className="w-full h-full object-contain" />
                        </div>
                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                            <ImageView src={perfume.notesImage || ''} alt="Notes" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>

                {/* Details Side */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-[#d4af37] text-lg tracking-widest uppercase mb-2">{perfume.brand}</h2>
                        <h1 className="text-5xl md:text-6xl font-serif text-black mb-6 leading-none">{perfume.name}</h1>
                        <p className="text-gray-600 text-lg leading-relaxed">{perfume.inspiration ? `Inspired by ${perfume.inspiration}` : 'A unique fragrance masterpiece.'}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
                        <h3 className="text-xl font-serif text-black mb-4">Decant Options</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { size: '2ml', price: perfume.price2ml },
                                { size: '6ml', price: perfume.price6ml },
                                { size: '8ml', price: perfume.price8ml },
                                { size: '30ml', price: perfume.price30ml },
                            ].map((opt) => (
                                <button key={opt.size} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 bg-white hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all">
                                    <span className="text-sm text-gray-500">{opt.size}</span>
                                    <span className="text-[#d4af37] font-bold">AED {opt.price}</span>
                                </button>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-gray-200 mt-4 flex justify-between items-center">
                            <span className="text-black">Retail Pack</span>
                            <span className="text-2xl font-serif text-black">AED {perfume.retailPrice}</span>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-[#b91c1c] text-white font-bold uppercase tracking-widest hover:bg-[#991b1b] transition-colors rounded-lg text-lg shadow-lg shadow-red-900/10">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
