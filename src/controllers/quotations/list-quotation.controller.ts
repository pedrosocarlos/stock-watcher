import { Request, Response } from 'express'
import { BaseRestModel } from '../../models/base-rest-model'
import knex_connection from '../../database/connection'

export class ListQuotationsController {
  public async list(req: Request, res: Response) {
    const stocks = await knex_connection('stock').select('*').limit(10).join('stock_info', 'stock.id', '=', 'stock_info.id');
    console.log(stocks)

    const result: BaseRestModel = {
      meta: {
        code: 0,
        message: 'listQuotations success!',
        hasMore: false
      },
      data: stocks,
    }

    res.json(result);
  }
}
