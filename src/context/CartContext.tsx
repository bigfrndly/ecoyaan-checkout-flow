"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CartData, ShippingAddress, CheckoutStep } from '../lib/types';

interface CartContextType {
    cartItems: CartItem[];
    shippingFee: number;
    discountApplied: number;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
    shippingAddress: ShippingAddress | null;
    addresses: ShippingAddress[];
    setAddresses: React.Dispatch<React.SetStateAction<ShippingAddress[]>>;
    selectedAddressId: string | null;
    setSelectedAddressId: (id: string | null) => void;
    currentStep: CheckoutStep;
    setCurrentStep: (step: CheckoutStep) => void;
    subtotal: number;
    grandTotal: number;
    isHydrated: boolean;
    resetCart: () => void;
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
    const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState<CheckoutStep>('CART');
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Load from local storage on mount
        try {
            const savedCart = localStorage.getItem('eco_cart');
            const savedAddresses = localStorage.getItem('eco_addresses');
            const savedSelectedId = localStorage.getItem('eco_selected_address_id');
            const savedStep = localStorage.getItem('eco_current_step') as CheckoutStep;

            if (savedCart) setCartItems(JSON.parse(savedCart));
            if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
            if (savedSelectedId) setSelectedAddressId(savedSelectedId);
            if (savedStep) setCurrentStep(savedStep);
        } catch (e) {
            console.error('Error loading checkout state', e);
        }
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem('eco_cart', JSON.stringify(cartItems));
    }, [cartItems, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem('eco_addresses', JSON.stringify(addresses));
    }, [addresses, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;
        if (selectedAddressId) {
            localStorage.setItem('eco_selected_address_id', selectedAddressId);
        } else {
            localStorage.removeItem('eco_selected_address_id');
        }
    }, [selectedAddressId, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem('eco_current_step', currentStep);
    }, [currentStep, isHydrated]);

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

    const resetCart = () => {
        setCartItems(initialCartData.cartItems);
        setCurrentStep('CART');
    };

    const subtotal = cartItems.reduce((total, item) => total + (item.product_price * item.quantity), 0);
    const grandTotal = subtotal + shippingFee - discountApplied;

    const shippingAddress = addresses.find(a => a.id === selectedAddressId) || null;

    return (
        <CartContext.Provider
            value={{
                cartItems,
                shippingFee,
                discountApplied,
                updateQuantity,
                removeItem,
                shippingAddress,
                addresses,
                setAddresses,
                selectedAddressId,
                setSelectedAddressId,
                currentStep,
                setCurrentStep,
                subtotal,
                grandTotal,
                isHydrated,
                resetCart,
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
