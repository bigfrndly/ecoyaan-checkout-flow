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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col min-h-full">
            <div className="flex items-center space-x-3 text-emerald-900 mb-6">
                <ShieldCheck className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-bold tracking-tight">Review & Pay</h2>
            </div>

            <div className="flex-1 pb-32">
                <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden mb-6">
                    {/* Order Summary */}
                    <div className="p-5 sm:p-6 border-b border-emerald-50">
                        <h3 className="flex items-center text-lg font-bold text-emerald-900 mb-4">
                            <Package size={20} className="mr-2 text-emerald-600" />
                            Order Summary
                        </h3>
                        <ul className="space-y-3 mb-6">
                            {cartItems.map((item) => (
                                <li key={item.product_id} className="flex justify-between text-sm text-emerald-800">
                                    <span className="font-medium text-emerald-900">{item.quantity}x {item.product_name}</span>
                                    <span className="font-bold text-emerald-950">₹{item.product_price * item.quantity}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-2.5 pt-4 border-t border-dashed border-emerald-200 text-sm mb-2">
                            <div className="flex justify-between font-medium text-emerald-800">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between font-medium text-emerald-800">
                                <span>Shipping Fee</span>
                                <span>₹{shippingFee}</span>
                            </div>
                            {discountApplied > 0 && (
                                <div className="flex justify-between font-semibold text-emerald-600">
                                    <span>Discount</span>
                                    <span>-₹{discountApplied}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between text-lg md:text-xl font-bold text-emerald-950 pt-4 border-t border-emerald-100">
                            <span>Grand Total</span>
                            <span>₹{grandTotal}</span>
                        </div>
                    </div>

                    {/* Shipping Address Summary */}
                    <div className="p-5 sm:p-6 bg-emerald-50/50">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="flex items-center text-lg font-bold text-emerald-900">
                                <MapPin size={20} className="mr-2 text-emerald-600" />
                                Shipping To
                            </h3>
                            <button
                                onClick={() => setCurrentStep('SHIPPING')}
                                className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 transition-colors uppercase tracking-wide"
                            >
                                Edit
                            </button>
                        </div>
                        {shippingAddress ? (
                            <div className="text-sm text-emerald-800 space-y-1 bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                                <p className="font-bold text-emerald-950">{shippingAddress.fullName}</p>
                                <p>{shippingAddress.email} • {shippingAddress.phone}</p>
                                <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}</p>
                            </div>
                        ) : (
                            <p className="text-sm font-medium text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">Shipping details missing.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-emerald-100 p-4 z-20 shadow-[0_-8px_30px_-5px_rgba(0,0,0,0.1)] md:sticky md:bottom-0 md:-mx-10 md:-mb-10 md:px-10 md:py-6 md:bg-white">
                <div className="flex items-center space-x-3 max-w-2xl mx-auto">
                    <button
                        type="button"
                        onClick={() => setCurrentStep('SHIPPING')}
                        className="w-1/3 min-w-[100px] flex items-center justify-center py-4 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-950 rounded-xl font-bold transition-all duration-200"
                    >
                        <ArrowLeft size={20} className="mr-2 hidden sm:block" />
                        Back
                    </button>
                    <button
                        onClick={handlePayment}
                        className="w-2/3 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-all duration-200 transform hover:-translate-y-0.5 group"
                    >
                        <ShieldCheck size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                        Pay Securely - ₹{grandTotal}
                    </button>
                </div>
            </div>
        </div>
    );
}
