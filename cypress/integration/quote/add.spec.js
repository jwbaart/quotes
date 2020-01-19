context('add', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });
  
  describe('quote page', () => {
    it('should have visible add button', () => {
      cy.get('[data-cy=quote-add]').should('exist');
    });
  });
});
