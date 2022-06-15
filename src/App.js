import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '7144120007', id: 1 },
    { name: 'Berta LaCosta', phone: '3138976451', id: 2 }
  ]) 
  const [newName, setNewName] = useState('') 
  const [newPhone, setNewPhone] = useState('') 
  const [newSearch, setNewSearch] = useState('')
  const [foundUsers, setFoundUsers] = useState(persons);

  

  const addElementFunction = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).indexOf(newName) >= 0) {
      alert(`${newName} is already taken`)
    } else {
      const noteObject = {
        name: newName,
        phone: newPhone,
        id: persons.length + 1
      }
      setPersons(persons.concat(noteObject))
      setFoundUsers(persons.concat(noteObject))
      setNewName('')
      setNewPhone('')
      
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) => {
      const keyword = event.target.value;
  
      if (keyword !== '') {
        const results = persons.filter((person) => {
          return person.name.toLowerCase().includes(keyword.toLowerCase());
          // Use the toLowerCase() method to make it case-insensitive
        });
        setFoundUsers(results);
      } else {
        setFoundUsers(persons);
        // If the text field is empty, show all users
      }
  
      setNewSearch(keyword);
  }
 
  return (
    <div>
      <h1>Phone Book</h1>
      
        Filter:  <input
        value={newSearch} 
        onChange={handleSearchChange}
        /><br></br><br></br>
      <form onSubmit={addElementFunction}>
        Name:
        <input
        value={newName} 
        onChange={handleNameChange}
        /><br></br><br></br>
        Phone:
        <input 
        value={newPhone} 
        onChange={handlePhoneChange}
        /><br></br><br></br>
        <button type="submit">save</button>
      </form>   
      <div className="user-list">
        {foundUsers && foundUsers.length > 0 ? (
          foundUsers.map((user) => (
            <li key={user.id} className="user">
              <span className="user-id">{user.id} - </span>
              <span className="user-name">{user.name}: </span><span className="user-name">{user.phone}</span>
            </li>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
    </div>
  )
}

export default App 