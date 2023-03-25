import React from 'react'
import { useParams } from 'react-router-dom';
import CourseDetails from '../../components/User/CourseDetails/CourseDetails'

function Course() {
  const params = useParams()
  return (
    <div className='pt-16 pb-8'>
      <CourseDetails id={params.id}/>
    </div>
  )
}

export default Course