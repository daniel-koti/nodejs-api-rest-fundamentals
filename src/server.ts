import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  const transactions = knex('transactions').where('amount', 500).select('*')

  return transactions
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server running on port 3333')
  })
