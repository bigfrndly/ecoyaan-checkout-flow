import { useCart } from '@/context/CartContext';
import { ArrowLeft, MapPin, Package, ShieldCheck } from 'lucide-react';

export function PaymentStep() {
    const { cartItems, subtotal, shippingFee, discountApplied, grandTotal, shippingAddress, setCurrentStep } = useCart();

    const handlePayment = () => {
        // Simulate secure payment
        setTimeout(() => {
            setCurrentStep('SUCCESS');
        }, 1000);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center space-x-3 text-emerald-900 mb-6">
                <button
                    onClick={() => setCurrentStep('SHIPPING')}
                    className="p-2 hover:bg-emerald-50 rounded-full transition-colors"
                    aria-label="Back to Shipping"
                >
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-semibold">Review & Pay</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
                {/* Order Summary */}
                <div className="p-6 border-b border-emerald-50">
                    <h3 className="flex items-center text-lg font-medium text-emerald-900 mb-4">
                        <Package size={20} className="mr-2 text-emerald-600" />
                        Order Summary
                    </h3>
                    <ul className="space-y-3 mb-6">
                        {cartItems.map((item) => (
                            <li key={item.product_id} className="flex justify-between text-sm text-emerald-800">
                                <span>{item.quantity}x {item.product_name}</span>
                                <span className="font-medium text-emerald-950">₹{item.product_price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="space-y-2 pt-4 border-t border-dashed border-emerald-200 text-sm text-emerald-800">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping Fee</span>
                            <span>₹{shippingFee}</span>
                        </div>
                        {discountApplied > 0 && (
                            <div className="flex justify-between text-emerald-600">
                                <span>Discount</span>
                                <span>-₹{discountApplied}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-bold text-emerald-950 pt-2 border-t border-emerald-100">
                            <span>Grand Total</span>
                            <span>₹{grandTotal}</span>
                        </div>
                    </div>
                </div>

                {/* Shipping Address Summary */}
                <div className="p-6 bg-emerald-50/50">
                    <h3 className="flex items-center text-lg font-medium text-emerald-900 mb-3">
                        <MapPin size={20} className="mr-2 text-emerald-600" />
                        Shipping To
                    </h3>
                    {shippingAddress ? (
                        <div className="text-sm text-emerald-800 space-y-1">
                            <p className="font-semibold text-emerald-950">{shippingAddress.fullName}</p>
                            <p>{shippingAddress.email} | {shippingAddress.phone}</p>
                            <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-red-500">Shipping details missing.</p>
                    )}
                </div>
            </div>

            <button
                onClick={handlePayment}
                className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-0.5 mt-8 group"
            >
                <ShieldCheck size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                Pay Securely - ₹{grandTotal}
            </button>
        </div>
    );
}
