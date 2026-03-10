# Ecoyaan Checkout Flow

A conscious, eco-friendly checkout flow built as part of the Frontend Engineering Interview Assignment for Ecoyaan.

## Tech Stack
- **Next.js 15+ (App Router)**: Utilizing Server Components for fetching initial data, and Client Components for interactivity.
- **Tailwind CSS**: For utility-first styling with a custom "eco-friendly" aesthetic (soft greens, earthy tones, rounded corners).
- **React Hook Form & Zod**: Form state management with schema-based validation.
- **Lucide-React**: Clean, simple SVG icons.

## Architecture & Choices
- **Server-Side Rendering & Hydration**: Initial cart data is fetched from the local `data.json` inside the root Server Component (`page.tsx`) during SSR. This data is then passed down to the client-side context state (`CartProvider`), ensuring zero client-side fetching delay and better SEO/performance.
- **State Management**: React's native Context API is used via `CartContext`. It persists `cartItems`, `shippingAddress`, and `currentStep` locally. This prevents state jumps and avoids heavy third-party state libraries when native context perfectly solves multi-step persistence requirements.
- **Multi-Step Component**: Rather than utilizing hard navigation with different URLs for every checkout step (which can induce janky reloading or routing delay), the flow utilizes a cohesive "Stepper" UX within a single Client wrapper component (`CheckoutApp.tsx`). This ensures lightning-fast transitions without breaking Next.js architecture conventions.
- **Perceived Performance**: A `loading.tsx` overlay utilizes Next.js App Router defaults to render instantly while SSR finishes the artificial data-fetch delay mimicking a genuine backend.

## How to run locally

1. Open a terminal and clone the repository.
2. Navigate into the application folder:
   ```bash
   cd checkout-flow
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- **Cart Summary**: Lists fetched mocked items, allows updating quantity and removal. Dynamically updates subtotal.
- **Shipping Address Validation**: A beautifully responsive form asserting email structure, exactly 10-digit phone, exactly 6-digit pin code, and required name fields. Gives inline error highlighting on blur/submit.
- **Review & Payment**: Shows a full breakdown of charges, including standard shipping, prior to a final secure payment confirmation.
- **Success State**: Final screen confirming the order and encouraging conscious shopping.
