const db = require('../data/db-config');

module.exports = {
  findById,
  getAll,
  remove,
  insert
}

function insert(character) {
  return db('characters')
    .insert(character, 'id')
    .then(([id]) => {
      return findById(id)
    })
}

function getAll() {
  return db('characters')
}

function remove(id) {
  return db('characters')
    .where({ id })
    .del()
}

function findById(id) {
  return db('characters')
    .where({ id })
    .first()
}