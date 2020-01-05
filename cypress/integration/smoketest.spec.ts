context('smoketest', () => {
  beforeEach(() => {});

  describe('intro page', () => {
    it('should load', () => {
      cy.visit('/');
    });
    it('should load intro component', () => {
      cy.visit('/');
      cy.get('app-intro').should('exist');
    });
  });
});
