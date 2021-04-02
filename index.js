require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
//const { default: persons } = require('./part2-puhelinluettelo/src/services/persons.js')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))




morgan.token('body', function(req, res) {
    if(req.method === "POST") {
        return `{"name":"${req.body.name}","number":"${req.body.number}"}`
    }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


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
    Person.find({}).then(persons => {
    res.send(`Phonebook has info for ${persons.length} people <br/><br/> ${now}`)
    })
})


/*const generateId = () => {
    return (
        Math.floor(Math.random() * 100000)
    )
}*/
app.post('/api/persons', (req, res, next) => {
    const body = req.body

  
    if (!body.name) {
        return res.status(400).send({ 
            error: 'name missing' 
      })
    }
    if (!body.number) {
        return res.status(400).send({
            error: 'number missing'
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
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    console.log(req.params.id)

    Person.findByIdAndUpdate(req.params.id, {number: body.number}, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
        

})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
  
    res.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    console.log(error.name)
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})