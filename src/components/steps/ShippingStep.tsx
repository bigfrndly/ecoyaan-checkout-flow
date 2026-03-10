import { useCart } from '@/context/CartContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShippingAddress, ShippingAddressSchema } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

export function ShippingStep() {
    const { shippingAddress, setShippingAddress, setCurrentStep } = useCart();

    const { register, handleSubmit, formState: { errors } } = useForm<ShippingAddress>({
        resolver: zodResolver(ShippingAddressSchema),
        defaultValues: shippingAddress || {},
    });

    const onSubmit = (data: ShippingAddress) => {
        setShippingAddress(data);
        setCurrentStep('PAYMENT');
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center space-x-3 text-emerald-900 mb-6">
                <button
                    onClick={() => setCurrentStep('CART')}
                    className="p-2 hover:bg-emerald-50 rounded-full transition-colors"
                    aria-label="Back to Cart"
                >
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-semibold">Shipping Address</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-emerald-800 mb-1">Full Name</label>
                        <input
                            {...register('fullName')}
                            className={clsx(
                                "w-full px-4 py-3 rounded-xl border bg-emerald-50/50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50",
                                errors.fullName ? "border-red-300 focus:border-red-500" : "border-emerald-100 focus:border-emerald-400"
                            )}
                            placeholder="e.g. Jane Doe"
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-800 mb-1">Email</label>
                            <input
                                {...register('email')}
                                type="email"
                                className={clsx(
                                    "w-full px-4 py-3 rounded-xl border bg-emerald-50/50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50",
                                    errors.email ? "border-red-300 focus:border-red-500" : "border-emerald-100 focus:border-emerald-400"
                                )}
                                placeholder="jane@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-emerald-800 mb-1">Phone Number</label>
                            <input
                                {...register('phone')}
                                type="tel"
                                className={clsx(
                                    "w-full px-4 py-3 rounded-xl border bg-emerald-50/50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50",
                                    errors.phone ? "border-red-300 focus:border-red-500" : "border-emerald-100 focus:border-emerald-400"
                                )}
                                placeholder="10 digit number"
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-1">
                            <label className="block text-sm font-medium text-emerald-800 mb-1">PIN Code</label>
                            <input
                                {...register('pinCode')}
                                className={clsx(
                                    "w-full px-4 py-3 rounded-xl border bg-emerald-50/50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50",
                                    errors.pinCode ? "border-red-300 focus:border-red-500" : "border-emerald-100 focus:border-emerald-400"
                                )}
                                placeholder="6 digits"
                            />
                            {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode.message}</p>}
                        </div>

                        <div className="sm:col-span-1">
                            <label className="block text-sm font-medium text-emerald-800 mb-1">City</label>
                            <input
                                {...register('city')}
                                className={clsx(
                                    "w-full px-4 py-3 rounded-xl border bg-emerald-50/50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50",
                                    errors.city ? "border-red-300 focus:border-red-500" : "border-emerald-100 focus:border-emerald-400"
                                )}
                                placeholder="City Name"
                            />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                        </div>

                        <div className="sm:col-span-1">
                            <label className="block text-sm font-medium text-emerald-800 mb-1">State</label>
                            <input
                                {...register('state')}
                                className={clsx(
                                    "w-full px-4 py-3 rounded-xl border bg-emerald-50/50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-emerald-500/50",
                                    errors.state ? "border-red-300 focus:border-red-500" : "border-emerald-100 focus:border-emerald-400"
                                )}
                                placeholder="State Name"
                            />
                            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                >
                    Continue to Payment
                </button>
            </form>
        </div>
    );
}
