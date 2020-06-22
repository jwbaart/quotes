describe('Edit authenticatd user', () => {
  const editAuthenticatdUser = require('./editAuthenticatdUser.page');

  beforeEach(() => {
    cy.login();
    cy.visit('/quotes');
  });

  describe('User details', () => {
    it('should show user details dialog', () => {
      editAuthenticatdUser.openDialog();

      editAuthenticatdUser.getDialog().should('be.visible');
    });

    it('should hide dialog on close', () => {
      editAuthenticatdUser.openDialog();
      editAuthenticatdUser.closeDialog();

      editAuthenticatdUser.getDialog().should('not.exist');
    });

    it('should show user role', () => {
      editAuthenticatdUser.openDialog();
      editAuthenticatdUser
        .getRole()
        .invoke('text')
        .then(roleText => {
          const hasRoleText = roleText && !!roleText.length;

          expect(hasRoleText).to.be.true;
        });
    });

    it('should change name to editable field', () => {
      editAuthenticatdUser.openDialog();
      editAuthenticatdUser.getNameEditButton().click();
      editAuthenticatdUser.getNameEditable().should('be.visible');
    });

    it('should change name to fixed view from editable field', () => {
      editAuthenticatdUser.openDialog();
      editAuthenticatdUser.getNameEditButton().click();
      editAuthenticatdUser.getNameSaveButton().click();
      editAuthenticatdUser.getName().should('be.visible');
    });
  });
});
