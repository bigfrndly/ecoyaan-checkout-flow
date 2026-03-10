import { z } from 'zod';

export type CartItem = {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
};

export type CartData = {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
};

// Zod schema for Shipping Address validation
export const ShippingAddressSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  pinCode: z.string().regex(/^\d{6}$/, 'PIN code must be exactly 6 digits'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
});

export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;

export type CheckoutStep = 'CART' | 'SHIPPING' | 'PAYMENT' | 'SUCCESS';
