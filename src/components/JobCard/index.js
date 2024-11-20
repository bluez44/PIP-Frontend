import React from 'react'
import MyButton from '../MyButton'

import './style.css'

export default function JobCard( {imgUrl, location, title, salary, role} ) {
  return (
    <div className='job__card'>
        <div className='job__card__infor'>
            <img className='job__card__infor--img' src={imgUrl}/>
            <div className='job__card__infor--location'>{location}</div>
        </div>

        <div className='job__card__description'>
            <p className='job__card__description--title'>{title}</p>
            <p className='job__card__description--salary'>$ {salary}</p>
            <p className='job__card__description--role'>{role}</p>
        </div>

        <hr/>

        <div className='job__card__button'>
            <MyButton text='Xem chi tiết'/>
        </div>
    </div>
  )
}
