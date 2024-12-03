import React from 'react'
import './style.css'

export default function MyButton( {text = 'NAN', rounded = '', onClick = () => {}, type = '', disable = true} ) {
  if(type === 'submit') 
    return (
      <button 
        type='submit' 
        className={`button__container ${disable? 'button__disabled' : ''} rounded${rounded ? '-' + rounded : ""} mb-4`}
        onClick={onClick}
        disabled = {disable}
      >
        {text}
      </button>
    )


  return (
    <div 
      className={`button__container rounded${rounded ? '-' + rounded : ""} mb-4`}
      onClick={onClick}
    >
        <p className='button__text'>{text}</p>
    </div>
  )
}
