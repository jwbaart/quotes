context('add', () => {
  beforeEach(() => {
    // const firebaseConfig = Cypress.env('FIREBASE_CONFIG');
    // const projectId = firebaseConfig.projectId;
    // cy.log('Trying to login to firebase environment', projectId);
    cy.login();
    cy.visit('/quotes');
  });

  describe('quote page', () => {
    it('should be able to add quote', () => {
      const testTitle = 'testTitle'; // TODO: unique title
      cy.get('[data-cy=quote-add]').click();
      cy.get('[data-test=quote-form]').should('exist');

      cy.get('[data-test=quote-form-title] ').type(testTitle);
      cy.get('[data-test=quote-form-textarea]').type('textarea');

      cy.get('[data-test=quote-form-submit]').click();

      cy.get('[data-test=quote-card]')
        .first()
        .find('[data-test=quote-card-title]')
        .contains(testTitle);

      // Otherwise quote isn't correctly stored in firebase
      cy.wait(1000);
    });

    it('should be able to edit quote', () => {
      const editedTitle = 'editedTitle';
      cy.get('[data-test=quote-card]')
        .first()
        .find('[data-test=quote-card-edit]')
        .click();

      cy.get('[data-test=quote-form-title] ')
        .clear()
        .type(editedTitle);
      cy.get('[data-test=quote-form-submit]').click();
      cy.get('[data-test=quote-form]').should('not.exist');

      cy.get('[data-test=quote-card]');
      //   .first()
      //   .find('[data-test=quote-card-title]')
      //   // .contains(editedTitle);
      //   .contains('testTitle');
    });

    it('should be able to delete quote', () => {
      cy.get('[data-test=quote-card]')
        .first()
        .find('[data-test=quote-card-delete]')
        .click();

      cy.get('[data-test=quotes-missing]').should('be.visible');

      // should show snackbar
    });
  });
});
