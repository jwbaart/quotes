const navigation = require('./navigation.page');

class EditAuthenticatdUser {
  selectors = {
    dialog: '[data-test=edit-authenticated-user]',
    role: '[data-test=edit-authenticated-user-role]',
    name: '[data-test=edit-authenticated-user-name]',
    nameEditable: '[data-test=edit-authenticated-user-name-editable]',
    closeButton: '[data-test=edit-authenticated-user-close]'
  };
  getDialog() {
    return cy.get(this.selectors.dialog);
  }
  getRole() {
    return cy.get(this.selectors.role);
  }
  getName() {
    return cy.get(this.selectors.name);
  }
  getNameEditable() {
    return cy.get(this.selectors.nameEditable);
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
