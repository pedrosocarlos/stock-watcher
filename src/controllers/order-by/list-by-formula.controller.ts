import { Request, Response } from 'express'
import { BaseRestModel } from '../../models/base-rest-model'
import knex_connection from '../../database/connection'

export class ListByFormulaController {
  public async list(req: Request, res: Response) {
    const { amount } = req.query

    const stocks = await knex_connection('stock')
      .select('*')
      .limit(Number(amount))
      .join('stock_info', 'stock.id', '=', 'stock_info.id')
      .orderBy('stock_info.rank_final', 'asc')

    const result: BaseRestModel = {
      meta: {
        code: 0,
        message: 'ListByFormula success!',
        hasMore: false
      },
      data: stocks,
    }

    res.json(result);
  }
}
