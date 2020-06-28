class Snackbar {
  selectors = {
    container: 'snack-bar-container'
  };

  getSnackbar() {
    return cy.get(this.selectors.container);
  }
}

module.exports = new Snackbar();
