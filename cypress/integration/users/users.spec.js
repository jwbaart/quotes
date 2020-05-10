describe('Users', () => {
  const users = require('./users.page');

  let testUserName;
  let testUserRole;

  beforeEach(() => {
    cy.login();
    cy.visit('/users');

    testUserName = 'CI user';
    testUserRole = 'unknown';
  });

  it('should show test user name', () => {
    users.getName(testUserName).should('exist');
  });

  it('should show test user role', () => {
    users.getRole(testUserRole).should('exist');
  });
});
