import { IndexController } from '../controllers/index-controller'
import { QuotationRouter } from './quotation.router'
import { OrderRouter } from './orders.router'

export class MainRouter {

  public indexCtrl: IndexController = new IndexController();

  public attach(app): void {
    this.addRoutes(app);
    this.addErrorHandler(app);
  }

  private addRoutes(app) {
    app.route('/').get(this.indexCtrl.getIndex)

    const quotationRouter = new QuotationRouter()
    quotationRouter.attach(app)

    const orderRouter = new OrderRouter()
    orderRouter.attach(app)
  }

  private addErrorHandler(app) {
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      const err = new Error('Not Found');
      (<any>err).status = 404
      next(err)
    })

    // development error handler
    app.use(function(err, req, res, next) {
      console.log(err.stack);
      res.status(err.status || 500);
      res.json({'meta': {
        code: err.status,
        message: err.message
      }})
    })
  }
}
