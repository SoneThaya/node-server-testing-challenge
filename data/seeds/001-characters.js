
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('characters').del()
    .then(function () {
      // Inserts seed entries
      return knex('characters').insert([
        {name: 'Saitma', gender: 'male', age: 25, level: 99999},
        {name: 'Genos', gender: 'male', age: 19, level: 9999},
        {name: 'Fubuki', gender: 'female', age: 21, level: 4000},
        {name: 'Tornado', gender: 'female', age: 30, level: 50000},
        
      ]);
    });
};
