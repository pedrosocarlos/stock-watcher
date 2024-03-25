import { Request, Response } from 'express';
import { BaseRestModel } from '../../models/base-rest-model';
import { FundamentusService } from '../../facades'
import knex_connection from '../../database/connection'

export class QuotationsController {

  public addArticle(req: Request, res: Response) {
    const result: BaseRestModel = {
      meta: {
        code: 0,
        message: 'addArticle success!',
      },
    };

    res.json(result);
  }

  public async getArticles(req: Request, res: Response) {
    const fundamentus_facade = new FundamentusService()
    const fund_result = await fundamentus_facade.getAllStocks()

    fund_result.forEach(async element => {
      await knex_connection('stock').insert({
        title: element.title,
        ticker: element.ticker
        /* div_yield: element.div_yield,
        p_l: element.p_l,
        roe: element.roe,
        roic: element.roic,
        ev_ebit: element.ev_ebit */
      })
    })

    const stocks = await knex_connection('stock').select('*').limit(2)
    console.log(stocks)

    const result: BaseRestModel = {
      meta: {
        code: 0,
        message: 'getQuotations success!',
        hasMore: false
      },
      data: fund_result,
    }

    res.json(result);
  }

  public getArticleById(req: Request, res: Response) {
    const articleId = +req.params.articleId;
    const result: BaseRestModel = {
      meta: {
        code: 0,
        message: 'getArticleById: ' + articleId,
      },
    };
    res.json(result);
  }

  public createArticle(req: Request, res: Response) {
    const result: BaseRestModel = {
      meta: {
        code: 0,
        message: 'createArticle success!',
      },
    };
    res.json(result);
  }

  public updateArticleById(req: Request, res: Response) {
    const articleId = +req.params.articleId;
    const result: BaseRestModel = {
      meta: {
        code: 0,
        message: 'updateArticleById: ' + articleId,
      },
    };
    res.json(result);
  }

  public deleteArticleById(req: Request, res: Response) {
    const articleId = +req.params.articleId;
    const result: BaseRestModel = {
      meta: {
        code: 0,
        message: 'deleteArticleById: ' + articleId,
      },
    };
    res.json(result);
  }
}
