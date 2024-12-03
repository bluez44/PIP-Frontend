import React from 'react'
import { GoDotFill } from "react-icons/go";
import './style.css'

export default function LoadingPage() {
  const dots = ['L','o','a','d','i','n','g','.','.','.'];
  
  return (
    <div 
        className='position-fixed top-0 left-0 right-0 bottom-0 d-flex justify-content-center align-items-center placeholder-wave'
        style={{backgroundColor: 'rgba(255, 255, 255, 1)', width: '100%', height: '100%', zIndex: 9999}}
    >
        {
            dots.map((dot, index) => (
                <span key={index} className='mx-4 fs-2 loading__key' style={{animationDelay: `${index * 50}ms`}}>{dot}</span>
            ))
        }
    </div>
  )
}
