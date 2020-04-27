context('smoketest', () => {
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
