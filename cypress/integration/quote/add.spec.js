context('add', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });
  
  describe('quote page', () => {
    it('should have visible add button', () => {
      cy.get('[data-cy=quote-add]').should('exist');
    });
  });
});
