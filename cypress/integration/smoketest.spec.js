context('smoketest', () => {
  beforeEach(() => {
    cy.log('FIREBASE_CONFIG_TEST', Cypress.env('FIREBASE_CONFIG_TEST'));
  });

  describe('intro page', () => {
    it('should load', () => {
      cy.visit('/');
    });
    it('should load navigation component', () => {
      cy.visit('/');
      cy.get('[data-cy=navigation]').should('exist');
    });
  });
});
