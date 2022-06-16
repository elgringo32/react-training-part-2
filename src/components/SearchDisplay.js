import React from 'react'

const SearchDisplay = ({foundUsers, value, deleteOnClick, updateOnClick, saveOnClick, onChange}) => {
    return (
      <div className="user-list">
      {foundUsers && foundUsers.length > 0 ? (
        foundUsers.map((user) => (
          <li key={user.id} data-person-id={user.id} className="user">
            <span className="user-id">{user.id} - </span>
            <span className="user-name">{user.name}</span>: <span className="user-number">{user.number}</span> 
            <input
            value={value}
            onChange={onChange}
            className="user-update-input toggle-off"
            />
            <button onClick={saveOnClick} data-person-id={user.id} className="user-save toggle-off">save</button> 
            <button onClick={updateOnClick} data-person-id={user.id} className="user-update">udpate</button> 
            <button onClick={deleteOnClick} data-person-id={user.id} className="user-delete">delete</button> 
            
          </li>
        ))
      ) : (
        <h1>No results found!</h1>
      )}
    </div>  
    )
  }
  
  export default SearchDisplay