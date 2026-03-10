import { promises as fs } from 'fs';
import path from 'path';
import { CartData } from './types';

// Simulate asynchronous server data fetch from a local file
export async function fetchCartData(): Promise<CartData> {
    const dataFilePath = path.join(process.cwd(), 'data.json');

    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents) as CartData;

        // Simulate network delay for effect to show loading state
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, 600);
        });
    } catch (error) {
        console.error('Error reading mock data:', error);
        throw error;
    }
}
