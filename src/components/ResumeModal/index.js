import React, {useState} from 'react'
import { Modal } from 'react-bootstrap';
import './style.css'
import { MdDeleteForever } from "react-icons/md";
import axios from '../../api'
// import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export default function ResumeModal({ resume, handleClose, type = 'normal', setResumes, resumeIndex }) {
  const [skills, setSkills] = useState([])
  const [languages, setLanguages] = useState([])
  const [editableSkills, setEditableSkills] = useState(resume.skills.split(','))
  const [editableLanguages, setEditableLanguages] = useState(resume.languages.split(','))

  const [editableResume, setEditableResume] = useState(resume)
  const [newResume, setNewResume] = useState({})
  // console.log('resume', resume)

  console.log(resumeIndex)
  const handleSubmitResume = (e) => {
    e.preventDefault()
    const token = Cookies.get('token');
    
    axios.post(
      '/api/v1/resumes/create', 
      newResume,
      {
        headers: {
          'authorization': `token ${token}`
        },
      }).then(res => {
        console.log(res)
        if(res.data.code === 400) {
          toast.error(res.data.message)
        }
        else {
          setResumes(prev => [...prev, newResume])
          toast.success(res.data.message)
          handleClose()
        }
      })
      .catch(err => console.log(err))
  }

  // console.log('skills', skills.join(','))
  const handleChangeSkillInput = (e, index) => {
    const newSkills = skills

    
    newSkills[index] = e.target.value

    setNewResume({
      ...newResume,
      skills: newSkills.join(','),
    })
    
    // console.log(newSkills)
    setSkills([...newSkills])
  }

  const handleDeleteSkill = (index) => {
    const newSkills = skills
    newSkills.splice(index, 1)

    setNewResume({
      ...newResume,
      skills: newSkills.join(','),
    })

    setSkills([...newSkills])
  }

  const handleChangeLanguageInput = (e, index) => {
    const newLanguage = languages

    
    newLanguage[index] = e.target.value

    setNewResume({
      ...newResume,
      languages: newLanguage.join(','),
    })
    
    // console.log(newLanguage)
    setLanguages([...newLanguage])
  }

  const handleDeleteLanguage = (index) => {
    const newLanguage = languages
    newLanguage.splice(index, 1)

    setNewResume({
      ...newResume,
      languages: newLanguage.join(','),
    })

    setLanguages([...newLanguage])
  }

  const handleOnChange = (e)  => {
      const {id, value} = e.target

      setNewResume({...newResume, [id]: value})
  }

  // ! ----------------------------------------------------------------------------

  const handleOnEdit = (e) => {
    const {id, value} = e.target

    setEditableResume({...editableResume, [id]: value})
  }

  const handleChangeEditableSkillInput = (e, index) => {
    const newSkills = editableSkills

    
    newSkills[index] = e.target.value

    setEditableResume({
      ...editableResume,
      skills: newSkills.join(','),
    })
    
    // console.log(newSkills)
    setEditableSkills([...newSkills])
  }

  const handleDeleteEditableSkill = (index) => {
    const newSkills = editableSkills
    newSkills.splice(index, 1)

    setEditableResume({
      ...editableResume,
      skills: newSkills.join(','),
    })

    setEditableSkills([...newSkills])
  }

  const handleChangeEditableLanguageInput = (e, index) => {
    const newLanguage = editableLanguages

    
    newLanguage[index] = e.target.value

    setEditableResume({
      ...editableResume,
      languages: newLanguage.join(','),
    })
    
    // console.log(newLanguage)
    setEditableLanguages([...newLanguage])
  }

  const handleDeleteEditableLanguage = (index) => {
    const newLanguage = editableLanguages
    newLanguage.splice(index, 1)

    setEditableResume({
      ...editableResume,
      languages: newLanguage.join(','),
    })

    setEditableLanguages([...newLanguage])
  }

  const handleSaveChanges = (e, id, index) => {
    e.preventDefault()
    const token = Cookies.get('token');

    
    
    axios.patch(
      `/api/v1/resumes/edit/${id}`, 
      editableResume,
      {
        headers: {
          'authorization': `token ${token}`
        },
      }).then(res => {
        console.log(res)
        if(res.data.code === 400) {
          toast.error(res.data.message)
        }
        else {
          toast.success(res.data.message)
          setResumes(prev => {
            const newResume = [...prev]
      
            newResume[index] = editableResume
      
            return [...newResume]
          })
          // handleClose()
        }
      })
      .catch(err => console.log(err))
  }

  
  // console.log(newResume)

  if(type === 'normal')
    return (
      <div 
        className='position-fixed top-0 bottom-0 start-0 end-0 modal__container d-flex justify-content-center align-items-center'
        onClick={handleClose}
      >
          <div 
            className='container resume__container'
            onClick={e => e.stopPropagation()}
          >
            <form>
              <div className='resume__header fs-2'>
                <input required onChange={e => handleOnEdit(e)} id='degree' value={editableResume.degree} placeholder="Enter resume's degree" className='w-50 mb-4 fs-2 text-center'/>
              </div>
              <div className='row'>
                <div className='col-6 mb-4'>
                  <p className='text-uppercase m-0'>field</p>
                  <input onChange={e => handleOnEdit(e)} id='field' type='text' value={editableResume.field} placeholder="Enter resume's field" className='resume__item__content w-100'/>
                </div>
                <div className='col-6 mb-4'>
                  <p className='text-uppercase m-0'>institution</p>
                  <input onChange={e => handleOnEdit(e)} id='institution' type='text' value={editableResume.institution} placeholder="Enter resume's institution" className='resume__item__content w-100'/>
                </div>
                <div className='col-6 mb-4'>
                  <p className='text-uppercase m-0'>start date</p>
                  <input onChange={e => handleOnEdit(e)} id='startDate' type="date" value={editableResume.startDate} placeholder="Enter resume's startDate" className='resume__item__content w-100'/>
                </div>
                <div className='col-6 mb-4'>
                  <p className='text-uppercase m-0'>end date</p>
                  <input onChange={e => handleOnEdit(e)} id='endDate' type='date' value={editableResume.endDate} placeholder="Enter resume's endDate" className='resume__item__content w-100'/>
                </div>
                <div className='col-6 mb-4'>
                  <p className='text-uppercase m-0'>certifications</p>
                  <input onChange={e => handleOnEdit(e)} id='certifications' type='text' value={editableResume.certifications} placeholder="Enter resume's certifications" className='resume__item__content w-100'/>
                </div>
                <div className='col-6 mb-4'>
                  <p className='text-uppercase m-0'>experience</p>
                  <input onChange={e => handleOnEdit(e)} id='experience' type='text' value={editableResume.experience} placeholder="Enter resume's experience" className='resume__item__content w-100'/>
                </div>
                <div className='col-6 mb-4'>
                  <p className='text-uppercase m-0'>position</p>
                  <input onChange={e => handleOnEdit(e)} id='position' type='text' value={editableResume.position} placeholder="Enter resume's position" className='resume__item__content w-100'/>
                </div>
                <div className='col-6 mb-4'>
                  <p className='text-uppercase m-0'>description</p>
                  <input onChange={e => handleOnEdit(e)} id='description' type='text' value={editableResume.description} placeholder="Enter resume's description" className='resume__item__content w-100'/>
                </div>
                <div className='col-6 mb-4'>
                  <p className='text-uppercase m-0'>skills</p>
                  {
                    editableSkills.map((skill, index) => (
                      <div className='position-relative mb-2'>
                        <input autoFocus={index === skills.length - 1} key={index} onChange={e => handleChangeEditableSkillInput(e, index)} id='skills' type='text' placeholder="Enter resume's skills" value={skill} className='resume__item__content w-100'/>
                        <MdDeleteForever className='position-absolute end-0 delete_skill_icon' size={20} onClick={e => handleDeleteEditableSkill(index)}/>
                      </div>
                    ))
                  }
                  <p 
                    className='text-center add_skill mt-2 mb-0' 
                    onClick={() => setSkills([
                      ...skills,
                      ''
                    ])}
                  >
                    Add more skill
                  </p>
                </div>
                <div className='col-6 mb-4'>
                  <p className='text-uppercase m-0'>languages</p>
                  {
                    editableLanguages.map((language, index) => (
                      <div className='position-relative mb-2'>
                        <input autoFocus={index === skills.length - 1} key={index} onChange={e => handleChangeEditableLanguageInput(e, index)} id='skills' type='text' placeholder="Enter resume's language" value={language} className='resume__item__content w-100'/>
                        <MdDeleteForever className='position-absolute end-0 delete_skill_icon' size={20} onClick={e => handleDeleteEditableLanguage(index)}/>
                      </div>
                    ))
                  }
                  <p 
                    className='text-center add_skill mt-2 mb-0' 
                    onClick={() => setLanguages([
                      ...languages,
                      ''
                    ])}
                  >
                    Add more language
                  </p>
                </div>
                <div className='col-6 mb-4'>
                  <p className='text-uppercase m-0'>summary</p>
                  <input onChange={e => handleOnEdit(e)} id='summary' type='text' value={editableResume.summary} placeholder="Enter resume's summary" className='resume__item__content w-100'/>
                </div>
              </div>

              <div className='d-flex gap-2 justify-content-end'>
                <button className={`btn btn-success ${!editableResume.degree? 'disabled' : ''}`} onClick={e => handleSaveChanges(e, editableResume._id, resumeIndex)}>Save changes</button>
                <button className='btn btn-danger' onClick={handleClose}>Cancel</button>
              </div>
            </form>
          </div>
      </div>
    )
  else 
    return (
      <div 
        className='position-fixed top-0 bottom-0 start-0 end-0 modal__container d-flex justify-content-center align-items-center'
        onClick={handleClose}
      >
        <div 
          className='container resume__container'
          onClick={e => e.stopPropagation()}
        >
          <form>
            <div className='resume__header fs-2'>
              <input required onChange={e => handleOnChange(e)} id='degree' placeholder="Enter resume's degree" className='w-50 mb-4'/>
            </div>
            <div className='row'>
              <div className='col-6 mb-4'>
                <p className='text-uppercase m-0'>field</p>
                <input onChange={e => handleOnChange(e)} id='field' type='text' placeholder="Enter resume's field" className='resume__item__content w-100'/>
              </div>
              <div className='col-6 mb-4'>
                <p className='text-uppercase m-0'>institution</p>
                <input onChange={e => handleOnChange(e)} id='institution' type='text' placeholder="Enter resume's institution" className='resume__item__content w-100'/>
              </div>
              <div className='col-6 mb-4'>
                <p className='text-uppercase m-0'>start date</p>
                <input onChange={e => handleOnChange(e)} id='startDate' type="date" placeholder="Enter resume's startDate" className='resume__item__content w-100'/>
              </div>
              <div className='col-6 mb-4'>
                <p className='text-uppercase m-0'>end date</p>
                <input onChange={e => handleOnChange(e)} id='endDate' type='date' placeholder="Enter resume's endDate" className='resume__item__content w-100'/>
              </div>
              <div className='col-6 mb-4'>
                <p className='text-uppercase m-0'>certifications</p>
                <input onChange={e => handleOnChange(e)} id='certifications' type='text' placeholder="Enter resume's certifications" className='resume__item__content w-100'/>
              </div>
              <div className='col-6 mb-4'>
                <p className='text-uppercase m-0'>experience</p>
                <input onChange={e => handleOnChange(e)} id='experience' type='text' placeholder="Enter resume's experience" className='resume__item__content w-100'/>
              </div>
              <div className='col-6 mb-4'>
                <p className='text-uppercase m-0'>position</p>
                <input onChange={e => handleOnChange(e)} id='position' type='text' placeholder="Enter resume's position" className='resume__item__content w-100'/>
              </div>
              <div className='col-6 mb-4'>
                <p className='text-uppercase m-0'>description</p>
                <input onChange={e => handleOnChange(e)} id='description' type='text' placeholder="Enter resume's description" className='resume__item__content w-100'/>
              </div>
              <div className='col-6 mb-4'>
                <p className='text-uppercase m-0'>skills</p>
                {
                  skills.map((skill, index) => (
                    <div className='position-relative mb-2'>
                      <input autoFocus={index === skills.length - 1} key={index} onChange={e => handleChangeSkillInput(e, index)} id='skills' type='text' placeholder="Enter resume's skills" value={skill} className='resume__item__content w-100'/>
                      <MdDeleteForever className='position-absolute end-0 delete_skill_icon' size={20} onClick={e => handleDeleteSkill(index)}/>
                    </div>
                  ))
                }
                <p 
                  className='text-center add_skill mt-2 mb-0' 
                  onClick={() => setSkills([
                    ...skills,
                    ''
                  ])}
                >
                  Add more skill
                </p>
              </div>
              <div className='col-6 mb-4'>
                <p className='text-uppercase m-0'>languages</p>
                {
                  languages.map((language, index) => (
                    <div className='position-relative mb-2'>
                      <input autoFocus={index === skills.length - 1} key={index} onChange={e => handleChangeLanguageInput(e, index)} id='skills' type='text' placeholder="Enter resume's language" value={language} className='resume__item__content w-100'/>
                      <MdDeleteForever className='position-absolute end-0 delete_skill_icon' size={20} onClick={e => handleDeleteLanguage(index)}/>
                    </div>
                  ))
                }
                <p 
                  className='text-center add_skill mt-2 mb-0' 
                  onClick={() => setLanguages([
                    ...languages,
                    ''
                  ])}
                >
                  Add more language
                </p>
              </div>
              <div className='col-6 mb-4'>
                <p className='text-uppercase m-0'>summary</p>
                <input onChange={e => handleOnChange(e)} id='summary' type='text' placeholder="Enter resume's summary" className='resume__item__content w-100'/>
              </div>
            </div>

            <div className='d-flex gap-2 justify-content-end'>
              <button className={`btn btn-success ${!newResume.degree? 'disabled' : ''}`} onClick={e => handleSubmitResume(e)}>Add resume</button>
              <button className='btn btn-danger' onClick={handleClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
}
