context('smoketest', () => {
  beforeEach(() => {});

  describe('intro page', () => {
    it('should load', () => {
      cy.visit('/');
    });
    it('should load intro component', () => {
      cy.visit('/');
      cy.get('[data-cy=intro]').should('exist');
    });
  });
});
