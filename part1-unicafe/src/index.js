import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return (
    <button onClick={props.click}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td><td>{props.value}</td>
    </>
  )
} 

const Statistics = (good, neutral, bad) => {
  if ((good + neutral + bad) === 0) {
    return (
      <>
        No feedback given
      </>
    )
  }
  else {
    return (
      <>
      <table>
        <tbody>
          <tr><StatisticLine text="good" value={good}/></tr>
          <tr><StatisticLine text="neutral" value={neutral}/></tr>
          <tr><StatisticLine text="bad" value={bad}/></tr>
          <tr><StatisticLine text="all" value={good + neutral + bad}/></tr>
          <tr><StatisticLine text="average" value={(good - bad) / (good + neutral + bad)}/></tr>
          <tr><StatisticLine text="positive" value={good / (good + neutral + bad) * 100 + ' %'}/></tr>
        </tbody>
      </table> 
      </> 
    )
  }
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button click={() => setGood(good + 1)} text='good'/>
      <Button click={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button click={() => setBad(bad + 1)} text='bad'/>
      <h2>statistics</h2>
      {Statistics(good, neutral, bad)}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)