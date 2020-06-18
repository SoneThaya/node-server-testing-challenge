
exports.up = function(knex) {
  return knex.schema
    .createTable('characters', tbl => {
      tbl.increments();

      tbl.string('name', 128).notNullable().index()
      tbl.string('gender', 12).notNullable();
      tbl.integer('age').notNullable();
      tbl.integer('level').notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('characters')
};
