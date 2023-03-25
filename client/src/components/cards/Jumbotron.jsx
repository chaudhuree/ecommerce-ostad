import React from 'react'

export default function Jumbotron({title,subtitle}) {
  return (
    <div className='container-fluid'>
      <div className="row  jumbotron">
        <div className="col text-center p-5">
          <h1 className='text-white'>{title}</h1>
          <p className='lead'>{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
