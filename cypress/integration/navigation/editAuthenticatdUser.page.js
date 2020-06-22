const navigation = require('./navigation.page');

class EditAuthenticatdUser {
  selectors = {
    dialog: '[data-test=edit-authenticated-user]',
    role: '[data-test=edit-authenticated-user-role]',
    closeButton: '[data-test=edit-authenticated-user-close]'
  };
  getDialog() {
    return cy.get(this.selectors.dialog);
  }
  getRole() {
    return cy.get(this.selectors.role);
  }
  closeDialog() {
    return cy.get(this.selectors.closeButton).click();
  }
  openDialog() {
    navigation.openDropDown();
    navigation.selectEditUser();
  }
}

module.exports = new EditAuthenticatdUser();
