const db = require('../../../../config/database')

module.exports = {
  development: {
    ...db.blog
  },
  homolog: {
    ...db.blog
  },
  production: {
    ...db.blog
  }
}