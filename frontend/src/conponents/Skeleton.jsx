import React from 'react'

const Skeleton = () => {
  return (
    <div className="w-full h-screen bg-[background: conic-gradient(at bottom right, #1d4ed8, #1e40af, #111827)] flex flex-col p-10 gap-10">
      {/* Navbar Skeleton */}
      <div className="flex justify-between items-center w-full">
        <div className="h-8 w-32 bg-gray-800 animate-pulse rounded"></div>
        <div className="hidden md:flex gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-20 bg-gray-800 animate-pulse rounded"></div>
          ))}
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-around mt-20 gap-10">
        <div className="w-40 h-40 md:w-72 md:h-72 bg-gray-800 animate-pulse rounded-full"></div>
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="h-10 w-3/4 bg-gray-800 animate-pulse rounded"></div>
          <div className="h-20 w-full bg-gray-800 animate-pulse rounded"></div>
          <div className="flex gap-4">
            <div className="h-10 w-10 bg-gray-800 animate-pulse rounded-full"></div>
            <div className="h-10 w-10 bg-gray-800 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton
