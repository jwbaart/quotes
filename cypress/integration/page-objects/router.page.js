class Router {
  routes = {
    quotes: '/quotes'
  };

  toQuotes() {
    return cy.visit(this.routes.quotes);
  }
}

module.exports = new Router();
