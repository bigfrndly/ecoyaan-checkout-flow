"use client";

import { CartProvider, useCart } from '../context/CartContext';
import { Stepper } from './Stepper';
import { CartStep } from './steps/CartStep';
import { ShippingStep } from './steps/ShippingStep';
import { PaymentStep } from './steps/PaymentStep';
import { SuccessStep } from './steps/SuccessStep';
import { CartData } from '../lib/types';
import { Leaf } from 'lucide-react';

function CheckoutContent() {
    const { currentStep, isHydrated } = useCart();

    if (!isHydrated) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
                <div className="flex flex-col items-center space-y-4">
                    <Leaf className="text-emerald-500 animate-pulse" size={48} />
                    <p className="text-emerald-700 font-medium">Loading your green cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-center space-x-2 mb-8">
                <Leaf className="text-emerald-500" size={32} />
                <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Ecoyaan Checkout</h1>
            </div>

            <div className="bg-emerald-50/30 rounded-3xl shadow-xl shadow-emerald-100/50 p-6 md:p-10 border border-emerald-100 overflow-hidden relative">
                <Stepper />

                <div className="mt-8">
                    {currentStep === 'CART' && <CartStep />}
                    {currentStep === 'SHIPPING' && <ShippingStep />}
                    {currentStep === 'PAYMENT' && <PaymentStep />}
                    {currentStep === 'SUCCESS' && <SuccessStep />}
                </div>
            </div>
        </div>
    );
}

export function CheckoutApp({ initialCartData }: { initialCartData: CartData }) {
    return (
        <CartProvider initialCartData={initialCartData}>
            <CheckoutContent />
        </CartProvider>
    );
}
