import { Application } from 'express';
import { OrderMagicFormulaController, ListByFormulaController } from '../controllers/order-by';

export class OrderRouter {

  //public articleCtrl: GetQuotationsController = new GetQuotationsController();

  public attach(app: Application): void {
    // Articles
    app.route('/order/magic-formula')
      // GET - List
      .get(new OrderMagicFormulaController().order)

    app.route('/order/magic-formula/list')
      // get listagem pela formula mágica
      .get(new ListByFormulaController().list)
  }
}
