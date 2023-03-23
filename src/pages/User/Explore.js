import React from 'react'
import { CategorySection, CourseSection } from '../../components/User/Explore'
function Categories() {
  return (
    <div className=''>
      <div className='flex '>
        <CategorySection />
        <CourseSection />
      </div>
    </div>
  )
}

export default Categories