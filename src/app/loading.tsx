import { Leaf } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#f8faf8] flex flex-col items-center justify-center space-y-4">
            <div className="relative flex items-center justify-center w-20 h-20">
                <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
                <Leaf className="text-emerald-500 relative z-10" size={24} />
            </div>
            <p className="text-emerald-800 font-medium animate-pulse">Loading conscious checkout...</p>
        </div>
    );
}
