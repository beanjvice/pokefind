const express = require('express');
const router = express.Router();

const pokemons = [
  { id: 1, name: 'Bulbasaur', type: 'Grass/Poison' },
  { id: 2, name: 'Ivysaur', type: 'Grass/Poison' },
    { id: 3, name: 'Venusaur', type: 'Grass/Poison' },
    { id: 4, name: 'Charmander', type: 'Fire' },
    { id: 5, name: 'Charmeleon', type: 'Fire' },
    { id: 6, name: 'Charizard', type: 'Fire/Flying' },
    { id: 7, name: 'Squirtle', type: 'Water' },
    { id: 8, name: 'Wartortle', type: 'Water' },
    { id: 9, name: 'Blastoise', type: 'Water' },
]

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find(p => p.id === id);

  if (!pokemon) {
    return res.status(404).send('Pokémon not found');
  }

  res.render('pokemon', { pokemon });
});

module.exports = router;