import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    /**
     * Validando se os dados que vêm do body, são compatíveis com o schema criado pelo zod
     */
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    /**
     * O Parse() retorna um erro (throw Error) caso a validação não aconteça, então tudo o que vier aqui será caso a validação funcione
     */

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send()
  })
}
