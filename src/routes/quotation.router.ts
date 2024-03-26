import { Application } from 'express';
import { GetQuotationsController, ListQuotationsController } from '../controllers/quotations';

export class QuotationRouter {

  //public articleCtrl: GetQuotationsController = new GetQuotationsController();

  public attach(app: Application): void {
    // Articles
    app.route('/quotation')
    // GET - List
    .get(new GetQuotationsController().get)
    // POST - Create
    .post(new ListQuotationsController().list);

/*     // Article Single
    app.route('/article/:articleId')
    // GET Single
    .get(this.articleCtrl.getArticleById)
    // Update Article
    .put(this.articleCtrl.updateArticleById)
    // Delete Article
    .delete(this.articleCtrl.deleteArticleById); */
  }
}
