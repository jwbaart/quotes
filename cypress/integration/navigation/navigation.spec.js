describe('Navigation', () => {
  const snackbar = require('../page-objects/snackbar.page');
  const navigation = require('./navigation.page');
  const router = require('../page-objects/router.page');

  beforeEach(() => {
    cy.login();
    router.toQuotes();
  });

  describe('when logging in', () => {
    it('should show login message', () => {
      const loginText = 'Je bent ingelogd';

      snackbar.getSnackbar().should('contain', loginText);
    });

    it('should show menu button', () => {
      navigation.getDropDownMenu().should('be.visible');
    });
  });

  describe('when logging out', () => {
    it('should show logout message', () => {
      const logoutText = 'Je bent uitgelogd';
      navigation.openDropDown();
      navigation.selectLogOut();
      // Manual logging out was not seen by following test so logging out via
      // offical method.
      cy.logout();

      snackbar.getSnackbar().should('contain', logoutText);
    });

    it('should hide menu button', () => {
      cy.logout();
      navigation.getDropDownMenu().should('not.exist');
    });
  });
});
