"use client"

import { useEffect, useState } from 'react'

export function HeroBackground() {
  const [scrollOpacity, setScrollOpacity] = useState(1)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const opacity = Math.max(0, 1 - scrolled / 500)
      setScrollOpacity(opacity)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div 
      className="absolute inset-0 z-0"
      style={{ opacity: scrollOpacity }}
    >
      <img 
        src="/valeSMPblur.png" 
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1117]/50 to-[#0d1117]" />
    </div>
  )
}