import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
    
  )
}

const Content = (props) => {
  console.log(props)
  return(
    <div>
     <p>
        {props.parts[0].name} {props.parts[0].exercises}
      </p>
     <p>
        {props.parts[1].name} {props.parts[1].exercises}
      </p>
      <p>
        {props.parts[2].name} {props.parts[2].exercises}
      </p>
  </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}
const Display = ({counter}) => <div>{counter}</div> 

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
      {text}
    </button>

)

const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}

const LeftRight = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }
  return (
    <div>
    {left}
    <Button onClick={handleLeftClick} text='left' />
    <Button onClick={handleRightClick} text='right' />
    {right}
    <div>
    <History allClicks={allClicks} />
    </div>
  </div>

  )
}

const App = () => {
  const name = 'Peter'
  const age = 10
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const [ counter, setCounter ] = useState(0)
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)


return (
  <><div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
  <div>
  <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
  </div>
  <div>
      <Display counter={counter} />
      <Button
        onClick={increaseByOne}
        text='plus' />
      <Button
        onClick={setToZero}
        text='zero' />
      <Button
        onClick={decreaseByOne}
        text='minus' />
    </div>
    <div>
      <LeftRight />
      </div></>
)
}

export default App