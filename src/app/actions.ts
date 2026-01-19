'use server';

import { db } from '@/db';
import { perfumes } from '@/db/schema';
import { Perfume } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function uploadPerfumes(data: Perfume[]) {
    try {
        // Clear existing data
        await db.delete(perfumes).run();

        // Map data to schema structure (Drizzle handles column mapping if keys match schema defines)
        // Note: Our schema keys match the Perfume interface keys exactly
        // apart from potential optional fields vs nulls.

        // We need to ensure types match. Perfume interface has string | number.
        // Schema expects specifc types.

        // Batch insert
        if (data.length > 0) {
            await db.insert(perfumes).values(data as any).run();
        }

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to upload perfumes:', error);
        return { success: false, error: 'Failed to save to database' };
    }
}

export async function getPerfumes() {
    try {
        const allPerfumes = await db.select().from(perfumes).all();
        return allPerfumes;
    } catch (error) {
        console.error('Failed to fetch perfumes:', error);
        return [];
    }
}

export async function getPerfumeBySlug(slug: string) {
    try {
        // Since we don't have a slug column, we search by name
        // Ideally we should index this or use a proper slug. 
        // For now, filtering in code or db find is fine for small datasets.

        // Use Javascript find for simple slug matching if we don't assume exact match
        // Or db query if exact.
        // Let's fetch all and find matching to replicate previous logic for robustness with "slug" decoding

        // Actually, db query is better.
        // But the previous code did decodeURIComponent.
        const all = await db.select().from(perfumes).all();
        return all.find(p => p.name === slug) || null;
    } catch (error) {
        console.error('Failed to fetch perfume:', error);
        return null;
    }
}
