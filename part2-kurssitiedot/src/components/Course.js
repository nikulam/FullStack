import React from 'react'

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
        <h1>
          {props.name}
        </h1>
      </>
    )
  }
  
  const Content = (props) => {
  return (
    <Part part={props.part} exe={props.exe} />
  )
  }
  
  const Total = (props) => {
    const reducer = (accumulator, item) => accumulator + item.exercises
    return (
      <b>total of {props.parts.reduce(reducer, 0)} exercises</b>
    )
  }
  
  const Course = (props) => {
    
    return (
      props.courses.map(course => 
        <div>
          <Header key={course.id} name={course.name} />
          {course.parts.map(n => <Content key={n.id} part={n.name} exe={n.exercises} />)}
          <Total key={course.id} parts={course.parts} />
        </div>
      )
      
    )
  }

  export default Course