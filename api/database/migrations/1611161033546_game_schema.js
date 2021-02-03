'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('type_id').unsigned().references('id').inTable('types').onUpdate('CASCADE').onDelete('CASCADE')
      table.float('price', 2).notNullable()
      table.string('numbers').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GameSchema
