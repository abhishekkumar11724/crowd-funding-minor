import React from 'react'

const AddupdateUI = ({index, description, time }) => {
  // console.log(index, description, time)
  return (
    
    <div className="card relative overflow-hidden my-4">
    <p>time: {time}</p>
    <p>
    description: {description}
    </p>
    

  </div>
  )
}

export default AddupdateUI