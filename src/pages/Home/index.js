import React, { useState, useContext, useEffect } from 'react'
import img1 from '../../img/slider-image-2-1920x700.jpg'
import img2 from '../../img/slider-image-3-1920x700.jpg'
import { Slide } from 'react-slideshow-image';
import Cookies from 'js-cookie'

import './style.css'
import JobCard from '../../components/JobCard'
import p1 from '../../img/product-1-720x480.jpg'
import MyButton from '../../components/MyButton';
import { context } from '../../App';
import api from '../../api'
import LoadingPage from '../../components/LoadingPage';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '750px',
    position: 'relative'
  }
  const slideImages = [
    {
      url: `${img1}`,
      caption: '"Tìm kiếm việc làm là quá trình khám phá cơ hội nghề nghiệp phù hợp với kỹ năng, kinh nghiệm và mục tiêu của bản thân."'
    },
    {
      url: `${img2}`,
      caption: '"Tìm kiếm việc làm đòi hỏi sự kiên nhẫn, chuẩn bị kỹ lưỡng và khả năng kết nối để tìm được vị trí phù hợp với năng lực và đam mê."'
    },
  ];

  const navigate = useNavigate();

  return (
    <div className='home__wrapper'>
        <div className='home__slider home__container mb-5'>
        <Slide arrows={false} autoplay={true} duration={4000}>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                <div className='home__slider--description'>
                  <span className='home__slider--caption'>{slideImage.caption}</span>
                  <MyButton text='Xem công việc hiện có' onClick={() => {navigate('/jobs')}}/>
                </div>
              </div>
            </div>
          ))} 
        </Slide>
        </div>
        <div className='home__content home__container w-100 py-5'>
          <div className='container text-center'>
            <p className='home__content--title fs-2'>Về chúng tôi</p>
            <p className='home__content--description fs-5'>Monkey là một nền tảng trực tuyến kết nối giữa nhà tuyển dụng và người tìm việc, mang đến giải pháp tuyển dụng nhanh chóng và hiệu quả. Với giao diện thân thiện, dễ sử dụng, Monkey cho phép nhà tuyển dụng đăng tin tuyển dụng, tìm kiếm ứng viên phù hợp dựa trên các tiêu chí cụ thể. Đồng thời, người tìm việc có thể tạo hồ sơ chuyên nghiệp, cập nhật thông tin cá nhân, và tìm kiếm các cơ hội việc làm phù hợp với năng lực và mong muốn. Monkey cam kết trở thành cầu nối tin cậy, giúp tối ưu hóa quá trình tuyển dụng và tìm việc, đồng hành cùng bạn trên con đường phát triển sự nghiệp.</p>
          </div>
        </div>
        {/* <div className='home__jobs home__container py-5'>
          <div className='container text-center'>
            <p className='home__jobs--title fs-2'>Các công việc hiện có</p>
            <div className='home__jobs--container'>
              <div className='row'>
                {
                  jobs && jobs.map((job, index) => (
                    <div key={index} className='col-4'>
                      <JobCard imgUrl={p1} location={job.location} title={job.title} salary={job.salary} jobType={job.jobType} status={job.status}/>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div> */}
    </div>
  )
}
