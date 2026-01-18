"use client";
import React, { useRef, useState } from 'react';
import { Upload, X, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import { parsePerfumeExcel } from '@/lib/excel';
import { Perfume } from '@/lib/types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImport: (data: Perfume[]) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onImport }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setStatus('idle');
        try {
            const data = await parsePerfumeExcel(file);
            onImport(data);
            setStatus('success');
            setMessage(`Successfully imported ${data.length} perfumes`);
        } catch (err) {
            console.error(err);
            setStatus('error');
            setMessage('Failed to parse Excel file');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="glass-panel w-full max-w-md p-6 rounded-2xl relative bg-[#0a0a0a]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-serif mb-6 text-[#d4af37]">Settings</h2>

                <div className="space-y-6">
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#d4af37]/50 transition-colors">
                        <input
                            type="file"
                            accept=".xlsx,.xls"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                        />

                        <div className="flex flex-col items-center gap-3">
                            <div className="p-3 rounded-full bg-white/5 text-[#d4af37]">
                                {loading ? <div className="animate-spin w-6 h-6 border-2 border-[#d4af37] border-t-transparent rounded-full" /> : <FileSpreadsheet size={24} />}
                            </div>
                            <div className="text-sm">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-[#d4af37] hover:underline font-medium"
                                >
                                    Click to upload
                                </button>
                                <span className="text-white/40"> or drag and drop</span>
                            </div>
                            <p className="text-xs text-white/30">Supports .xlsx, .xls</p>
                        </div>
                    </div>

                    {status === 'success' && (
                        <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 p-3 rounded-lg">
                            <CheckCircle size={16} />
                            {message}
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                            <AlertCircle size={16} />
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
