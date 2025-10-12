'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignOutForm() {
  const router = useRouter();
  const handleSignOut = async () => {
    try{
      const response = await fetch('/api/auth/signout',{method: 'POST',});
      //if(response.ok)
      if(response.status === 204){
        router.push('/auth/signin');
        router.replace('/auth/signin');
      }else{
        console.log('Error while sign')
      }
    }catch(err){
      console.error("An error ocurred while sign out process.");
    }

  }

  return (
    <div className="mt-20 mx-auto max-w-md rounded-lg border border-gray-300 bg-white p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
        Are you sure you want to sign out?
      </h2>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Yes, sign out
        </button>
        <button
          onClick={() => {router.back()}}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
