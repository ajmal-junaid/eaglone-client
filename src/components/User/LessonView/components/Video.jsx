import React from 'react'

const Video = ({url,selectedLesson,lessons,videoRef}) => {
  return (
    <div className="flex justify-center mb-4 ">
    <div>
      <video
        src={url}
        title={lessons[selectedLesson - 1].title}
        width="100%"
        height="auto"
        className="w-full"
        ref={videoRef}
      ></video>
    </div>
  </div>
  )
}

export default Video