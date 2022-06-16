//Libraries
import React, { useEffect, useState } from 'react'

//Components
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import SearchDisplay from './components/SearchDisplay'
import Notification from './components/Notification'

//Services
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') 
  const [newPhone, setNewPhone] = useState('') 
  const [newSearch, setNewSearch] = useState('')
  const [newUpdatePhone, setUpdatePhone] = useState('')
  const [foundUsers, setFoundUsers] = useState(persons);
  const [notification, setNewNotification] = useState(null);

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleAddPhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleUpdatePhoneChange = (event) => {
    console.log(event.target.value)
    setUpdatePhone(event.target.value)
  }

  const handleSearchChange = (event) => {
      const keyword = event.target.value;
  
      if (keyword !== '') {
        const results = persons.filter((person) => {
          return person.name.toLowerCase().includes(keyword.toLowerCase());
        });
        setFoundUsers(results);
      } else {
                // If the text field is empty, show all users
        setFoundUsers(persons);

      }
  
      setNewSearch(keyword);
  }

  const getPersons = () => {
    personService
    .getAll()
    .then(res => {
        setFoundUsers(res.data)
        setPersons(res.data)
        console.log('got persons')
    })  
  }
  useEffect(getPersons, [])
  

  const addOnePerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).indexOf(newName) >= 0) {
      alert(`${newName} is already taken`)
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
        id: persons.length + 1
      }
      personService
      .create(personObject)
      .then(response => {
        getPersons()
        setNewName('')
        setNewPhone('')
    })
    .catch(error => console.log(error))
    setNewNotification(`${newName} has been successfully added!`)
    setTimeout(() => {
      setNewNotification(null)
    }, 5000)
    }
  }

  

  const displayUpdateInput = (event) => {
    const editId = event.target.dataset.personId
    const selectUserPhone = document.querySelector(`[data-person-id="${editId}"]`).querySelector('.user-number')
    const selectUserUpdateBtn = document.querySelector(`[data-person-id="${editId}"]`).querySelector('.user-update')
    const selectUserUpdateInput = document.querySelector(`[data-person-id="${editId}"]`).querySelector('.user-update-input')
    const selectUserSaveBtn = document.querySelector(`[data-person-id="${editId}"]`).querySelector('.user-save')
    selectUserPhone.classList.add("toggle-off")
    selectUserUpdateBtn.classList.add("toggle-off")
    selectUserUpdateInput.classList.remove("toggle-off")
    selectUserSaveBtn.classList.remove("toggle-off")
  }

  const updateOne = (event) => {
    const userName = event.target.parentElement.querySelector('.user-name').innerText
    const editId = event.target.dataset.personId
    const personObject = {
      name: userName,
      number: newUpdatePhone
    }
    personService
    .update(editId,personObject)
    .then(res => {
      setUpdatePhone('')
      getPersons()
    })
    .catch(error => {
      getPersons()
      setNewNotification(`This record is no longer availalbe`)
      setTimeout(() => {
        setNewNotification(null)
        }, 5000)
    })
    const selectUserPhone = document.querySelector(`[data-person-id="${editId}"]`).querySelector('.user-number')
    const selectUserUpdateBtn = document.querySelector(`[data-person-id="${editId}"]`).querySelector('.user-update')
    const selectUserUpdateInput = document.querySelector(`[data-person-id="${editId}"]`).querySelector('.user-update-input')
    const selectUserSaveBtn = document.querySelector(`[data-person-id="${editId}"]`).querySelector('.user-save')
    selectUserPhone.classList.remove("toggle-off")
    selectUserUpdateBtn.classList.remove("toggle-off")
    selectUserUpdateInput.classList.add("toggle-off")
    selectUserSaveBtn.classList.add("toggle-off")
  }

  const deleteOne = (event) => {
    const deleteId = event.target.dataset.personId
    personService
    .remove(deleteId)
    .then(res => getPersons())
    .catch(error => {
      getPersons()
      setNewNotification(`This record has already been removed`)
      setTimeout(() => {
        setNewNotification(null)
        }, 5000)
    })
  }

  
 
  return (
    <div>
      <h1>Phone Book</h1>
      <Notification message={notification} />
      <Filter 
      value={newSearch} 
      onChange={handleSearchChange}
      />
      <AddForm 
      onSubmit={addOnePerson}
      valueName={newName} 
      onChangeName={handleNameChange}
      valuePhone={newPhone}
      onChangePhone={handleAddPhoneChange}
      
      />
     <SearchDisplay
     foundUsers={foundUsers}
     saveOnClick={updateOne}
     value={newUpdatePhone}
     onChange={handleUpdatePhoneChange}
     updateOnClick={displayUpdateInput}
     deleteOnClick={deleteOne}
     />
    </div>
  )
}

export default App 