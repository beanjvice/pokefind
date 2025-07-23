import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const app = express()
const port = 8000

const filename = fileURLToPath(import.meta.url)
const __dirname = dirname(filename)
// middlewares
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.static(path.join(__dirname + '/views')))
//app.use(express.static('public'))
console.log(path.join(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// routes
app.get('/', (req, res) => {
  // code for fetching all pokemons
  console.log(path.join(__dirname,'views','index.html'))
})
app.post('/filter', (req, res) => {
  // code for filtering pokemons
})
app.post('/:id', (req, res) => {
  // code for fetchning pokemons by id
})
app.post('/save', (req, res) => {
  // code for saving
})
app.listen(port, (req, res) => {
  console.log(`Pokemon app is running successfully at port localhost:${port}`)
})
