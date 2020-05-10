class Users {
  selectors = {
    name: '[data-test=user-name]',
    role: '[data-test=user-role]'
  };

  getName(name) {
    return cy.get(this.selectors.name).contains(name);
  }

  getRole(role) {
    return cy.get(this.selectors.role).contains(role);
  }
}

module.exports = new Users();
