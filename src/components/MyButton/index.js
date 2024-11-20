import React from 'react'
import './style.css'

export default function MyButton( {text = 'NAN'} ) {
  return (
    <div className='button__container'>
        <p className='button__text'>{text}</p>
    </div>
  )
}
