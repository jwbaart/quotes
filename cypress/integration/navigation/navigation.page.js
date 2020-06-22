class Navigation {
  selectors = {
    dropdown: '[data-test=navigation-dropdown-button]',
    editUser: '[data-test=navigation-edit-user]'
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
}

module.exports = new Navigation();
