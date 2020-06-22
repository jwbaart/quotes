const navigationPage = require('./navigation.page');

describe('Navigation', () => {
  const navigation = require('./navigation.page');

  describe('when logged out', () => {
    beforeEach(() => {
      cy.logout();
      cy.visit('/quotes');
    });
    it('should hide menu button', () => {
      navigation.getDropDownMenu().should('not.exist');
    });
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/quotes');
    });
    it('should show menu button', () => {
      navigation.getDropDownMenu().should('be.visible');
    });
  });
});
