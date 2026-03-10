import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export function CartStep() {
    const { cartItems, updateQuantity, removeItem, setCurrentStep, subtotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="py-12 text-center text-gray-500">
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-semibold text-emerald-900">Order Summary</h2>

            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.product_id} className="flex items-center space-x-4 border border-emerald-100 rounded-xl p-4 bg-white shadow-sm">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={item.image}
                                alt={item.product_name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-grow">
                            <h3 className="text-emerald-950 font-medium">{item.product_name}</h3>
                            <p className="text-emerald-600 font-semibold mt-1">₹{item.product_price}</p>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                            <button
                                onClick={() => removeItem(item.product_id)}
                                className="text-red-400 hover:text-red-600 transition-colors p-1"
                                aria-label="Remove item"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="flex items-center space-x-3 bg-emerald-50 rounded-lg p-1 border border-emerald-100">
                                <button
                                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                    className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-emerald-700 shadow-sm hover:bg-emerald-100 transition-colors disabled:opacity-50"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="text-sm font-medium w-4 text-center text-emerald-900">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                    className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-emerald-700 shadow-sm hover:bg-emerald-100 transition-colors"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-emerald-100 pt-6 mt-8">
                <div className="flex justify-between text-lg font-medium text-emerald-900 mb-6">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>

                <button
                    onClick={() => setCurrentStep('SHIPPING')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}
