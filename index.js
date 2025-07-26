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
app.use(express.static(path.join(__dirname, 'public')))
//app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


// routes
app.get('/', (req, res) => {
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
    nameList.push(pokemon)
  }
  console.log(nameList)
  if (nameList.length !== 0) {
     promises = nameList.map(async (e) => {
      try {
        let response = await axios.get(`${api}/pokemon/${e.pokemon.name}`)
        return response.data
      }
      catch (err) {
        try{
        let response = await axios.get(`${api}/pokemon/${pokemon}`)
        return response.data
        }
        catch(error){
             console.log(error)
        }
      }
    }
    )
  }
 pokemonList = await Promise.all(promises)
  console.log(__dirname)
  res.sendFile(path.join(__dirname,'views','index.html'))
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
