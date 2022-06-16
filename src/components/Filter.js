import React from 'react'

const Filter = ({value,onChange,}) => {
    return (
        <div>
            Filter:  <input
        value={value} 
        onChange={onChange}
        /><br></br><br></br>
        </div>
     
    )
  }
  
  export default Filter