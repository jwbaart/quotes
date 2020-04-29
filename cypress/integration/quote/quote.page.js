class Quote {
  selectors = {
    add: '[data-cy=quote-add]',
    form: '[data-test=quote-form]',
    formTitle: '[data-test=quote-form-title]',
    formText: '[data-test=quote-form-text]',
    formSubmit: '[data-test=quote-form-submit]',
    card: '[data-test=quote-card]',
    cardTitle: '[data-test=quote-card-title]',
    cardText: '[data-test=quote-card-text]',
    cardEdit: '[data-test=quote-card-edit]',
    cardDelete: '[data-test=quote-card-delete]'
  };

  add(props) {
    cy.get(this.selectors.add).click();

    if (props.hasOwnProperty('title') && props.title && props.title.length) {
      cy.get(this.selectors.formTitle).type(props.title);
    }

    if (props.hasOwnProperty('text') && props.text && props.text.length) {
      cy.get(this.selectors.formText).type(props.text);
    }

    cy.get(this.selectors.formSubmit).click();

    return this.get(props.text);
  }

  delete(text) {
    return this.get(text)
      .find(this.selectors.cardDelete)
      .click();
  }

  update(props) {}

  get(text) {
    return cy
      .get(this.selectors.cardText)
      .contains(text)
      .parents(this.selectors.card);
  }
}

module.exports = new Quote();
