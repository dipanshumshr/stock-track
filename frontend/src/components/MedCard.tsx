import React from 'react'
import type {MedicineItem} from "../Types/MedicineType";

interface MedCardProps {
  medObj: MedicineItem;
}

function MedCard({ medObj }: MedCardProps) {
  const isLowStock = medObj.quantity < 10;

  return (
    // Main Card Container
    <div className="max-w-sm bg-zinc-800 rounded-xl border border-zinc-700 shadow-lg shadow-zinc-900/30 overflow-hidden hover:shadow-2xl hover:shadow-zinc-900/50 transition-all duration-300">

      
      <div className="p-5 border-b border-zinc-700/50">
        
        <span className="text-s font-bold tracking-wider text-emerald-500 uppercase mb-1 block">
          {medObj.brand}
        </span>
        <div className="flex justify-between items-start gap-2">
          
          <h5 className="text-xl font-bold tracking-tight text-[#F1F3E0] leading-tight">
            {medObj.productId.name}
          </h5>
          {/* Potency Badge: Darker blue background, lighter blue text */}
          <span className="bg-[#778873] text-[#F1F3E0] text-xs font-medium px-2.5 py-1 rounded-full border border-[#778873]">
            {medObj.productId.potency}
          </span>
        </div>
      </div>

      {/* Body: Details */}
      {/* Text color changed to light zinc (zinc-300) */}
      <div className="p-5 space-y-4 text-zinc-300">

        {/* Package Size */}
        <div className="flex items-center text-sm">
          <svg className="w-5 h-5 mr-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
          <span>Pack Size: <strong className="text-white ml-1">{medObj.productId.measure}</strong></span>
        </div>

        {/* Quantity Stock Status */}
        <div className="flex items-center text-sm">
           <svg className="w-5 h-5 mr-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
           </svg>
          <span>
            Stock:
            <span className={`ml-2 font-bold ${isLowStock ? "text-red-400" : "text-emerald-400"}`}>
                {medObj.quantity} units
            </span>
          </span>
        </div>
      </div>

      {/* Footer: Price & Action */}
      <div className="px-5 py-4 bg-zinc-900/50 border-t border-zinc-700/50 flex justify-between items-center">
        <div>
          <span className="text-zinc-400 text-xs block mb-1">MRP</span>
          <span className="text-2xl font-extrabold text-white">₹{medObj.salePrice}</span>
        </div>
        {/* Button: Adjusted hover state for dark mode */}
        <button className="text-white bg-[#778873] hover:bg-[#A1BC98] focus:ring-4 focus:ring-[#D2DCB6] font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default  MedCard; 