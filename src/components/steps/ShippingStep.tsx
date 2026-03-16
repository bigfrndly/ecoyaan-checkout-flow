import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShippingAddress, ShippingAddressSchema } from '@/lib/types';
import { ArrowLeft, Plus, CheckCircle2, MapPin } from 'lucide-react';
import clsx from 'clsx';

export function ShippingStep() {
    const { addresses, setAddresses, selectedAddressId, setSelectedAddressId, setCurrentStep } = useCart();
    const [isAddingNew, setIsAddingNew] = useState(addresses.length === 0);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ShippingAddress>({
        resolver: zodResolver(ShippingAddressSchema),
    });
    
    useEffect(() => {
        const draft = localStorage.getItem('eco_draft_address');
        if (draft) {
            try {
                reset(JSON.parse(draft));
            } catch (e) { }
        }
    }, [reset]);

    useEffect(() => {
        const subscription = watch((value) => {
            localStorage.setItem('eco_draft_address', JSON.stringify(value));
        });
        return () => subscription.unsubscribe();
    }, [watch]);
    useEffect(() => {
        if (addresses.length > 0 && !isAddingNew && !selectedAddressId) {
            setSelectedAddressId(addresses[0].id || null);
        }
    }, [addresses, selectedAddressId, isAddingNew, setSelectedAddressId]);

    const onSubmitNewAddress = (data: ShippingAddress) => {
        const id = crypto.randomUUID();
        const newAddress = { ...data, id };
        setAddresses(prev => [...prev, newAddress]);
        setSelectedAddressId(id);
        setIsAddingNew(false);
        reset({ fullName: '', email: '', phone: '', pinCode: '', city: '', state: '' });
        localStorage.removeItem('eco_draft_address');
    };

    const handleNext = () => {
        if (!selectedAddressId && addresses.length > 0) {
            setSelectedAddressId(addresses[0].id || null);
        } else if (!selectedAddressId) {
            alert('Please select or add a shipping address');
            return;
        }
        setCurrentStep('PAYMENT');
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col min-h-full">
            <div className="flex items-center space-x-3 text-emerald-900 mb-6">
                <MapPin className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-bold tracking-tight">Shipping Address</h2>
            </div>

            <div className="flex-1 pb-32">
                {!isAddingNew && addresses.length > 0 && (
                    <div className="space-y-4">
                        {addresses.map(address => (
                            <div 
                                key={address.id}
                                onClick={() => setSelectedAddressId(address.id!)}
                                className={clsx(
                                    "p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative",
                                    selectedAddressId === address.id
                                        ? "border-emerald-500 bg-emerald-50/50 shadow-md transform scale-[1.01]"
                                        : "border-emerald-100 bg-white hover:border-emerald-300 hover:shadow-sm"
                                )}
                            >
                                {selectedAddressId === address.id && (
                                    <div className="absolute top-4 right-4 bg-white rounded-full">
                                        <CheckCircle2 className="text-emerald-500" size={28} />
                                    </div>
                                )}
                                <h3 className="font-bold text-emerald-950 text-lg mb-1 pr-10">{address.fullName}</h3>
                                <p className="text-emerald-700 text-sm mb-0.5">{address.email} • {address.phone}</p>
                                <p className="text-emerald-700 text-sm">{address.city}, {address.state} - {address.pinCode}</p>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setIsAddingNew(true)}
                            className="w-full py-5 mt-2 border-2 border-dashed border-emerald-300 rounded-2xl text-emerald-600 font-semibold hover:bg-emerald-50 hover:border-emerald-500 transition-all flex items-center justify-center space-x-2"
                        >
                            <Plus size={20} />
                            <span>Add New Address</span>
                        </button>
                    </div>
                )}

                {isAddingNew && (
                    <form id="address-form" onSubmit={handleSubmit(onSubmitNewAddress)} className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-emerald-100 relative">
                        <div className="flex justify-between items-center pb-4 mb-4 border-b border-emerald-50">
                            <h3 className="text-lg font-bold text-emerald-900">New Address Details</h3>
                            {addresses.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setIsAddingNew(false)}
                                    className="text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-emerald-800 mb-1.5">Full Name</label>
                                <input
                                    {...register('fullName')}
                                    className={clsx(
                                        "w-full px-4 py-3.5 rounded-xl border bg-emerald-50/30 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50",
                                        errors.fullName ? "border-red-300 focus:border-red-500" : "border-emerald-100 focus:border-emerald-400"
                                    )}
                                    placeholder="e.g. Jane Doe"
                                />
                                {errors.fullName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.fullName.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-emerald-800 mb-1.5">Email Directory</label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className={clsx(
                                            "w-full px-4 py-3.5 rounded-xl border bg-emerald-50/30 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50",
                                            errors.email ? "border-red-300 focus:border-red-500" : "border-emerald-100 focus:border-emerald-400"
                                        )}
                                        placeholder="jane@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-emerald-800 mb-1.5">Phone Number</label>
                                    <input
                                        {...register('phone')}
                                        type="tel"
                                        className={clsx(
                                            "w-full px-4 py-3.5 rounded-xl border bg-emerald-50/30 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50",
                                            errors.phone ? "border-red-300 focus:border-red-500" : "border-emerald-100 focus:border-emerald-400"
                                        )}
                                        placeholder="10 digit number"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-semibold text-emerald-800 mb-1.5">PIN Code</label>
                                    <input
                                        {...register('pinCode')}
                                        className={clsx(
                                            "w-full px-4 py-3.5 rounded-xl border bg-emerald-50/30 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50",
                                            errors.pinCode ? "border-red-300 focus:border-red-500" : "border-emerald-100 focus:border-emerald-400"
                                        )}
                                        placeholder="6 digits"
                                    />
                                    {errors.pinCode && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.pinCode.message}</p>}
                                </div>

                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-semibold text-emerald-800 mb-1.5">City</label>
                                    <input
                                        {...register('city')}
                                        className={clsx(
                                            "w-full px-4 py-3.5 rounded-xl border bg-emerald-50/30 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50",
                                            errors.city ? "border-red-300 focus:border-red-500" : "border-emerald-100 focus:border-emerald-400"
                                        )}
                                        placeholder="City Name"
                                    />
                                    {errors.city && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.city.message}</p>}
                                </div>

                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-semibold text-emerald-800 mb-1.5">State</label>
                                    <input
                                        {...register('state')}
                                        className={clsx(
                                            "w-full px-4 py-3.5 rounded-xl border bg-emerald-50/30 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50",
                                            errors.state ? "border-red-300 focus:border-red-500" : "border-emerald-100 focus:border-emerald-400"
                                        )}
                                        placeholder="State Name"
                                    />
                                    {errors.state && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.state.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Note: Save button logic moved to Sticky Action Bar but preserving a hidden submit logic if needed via form ref submit */}
                    </form>
                )}
            </div>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-emerald-100 p-4 z-20 shadow-[0_-8px_30px_-5px_rgba(0,0,0,0.1)] md:sticky md:bottom-0 md:-mx-10 md:-mb-10 md:px-10 md:py-6 md:rounded-b-3xl md:bg-white">
                <div className="flex items-center space-x-3 max-w-2xl mx-auto">
                    <button
                        type="button"
                        onClick={() => setCurrentStep('CART')}
                        className="w-1/3 min-w-[100px] flex items-center justify-center py-4 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-950 rounded-xl font-bold transition-all duration-200"
                    >
                        <ArrowLeft size={20} className="mr-2 hidden sm:block" />
                        Back
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (isAddingNew) {
                                const form = document.getElementById('address-form') as HTMLFormElement;
                                if (form) form.requestSubmit();
                            } else {
                                handleNext();
                            }
                        }}
                        className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                        {isAddingNew ? 'Save Location' : 'Next Step'}
                    </button>
                </div>
            </div>
        </div>
    );
}
