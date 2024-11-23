import React from 'react'

import './style.css'
import MyButton from '../../components/MyButton'

import job_img from '../../img/product-1-720x480.jpg'
export default function JobDetails() {
  return (
    <div className='job_details py-5'>
        <div className='container shadow p-4 rounded'>
            <div className='d-flex flex-wrap gap-4 mb-5'>
                <img 
                    className='job_img'
                    src={job_img}
                    height={175}
                />
                <div className='job_wrapper align-content-center'>
                    <h2 className='job_title'>Security Officer - Luxury Retail</h2>
                    <p className='job_salary fs-5'><span className='job_salary--number'>$38000</span> per year</p>
                    <div className='job_infor'>
                        <span className='job_role'>Security / Protective Services Jobs</span>
                        <span className='job_location'>London</span>
                        <span className='job_date'>20-06-2024</span>            
                    </div>
                </div>
            </div>

            <div className='job_content p-4 border border-black rounded'>
                <div className='job_description'>
                    <p className='job_description--header fs-3 fw-bold'>Job Description</p>
                    <p className='job_description--content'>Pro Active Retail Security Officer required to operate in luxury retail environment. Searching for self-motivated individuals who are always looking to achieve the highest standards.</p>
                </div>

                <div className='job_responsibility'>
                    <p className='job_responsibility--header fs-3 fw-bold'>Responsibility</p>
                    <p className='job_responsibility--content'>Regular Report Writing, Liaison between the team and the client and head office, Door Supervision, Staff Search, Random Searches, TAG detector procedures, Risk Assessment, Fire Drills, Alarm Checks, immaculate customer services, deterrent and apprehension of offenders, liaisons with emergency services.</p>
                </div>

                <div className='job_qualifications'>
                    <p className='job_qualifications--header fs-3 fw-bold'>Qualifications</p>
                    <ul className='job_qualifications--content'>
                        <li>MUST have minimum 1 year experience in RETAIL security (shops).</li>
                        <li>MUST be Fluent in the English Language (speaking and writing).</li>
                        <li>MUST hold a valid SIA Door Supervisor Licence.</li>
                    </ul>
                </div>
            </div>

            <div className='about_compny p-4 border border-black rounded my-3'>
                <p className='about_compny--header fs-3 fw-bold'>About Cannon Guards Security ltd</p>
                <p className='about_compny--content mb-5'>Looking to improve the security at your place of business? If so, we will provide you with the trained security officers and professionally licensed personnel needed for any business. From a security guard for construction site security to private event security, you can be sure to get the very best from our staff. Alternatively we provide tailor-made security guard training for your existing security staff.</p>
                <div className='row'>
                    <div className='col-6'>
                        <div>
                            <p className='fs-5 mb-0'>Company name</p>
                            <p className='fs-6 fw-bold'>Cannon Guards Security Ltd</p>
                        </div>

                        <div>
                            <p className='fs-5 mb-0'>Phone</p>
                            <p className='fs-6 fw-bold'>123-456-789</p>
                        </div>

                        <div>
                            <p className='fs-5 mb-0'>Email</p>
                            <p className='fs-6 fw-bold'>z4V9t@example.com</p>
                        </div>

                        <div>
                            <p className='fs-5 mb-0'>City</p>
                            <p className='fs-6 fw-bold'>London</p>
                        </div>
                    </div>

                    <div className='col-6'>
                        <div>
                            <p className='fs-5 mb-0'>Contact name</p>
                            <p className='fs-6 fw-bold'>Paul Gordon</p>
                        </div>

                        <div>
                            <p className='fs-5 mb-0'>Mobile phone</p>
                            <p className='fs-6 fw-bold'>456789123</p>
                        </div>

                        <div>
                            <p className='fs-5 mb-0'>Website</p>
                            <p className='fs-6 fw-bold'>http://www.cannonguards.com/</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-25'>
                <MyButton text='Ứng tuyển' rounded='pill'/>
            </div>
        </div>
    </div>
  )
}
