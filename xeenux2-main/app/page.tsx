import { Suspense } from 'react';
// import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';


export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="container mx-auto px-0 md:px-4 space-y-20x">
        <Hero />
      </div>
      <Footer />
    </main>
  );
}