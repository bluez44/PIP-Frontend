import React, { useContext, useEffect, useMemo, useRef, useState} from 'react'
import Cookies from 'js-cookie'
import './style.css'
import JobCard from '../../components/JobCard'
import p1 from '../../img/product-1-720x480.jpg'
import api from '../../api'
import LoadingPage from '../../components/LoadingPage'
import { FiDelete } from "react-icons/fi";
import { GrNext, GrPrevious  } from "react-icons/gr";
import { userInfo } from '../../App'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [filtedJobs, setFiltedJobs] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [pageNum, setPageNum] = useState(1)

  const [jobName, setJobName] = useState('')
  const jobNameInput = useRef()
  const [jobTypes, setJobTypes] = useState([])

  const [userInfor, setUserInfor] = useContext(userInfo)

  async function handlePageChange (e, page) {
      setIsLoading(true)
      setPageNum(page)
      await api.get('/api/v1/apply/', 
        {
          headers: {
            'authorization': `token PkREaAQVGQAehSpcNQ63`
          },
          params: {
            page: page,
          }
        }
      ).then(res => {
        // console.log(res.data.jobs)
        setJobs(res.data.jobs)
        setIsLoading(false)
      }).catch(err => {
        console.log(err)
        // window.location.reload();
      })
      setIsLoading(false)
  }

  function handleJobType (jobType) {
    if(jobTypes.includes(jobType)) {
      setJobTypes(jobTypes.filter((type) => type !== jobType))
    } else {
      setJobTypes([...jobTypes, jobType])
    }
  }

  const counter = useRef(0);
  useEffect( () => {
    async function getJobs() {
      setIsLoading(true)
      // console.log('get data')
      const token = Cookies.get('token');
      await api.get('/api/v1/apply/', 
        {
          headers: {
            'authorization': `token PkREaAQVGQAehSpcNQ63`
          },
          params: {
            page: pageNum,
          }
        }
      ).then(res => {
        // console.log(res.data.jobs)
        setJobs(res.data.jobs)
        setIsLoading(false)
      }).catch(err => {
        console.log(err)
        // window.location.reload();
      })
    }

    // if(counter.current) 
      getJobs()
    // else counter.current = 1
  }, [])

  useMemo(() => {
    if(jobTypes.length) {
      const newJobsList = jobs.filter((job) => {
        return job.title.toLowerCase().includes(jobName.toLowerCase()) && jobTypes.includes(job.jobType)
      })

      setFiltedJobs(newJobsList)
    } 

    else {
      const newJobsList = jobs.filter((job) => {
        return job.title.toLowerCase().includes(jobName.toLowerCase())
      })

      setFiltedJobs(newJobsList)
    }

  }, [jobs, jobName, jobTypes])
  
  // console.log('filtedJobs', filtedJobs)
  // console.log(jobName)

  return (
    <div className='job__wrapper'>
      {
        isLoading && <LoadingPage />
      }
        <div className='container'>
          <div className='row'>
            <div className='col-3'>
              <p className='text-center'>Tìm kiếm công việc phù hợp</p>
              <div className='position-relative my-4'>
                <input ref={jobNameInput} className='w-100 p-2 job__search__input rounded' placeholder='Nhập tên công việc' value={jobName} onChange={(e) => setJobName(e.target.value)}/>
                {jobName && <FiDelete className='position-absolute job__search__icon' onClick={() => {setJobName(''); jobNameInput.current.focus()}}/>}
              </div>
              <hr/>
              <div className='position-relative my-4'>
                <p>Job type</p>
                <form>
                  <input type="checkbox" id="jobType1" name="jobType1" onChange={e => handleJobType(e.target.value)} value="full-time"/>
                  <label className='text-uppercase ms-2' htmlFor="jobType1"> full-time</label><br/>

                  <input type="checkbox" id="jobType2" name="jobType2" onChange={e => handleJobType(e.target.value)} value="contract"/>
                  <label className='text-uppercase ms-2' htmlFor="jobType2"> contract </label><br/>

                  <input type="checkbox" id="jobType3" name="jobType3" onChange={e => handleJobType(e.target.value)} value="part-time"/>
                  <label className='text-uppercase ms-2' htmlFor="jobType3"> part-time</label>
                </form>
              </div>
            </div>
            <div className='col-9 job__container--list'>
              <div className='d-flex justify-content-center align-items-center mb-4'>
                <ul className='pagination gap-1'>
                    <li className={`page-item rounded d-flex align-items-center`} onClick={e => handlePageChange(e, pageNum - 1)}><GrPrevious /></li>
                    <li className={`page-item rounded d-flex align-items-center ${pageNum === 1 ? 'page-item--active' : ''}`} onClick={e => handlePageChange(e, 1)}>1</li>
                    <li className={`page-item rounded d-flex align-items-center ${pageNum === 2 ? 'page-item--active' : ''}`} onClick={e => handlePageChange(e, 2)}>2</li>
                    <li className={`page-item rounded d-flex align-items-center`} onClick={e => handlePageChange(e, pageNum + 1)}><GrNext /></li>
               </ul>
              </div>
              <div className='row'>
              {
                filtedJobs.length ? filtedJobs.map((job, index) => (
                  <div key={index} className='col-6'>
                    <JobCard 
                      imgUrl={p1} 
                      job={job}
                      recruiterId={userInfor._id}
                    />
                  </div>
                )) :
                <p className='text-center'>Không có kết quả phù hợp</p>
              }
              </div>   

              <div className='d-flex justify-content-center align-items-center'>
                <ul className='pagination gap-1'>
                    <li className={`page-item rounded d-flex align-items-center`} onClick={e => handlePageChange(e, pageNum - 1)}><GrPrevious /></li>
                    <li className={`page-item rounded d-flex align-items-center ${pageNum === 1 ? 'page-item--active' : ''}`} onClick={e => handlePageChange(e, 1)}>1</li>
                    <li className={`page-item rounded d-flex align-items-center ${pageNum === 2 ? 'page-item--active' : ''}`} onClick={e => handlePageChange(e, 2)}>2</li>
                    <li className={`page-item rounded d-flex align-items-center`} onClick={e => handlePageChange(e, pageNum + 1)}><GrNext /></li>
                  </ul>
              </div>        
            </div>
          </div>
        </div>
    </div>
  )
}
