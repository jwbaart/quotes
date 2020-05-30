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
