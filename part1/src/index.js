import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exe}
    </p>
  )
}

const Header = (props) => {
  return (
    <>
      <p>
        {props.name}
      </p>
    </>
  )
}

const Content = (props) => {
return (
  <>
     <Part part={props.part1} exe={props.exe1}/>
     <Part part={props.part2} exe={props.exe2}/>
     <Part part={props.part3} exe={props.exe3}/>
  </>
)
}

const Total = (props) => {
return (
  <>
    <p>
      Number of exercises {props.first + props.second + props.third}
    </p>
  </>
)
}

const App = () => {
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

  

  

  return (
    <div>
      <h1>   
        <Header name={course.name} />
      </h1>
      <Content part1={course.parts[0].name} exe1={course.parts[0].exercises} part2={course.parts[1].name} exe2={course.parts[1].exercises} part3={course.parts[2].name} exe3={course.parts[2].exercises} />
      <Total first={course.parts[0].exercises} second={course.parts[1].exercises} third={course.parts[2].exercises} /> 
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))