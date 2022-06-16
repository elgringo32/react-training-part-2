import React from 'react'

const AddForm = ({onSubmit,valueName,onChangeName,valuePhone,onChangePhone}) => {
    return (
        <form onSubmit={onSubmit}>
        Name:
        <input
        value={valueName} 
        onChange={onChangeName}
        /><br></br><br></br>
        Phone:
        <input 
        value={valuePhone} 
        onChange={onChangePhone}
        /><br></br><br></br>
        <button type="submit">save</button>
      </form>   
     
    )
  }
  
  export default AddForm