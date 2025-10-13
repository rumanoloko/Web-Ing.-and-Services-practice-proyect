import React from 'react'

interface actionsInterfaces{
  handleIncrement: () => void;
  handleDecrement: () => void;
  onRemove: () => void;
  quantity: number;
}
export default function AddRestRemove({handleIncrement,handleDecrement, onRemove, quantity}: actionsInterfaces){
  console.log("FUNCIONAMIENTO REMOTO EXITOSO")
  return (
    <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md shadow-sm">
      {/* Quantity controls */}
      <button onClick={handleDecrement} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm font-bold">−</button>
      <span className="text-sm font-medium px-1">{quantity}</span>
      <button onClick={handleIncrement}className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm font-bold">+</button>

      {/* Add to cart button */}
      <button onClick={onRemove} className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition duration-300 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314.014 314.015" width="16" height="16" fill="currentColor">
          <path d="M282.612,31.402h-47.099V15.701C235.513,7.033,228.471,0,219.812,0H94.205c-8.666,0-15.701,7.033-15.701,15.701v15.701
        H31.402c-8.668,0-15.701,7.033-15.701,15.699c0,8.668,7.033,15.701,15.701,15.701v219.81c0,17.344,14.06,31.402,31.4,31.402
        h188.411c17.341,0,31.398-14.059,31.398-31.402V62.803c8.664,0,15.701-7.033,15.701-15.701
        C298.313,38.436,291.292,31.402,282.612,31.402z M251.213,282.612H62.803V62.803h188.411V282.612z"/>
        </svg>
        Remove
      </button>
    </div>
  )
}