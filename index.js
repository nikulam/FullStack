require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))


morgan.token('body', function(req, res) {
    if(req.method === "POST") {
        return `{"name":"${req.body.name}","number":"${req.body.number}"}`
    }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
       id: 1,
       name: "Arto Hellafly",
       number: "040-123456"
   },
   {
       id: 2,
       name: "Ada Lovelace",
       number: "39-44-5323523"
   },
   {
       id: 3,
       name: "Dan Abramov",
       number: "12-43-234345"
   },
   {
       id: 4,
       name: "Mary Poppendick",
       number: "39-23-6423122"
   },        
]

app.get('/', (req, res) => {
    res.send('<h1>Hello Worldsss!</h1>')
})
  
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
        if (person) {
            res.json(person)
          } else {
            res.status(404).end()
          }
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    const now = new Date()
    res.send(`Phonebook has info for ${persons.length} people <br/><br/> ${now}`)
})

/*const generateId = () => {
    return (
        Math.floor(Math.random() * 100000)
    )
}*/
app.post('/api/persons', (req, res) => {
    const body = req.body
  
    if (!body.name) {
      return res.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    if (persons.map(n => n.name).includes(body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
  
    const person = new Person({
        //id: generateId(),
        name: body.name,
        number: body.number,
    })
  
    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(n => n.id !== id)
  
    res.status(204).end()
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})