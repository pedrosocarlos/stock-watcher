import { Request, Response } from 'express'
import knex_connection from '../../database/connection'
import { BaseRestModel, StockData } from '../../models'

export class OrderMagicFormulaController {
  public async order(req: Request, res: Response) {
    const stocks = await knex_connection('stock').select('*').join('stock_info', 'stock.id', '=', 'stock_info.id');
    console.log('\n\nações', stocks.length, '\n\n')
    if (stocks.length === 0) { return res.status(200).json({ message: 'no stocks found' }) }
    const insert_info: StockData[] = []

    const order_ebit = stocks.sort((a, b) => a.ev_ebit - b.ev_ebit)
    for (var i = 0; i < stocks.length; i++) {
      order_ebit[i].rank_ev_ebit = i + 1
    }

    const order_roic = stocks.sort((a, b) => b.roic - a.roic)
    for (var v = 0; v < stocks.length; v++) {
      order_roic[v].rank_roic = v + 1
    }

    for (var k = 0; k < stocks.length; k++) {
      insert_info.push({
        id: stocks[k].id,
        div_yield: stocks[k].div_yield = ! null ? stocks[k].div_yield : 0,
        p_l: stocks[k].p_l,
        ev_ebit: stocks[k].ev_ebit,
        roe: stocks[k].roe,
        roic: stocks[k].roic,
        rank_roic: order_roic[k].rank_roic,
        rank_ev_ebit: order_ebit[k].rank_ev_ebit,
        rank_final: order_roic[k].rank_roic + order_ebit[k].rank_ev_ebit
      })
    }

    await knex_connection('stock_info').delete();

    insert_info.forEach(async element => { await knex_connection('stock_info').insert(element) })

    const result: BaseRestModel = { meta: { code: 0, hasMore: false } }

    return res.status(200).json(result).send()
  }
}
