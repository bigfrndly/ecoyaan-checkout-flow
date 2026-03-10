"use client";

import { useCart } from '@/context/CartContext';
import { ShoppingCart, Truck, CreditCard, CheckCircle } from 'lucide-react';
import { CheckoutStep } from '@/lib/types';
import clsx from 'clsx';

const steps: { id: CheckoutStep; label: string; icon: React.ElementType }[] = [
    { id: 'CART', label: 'Cart', icon: ShoppingCart },
    { id: 'SHIPPING', label: 'Shipping', icon: Truck },
    { id: 'PAYMENT', label: 'Payment', icon: CreditCard },
    { id: 'SUCCESS', label: 'Success', icon: CheckCircle },
];

export function Stepper() {
    const { currentStep } = useCart();

    const currentStepIndex = steps.findIndex(s => s.id === currentStep);

    return (
        <div className="w-full py-6">
            <div className="flex justify-between items-center relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0" />
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 rounded-full z-0 transition-all duration-300"
                    style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const Icon = step.icon;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center">
                            <div
                                className={clsx(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 bg-white",
                                    isCompleted ? "border-emerald-500 text-emerald-500" :
                                        isCurrent ? "border-emerald-600 bg-emerald-50 text-emerald-600 shadow-md" :
                                            "border-gray-300 text-gray-400"
                                )}
                            >
                                <Icon size={20} className={clsx(isCompleted && "fill-current")} />
                            </div>
                            <span className={clsx(
                                "mt-2 text-xs font-medium",
                                (isCompleted || isCurrent) ? "text-emerald-700" : "text-gray-500"
                            )}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
