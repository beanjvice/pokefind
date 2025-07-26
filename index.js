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
const getPokemons = async (fetchtype,url,pokemon) => {
  let nameList = [];
  let promises;
  try {
    let response = await axios.get(url)
    if(fetchtype ==='all'){
      response.data.results.map((e)=>nameList.push(e.name))
    }
    else if(fetchtype ==='filter'){
      response.data.pokemon.map((e)=>nameList.push(e.pokemon.name))
    }
    else{
    nameList.push(pokemon)
    }
  } catch (error) {
    nameList.push(pokemon)
  }
  if (nameList.length !== 0) {
    promises = nameList.map(async (e) => {
      try {
        let response = await axios.get(`${api}/pokemon/${e}`)
        return response.data

      }
      catch (err) {
        try {
          let response = await axios.get(`${api}/pokemon/${pokemon}`)
          return response.data
        }
        catch (error) {
        }
      }
    }
    )
  }
  return promises

}
//app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// routes
let showcase = []
app.get('/', async (req, res) => {
  let pokemonList = []
  // code for fetching all pokemons

  let promise = await getPokemons('all',api + "/pokemon?limit=10&offset=0",'')
  showcase = await Promise.all(promise)
  console.log(showcase,'case')
  res.render("index.ejs", { showcase: showcase, data: []})
})
app.post('/filter', async (req, res) => {
  let pokemonList = []
  let { pokemon } = req.body;
  pokemon = pokemon.split(" ").join("-")
  let promise = await getPokemons('filter',`${api}/ability/${pokemon}`,pokemon)
  pokemonList = await Promise.all(promise)
  // code for filtering pokemons
  res.render("index.ejs", { showcase: showcase, data: pokemonList })
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
    res.render('pokemon.ejs', { detail: pokemon });
  } catch (error) {
    res.status(404).send('Pokémon not found');
  }
});
