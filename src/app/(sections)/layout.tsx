import React from 'react';
import  Navbar from '@/components/Navbar';
import  Header from '@/components/Header';
import  Footer from '@/components/Footer';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col bg-gray-300'>
      <Navbar />
      <Header />
      <main className='mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-gray-200'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
