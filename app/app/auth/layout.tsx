import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between h-screen">
      
      <div className="w-full h-full flex flex-col items-center justify-center px-2 md:px-0">
        {children}
      </div>
    </div>
  )
}