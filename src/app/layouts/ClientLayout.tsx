// /layouts/ClientLayout.tsx
'use client';  // Ensure this file is client-side

import { SessionProvider } from 'next-auth/react';
import Navigation from '@/components/Navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navigation />
      {children}
    </SessionProvider>
  );
}
