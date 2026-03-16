import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export function CartStep() {
    const { cartItems, updateQuantity, removeItem, setCurrentStep, subtotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="py-20 text-center flex flex-col items-center text-emerald-500/70">
                <ShoppingBag size={64} className="mb-4 text-emerald-200" />
                <p className="text-lg font-medium text-emerald-800">Your cart is empty.</p>
                <p className="text-sm mt-2 text-emerald-600">Looks like you haven't added anything yet.</p>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col min-h-full">
            <div className="flex items-center space-x-3 text-emerald-900 mb-6">
                <ShoppingBag className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-bold tracking-tight">Cart Items</h2>
            </div>

            <div className="flex-1 pb-32 space-y-4">
                {cartItems.map((item) => (
                    <div key={item.product_id} className="flex flex-col sm:flex-row sm:items-center p-4 border border-emerald-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow relative group">
                        <div className="flex items-center space-x-4 flex-grow mb-4 sm:mb-0">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-emerald-50 border border-emerald-100">
                                <Image
                                    src={item.image}
                                    alt={item.product_name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-grow pr-8">
                                <h3 className="text-emerald-950 font-bold text-base md:text-lg leading-tight">{item.product_name}</h3>
                                <p className="text-emerald-600 font-bold text-lg mt-1 group-hover:text-emerald-500 transition-colors">₹{item.product_price}</p>
                            </div>
                        </div>

                        {/* Top Right Mobile Delete Button */}
                        <button
                            onClick={() => removeItem(item.product_id)}
                            className="absolute top-4 right-4 sm:hidden text-red-300 hover:text-red-500 transition-colors focus:outline-none bg-red-50/50 p-1.5 rounded-full"
                            aria-label="Remove item"
                        >
                            <Trash2 size={16} />
                        </button>

                        <div className="flex items-center justify-between sm:justify-end sm:space-x-6">
                            <div className="flex items-center space-x-1.5 bg-emerald-50/80 rounded-xl p-1.5 border border-emerald-100 shadow-sm">
                                <button
                                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-emerald-800 shadow-sm hover:bg-emerald-100 transition-colors disabled:opacity-40 disabled:hover:bg-white"
                                    disabled={item.quantity <= 1}
                                    aria-label="Decrease quantity"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="text-sm font-bold w-6 text-center text-emerald-950">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-emerald-800 shadow-sm hover:bg-emerald-100 transition-colors"
                                    aria-label="Increase quantity"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            
                            {/* Desktop Delete Button */}
                            <button
                                onClick={() => removeItem(item.product_id)}
                                className="hidden sm:flex text-red-300 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-all"
                                aria-label="Remove item"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-emerald-100 p-4 z-20 shadow-[0_-8px_30px_-5px_rgba(0,0,0,0.1)] md:sticky md:bottom-0 md:-mx-10 md:-mb-10 md:px-10 md:py-6 md:bg-white">
                <div className="flex flex-col sm:flex-row items-center justify-between max-w-2xl mx-auto space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="flex justify-between w-full sm:w-auto sm:flex-col items-center sm:items-start px-2 sm:px-0 bg-emerald-50/50 sm:bg-transparent rounded-xl py-3 sm:py-0 border border-emerald-100 sm:border-none shadow-sm sm:shadow-none">
                        <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider px-2 sm:px-0">Subtotal</span>
                        <span className="text-xl md:text-2xl font-black text-emerald-950 px-2 sm:px-0">₹{subtotal}</span>
                    </div>

                    <button
                        onClick={() => setCurrentStep('SHIPPING')}
                        className="w-full sm:w-2/3 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-all duration-200 transform hover:-translate-y-0.5 group"
                    >
                        Proceed to Checkout
                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
