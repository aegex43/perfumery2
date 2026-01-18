import * as XLSX from 'xlsx';
import { Perfume } from './types';

export const parsePerfumeExcel = async (file: File): Promise<Perfume[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(sheet);

                const perfumes: Perfume[] = json.map((row: any) => {
                    // Basic cleaning
                    const name = row['Perfume name']?.trim() || 'Unknown';

                    // Construct image paths
                    // Note: Extensions are assumed .jpg or similar. 
                    // In a real app we'd check existence, but for now we generate paths.
                    // Scent profiles have (2), Notes have (3)
                    const cleanName = name;

                    return {
                        name: name,
                        brand: row['Brand'] || 'Unknown',
                        price2ml: Number(row['2ml']) || 0,
                        price6ml: Number(row['6ml']) || 0,
                        price8ml: Number(row['8ml']) || 0,
                        price30ml: Number(row['30ml']) || 0,
                        retailPrice: Number(row['Retail pack']) || 0,
                        inspiration: row['inspiration'] || '',
                        bottleImage: `/perfume_data/bottle/${encodeURIComponent(cleanName)}.png`,
                        scentProfileImage: `/perfume_data/Scent%20profile/${encodeURIComponent(cleanName)}%20(2).png`,
                        notesImage: `/perfume_data/Notes/${encodeURIComponent(cleanName)}%20(3).png`,
                    };
                });

                resolve(perfumes);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsBinaryString(file);
    });
};
