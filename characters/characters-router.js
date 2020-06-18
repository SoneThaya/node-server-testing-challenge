const express = require('express')

const Characters = require('./characters-model')

const router = express.Router()

const knex = require('../data/db-config')

router.get('/', (req, res) => {
  Characters.getAll()
    .then(characters => {
      res.status(200).json(characters)
    })
    .catch(err => {
      res.status(500).json({message: 'failed to get characters'})
    })
})

router.post('/', (req, res) => {
  Characters.insert(req.body)
    .then(character => {
      res.status(201).json(character)
    })
    .catch(err => {
      console.log(err)

      res.status(500).json({
        message: 'error adding character'
      })
    })
})


router.delete('/:id', (req, res) => {

  Characters.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({message: 'not found'})
      }
    })
    .catch(error => {
      console.log("DELETE / error", error);
      res.status(500).json({ message: error.message });
    });
})

module.exports = router;