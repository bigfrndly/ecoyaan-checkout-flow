import { fetchCartData } from '@/lib/data';
import { CheckoutApp } from '@/components/CheckoutApp';

// Explicitly define this page as a Server Component rendering dynamically
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch initial cart data during Server-Side Rendering (SSR)
  const initialCartData = await fetchCartData();

  return (
    <main className="min-h-screen bg-[#f8faf8] font-sans selection:bg-emerald-200">
      <CheckoutApp initialCartData={initialCartData} />
    </main>
  );
}
