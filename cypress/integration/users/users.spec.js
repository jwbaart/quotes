describe('Users', () => {
  const router = require('../page-objects/router.page');
  const users = require('./users.page');

  let testUserName;
  let testUserRole;

  beforeEach(() => {
    cy.login();
    router.toQuotes();

    testUserName = 'CI user';
    testUserRole = 'unknown';
  });

  xit('should show test user name', () => {
    users.getName(testUserName).should('exist');
  });

  xit('should show test user role', () => {
    users.getRole(testUserRole).should('exist');
  });

  it('should hide page for non admins', () => {
    users.getUsers().should('not.exist');
  });
});
