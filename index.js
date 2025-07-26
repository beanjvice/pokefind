import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
const app = express()
const port = 3000

const filename = fileURLToPath(import.meta.url)
const __dirname = dirname(filename)

const api = "https://pokeapi.co/api/v2"
// middlewares

app.use(express.static(path.join(__dirname + '/public')))

//app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// routes
app.get('/', (req, res) => {
  let pokemonList = []
  // code for fetching all pokemons
  console.log(pokemonList)
  res.render("index.ejs", { data: pokemonList })
})
app.post('/filter', async (req, res) => {
  let pokemonList = []
  let nameList = []
  console.log(req.body)
  let { pokemon } = req.body;
  pokemon = pokemon.split(" ").join("-")
  let promises;
  try {
    let response = await axios.get(`${api}/ability/${pokemon}`)
    nameList = response.data.pokemon
  } catch (error) {
    nameList = []
  }
  if (nameList.length === 0) {
    let response = await axios.get(`${api}/pokemon/${pokemon}`)
    promises = response.data
  }
  else {
     promises = nameList.map(async (e) => {
      try {
        let response = await axios.get(`${api}/pokemon/${e.pokemon.name}`)
        return response.data
      }
      catch (err) {
        console.log('res', err)
      }
    }
    )
  }
 pokemonList = await Promise.all(promises)
  // code for filtering pokemons
  res.render("index.ejs", { data: pokemonList })
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
app.get('/pokemon/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${api}/pokemon/${id}`);
    const pokemon = response.data;
    res.render('pokemon.ejs', { pokemon });
  } catch (error) {
    res.status(404).send('Pokémon not found');
  }
});