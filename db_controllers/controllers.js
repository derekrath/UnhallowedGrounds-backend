
const knex = require("./dbConnection");

function getPasswordHashByUser(username){
    return knex.select('passwordHash')
      .from('users_table')
      .where({ user_username: username })
      .then((result) => {
        if (result.length < 1) {
          return undefined
        } else {
          return result[0].passwordHash
        }
      })
}

function createNewUser(username, passwordHash){
  return knex('users_table')
      // .where({ username })
      .where({ user_username: username })
      .then(result => {
          if (result.length > 0) {
            return []
          } else {
            return knex('users_table')
              .insert({ user_username: username, passwordHash })
              .returning(['id', 'user_username'])
              .catch((err) => res.status(500).json(err));
          }
      })
      .catch((err) => res.status(500).json(err));
}

module.exports = {createNewUser, getPasswordHashByUser}