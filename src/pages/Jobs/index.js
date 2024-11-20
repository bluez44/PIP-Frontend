import React from 'react'
import './style.css'
import JobCard from '../../components/JobCard'
import p1 from '../../img/product-1-720x480.jpg'


export default function Jobs() {
  return (
    <div className='job__wrapper'>
        <div className='container'>
          <div className='row'>
            <div className='col-3'>
              Category
            </div>
            <div className='col-9 job__container--list'>
              <div className='row'>
                <div className='col-6'>
                  <JobCard imgUrl={p1} location='Hanoi' title='Software Engineer' salary='10.000.000' role='Full-time'/>
                </div>
                <div className='col-6'>
                  <JobCard imgUrl={p1} location='Hanoi' title='Software Engineer' salary='10.000.000' role='Full-time'/>
                </div>
                <div className='col-6'>
                  <JobCard imgUrl={p1} location='Hanoi' title='Software Engineer' salary='10.000.000' role='Full-time'/>
                </div>
                <div className='col-6'>
                  <JobCard imgUrl={p1} location='Hanoi' title='Software Engineer' salary='10.000.000' role='Full-time'/>
                </div>
                <div className='col-6'>
                  <JobCard imgUrl={p1} location='Hanoi' title='Software Engineer' salary='10.000.000' role='Full-time'/>
                </div>
                <div className='col-6'>
                  <JobCard imgUrl={p1} location='Hanoi' title='Software Engineer' salary='10.000.000' role='Full-time'/>
                </div>
              </div>              
            </div>
          </div>
        </div>
    </div>
  )
}
