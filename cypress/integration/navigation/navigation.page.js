class Navigation {
  selectors = {
    dropdown: '[data-test=navigation-dropdown-button]',
    editUser: '[data-test=navigation-edit-user]',
    logOut: '[data-test=navigation-log-out]'
  };
  getDropDownMenu() {
    return cy.get(this.selectors.dropdown);
  }
  openDropDown() {
    return cy.get(this.selectors.dropdown).click();
  }

  selectEditUser() {
    return cy.get(this.selectors.editUser).click();
  }

  selectLogOut() {
    return cy.get(this.selectors.logOut).click();
  }
}

module.exports = new Navigation();
