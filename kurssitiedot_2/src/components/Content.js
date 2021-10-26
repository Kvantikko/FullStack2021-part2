import React from 'react'
import Part from './Part'

const Content = ({parts}) => {     
  const total = parts.reduce((sum, parts) => sum + parts.exercises, 0)
  
  return (
    <div>     
      <ul>               
        {parts.map((x) =>
           <Part key={x.id} name={x.name} exercises={x.exercises}/>)}
        <h4>
          Total of {total} exercises
        </h4>        
      </ul>         
    </div>
  )
}
  
export default Content