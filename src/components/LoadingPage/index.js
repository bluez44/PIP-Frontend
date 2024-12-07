import React from 'react'
import { GoDotFill } from "react-icons/go";
import './style.css'

export default function LoadingPage() {
  const dots = ['L','o','a','d','i','n','g','.','.','.'];
  
  return (
    <div 
        className='position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center placeholder-wave container-fluid'
        style={{backgroundColor: 'rgba(255, 255, 255, 1)', width: '100%', height: '100%', zIndex: 9999}}
    >
        <div className='d-flex align-items-center justify-content-center gap-0 gap-md-4'>
        {
            dots.map((dot, index) => (
                <span key={index} className='fs-2 loading__key' style={{animationDelay: `${index * 50}ms`}}>{dot}</span>
            ))
        }
        </div>
    </div>
  )
}
