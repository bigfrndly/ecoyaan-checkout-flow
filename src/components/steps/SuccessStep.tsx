import { CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function SuccessStep() {
    const { resetCart, cartItems } = useCart();

    return (
        <div className="py-12 space-y-8 text-center animate-in zoom-in-95 fade-in duration-500 flex flex-col items-center">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50">
                <CheckCircle size={48} />
            </div>

            <div>
                <h2 className="text-3xl font-bold text-emerald-900 mb-2">Order Successful!</h2>
                <p className="text-emerald-700">
                    Thank you for shopping consciously. Your eco-friendly order is being processed.
                </p>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-6 w-full mt-8 max-w-sm mx-auto shadow-inner border border-emerald-100">
                <p className="text-sm text-emerald-800 font-medium mb-1">Order #ECO-{Math.floor(Math.random() * 100000)}</p>
                <p className="text-emerald-950 font-bold">You saved {cartItems.length} Earth points today!</p>
            </div>

            <button
                onClick={() => {
                    resetCart();
                }}
                className="mt-8 inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium transition-colors group"
            >
                Continue Shopping
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
