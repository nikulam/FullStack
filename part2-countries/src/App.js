import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Search from './components/Search';
//import FilterCountries from './components/FilterCountries';


const FilterNames = (props) => {
  return (
      props.arr.filter(n => n.name.toLowerCase().includes(props.str.toLowerCase())).map(n => <p>{n.name}</p>)  
  )
}
const Complain = () => {
  return (
    <p>Too many countries, specify another filter</p>
  )
}
const Decide = (props) => {
  const list = props.arr.filter(n => n.name.toLowerCase().includes(props.str.toLowerCase()))
  
  if(list.length <= 10 && list.length > 1) {
    return (
      <FilterNames arr={props.arr} str={props.str}/>
    )
  }
  else if(list.length == 1) {
    const country = list[0]
    return (
      <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        {country.languages.map(n => <p>{n.name}</p>)}
      </div>
    )
  }
  else if(props.str.length <= 0) {
    return (
      <p></p>
    )
  }
  else {
    return (
      <Complain/>
    )
  }
}

const App = () => {
  
  const [countries, setCountries] = useState([])

  const [newSearch, setNewSearch ] = useState('')

  const handleSearch = (e) => {
    setNewSearch(e.target.value)
  }
  

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])


  return (
    <>
      <Search handleSearch={handleSearch}/>
      <Decide arr={countries} str={newSearch}/>
    </>
  )
}



export default App;
