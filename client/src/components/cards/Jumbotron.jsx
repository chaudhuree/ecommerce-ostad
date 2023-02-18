import React from 'react'

export default function Jumbotron({title,subtitle}) {
  return (
    <div className='container-fluid bg-primary'>
      <div className="row">
        <div className="col text-center p-5 bg-light">
          <h1>{title}</h1>
          <p className='lead'>{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
