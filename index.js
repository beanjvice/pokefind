import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
const app = express()
const port = 8000

const filename = fileURLToPath(import.meta.url)
const __dirname = dirname(filename)

const api = "https://pokeapi.co/api/v2"
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
  console.log(path.join(__dirname, 'views', 'index.html'))
})
app.post('/filter', async (req, res) => {
  console.log(req.body)
  const { pokemon } = req.body;
  try {
    let response = await axios.get(`${api}/pokemon/${pokemon}`)
    console.log('res', response)
  }
  catch (err) {
    console.log('res', err)
  }
  // code for filtering pokemons
  res.redirect('/')
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
