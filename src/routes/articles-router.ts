import { Application } from 'express';
import { QuotationsController } from '../controllers/quotations';

export class ArtcilesRouter {

  public articleCtrl: QuotationsController = new QuotationsController();

  public attach(app: Application): void {
    // Articles
    app.route('/quotation')
    // GET - List
    .get(this.articleCtrl.getArticles)
    // POST - Create
    .post(this.articleCtrl.createArticle);

    // Article Single
    app.route('/article/:articleId')
    // GET Single
    .get(this.articleCtrl.getArticleById)
    // Update Article
    .put(this.articleCtrl.updateArticleById)
    // Delete Article
    .delete(this.articleCtrl.deleteArticleById);
  }
}
