"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, CartData, ShippingAddress, CheckoutStep } from '../lib/types';

interface CartContextType {
    cartItems: CartItem[];
    shippingFee: number;
    discountApplied: number;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
    shippingAddress: ShippingAddress | null;
    setShippingAddress: (address: ShippingAddress) => void;
    currentStep: CheckoutStep;
    setCurrentStep: (step: CheckoutStep) => void;
    subtotal: number;
    grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
    children,
    initialCartData
}: {
    children: ReactNode;
    initialCartData: CartData;
}) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartData.cartItems);
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
    const [currentStep, setCurrentStep] = useState<CheckoutStep>('CART');

    const shippingFee = initialCartData.shipping_fee;
    const discountApplied = initialCartData.discount_applied;

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prev => prev.map(item =>
            item.product_id === id ? { ...item, quantity } : item
        ));
    };

    const removeItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.product_id !== id));
    };

    const subtotal = cartItems.reduce((total, item) => total + (item.product_price * item.quantity), 0);
    const grandTotal = subtotal + shippingFee - discountApplied;

    return (
        <CartContext.Provider
            value={{
                cartItems,
                shippingFee,
                discountApplied,
                updateQuantity,
                removeItem,
                shippingAddress,
                setShippingAddress,
                currentStep,
                setCurrentStep,
                subtotal,
                grandTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
