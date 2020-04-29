// describe('mixed', () => {
//   const quote = require('./quote.selectors');

//   beforeEach(() => {
//     cy.login();
//     cy.visit('/quotes');
//   });

//   describe('quote page', () => {
//     let testTitle;
//     let testTextArea;

//     before(() => {
//       testTitle = '[test] Title ' + new Date().getTime();
//       testTextArea = '[test] TextArea ' + new Date().getTime();
//     });

//     it('should be able to add a quote', () => {
//       cy.get(quote.add).click();
//       cy.get(quote.form).should('exist');

//       cy.get(quote.formTitle).type(testTitle);
//       cy.get(quote.formTextarea).type(testTextArea);

//       cy.get(quote.formSubmit).click();

//       cy.get(quote.card)
//         .first()
//         .find(quote.cardTitle)
//         .contains(testTitle);

//       // Otherwise quote isn't correctly stored in firebase
//       cy.wait(1000);
//     });

//     // describe('should be able to edit quote', () => {
//     //   let editedTestTitle;
//     //   let editedTestTextarea;

//     //   before(() => {
//     //     editedTestTitle = testTitle + ' [edited]';
//     //     editedTestTextarea = testTextArea + ' [edited]';
//     //   });

//     //   it('should open edit screen', () => {
//     //     cy.get(quote.cardTitle)
//     //       .contains(testTitle)
//     //       .parents(quote.card)
//     //       .find(quote.cardEdit)
//     //       .click();

//     //     cy.get(quote.form).should('exist');
//     //   });

//     //   it('should be able to input new quote title', () => {
//     //     cy.get(quote.formTitle)
//     //       .clear()
//     //       .type(editedTestTitle);
//     //   });

//     //   it('should be able to input new quote textarea', () => {
//     //     cy.get(quote.formTextarea)
//     //       .clear()
//     //       .type(editedTestTextarea);
//     //   });

//     //   it('should hide edit screen', () => {
//     //     cy.get(quote.formSubmit).click();
//     //     cy.get(quote.form).should('not.exist');
//     //   });

//     //   it('should show updated title', () => {
//     //     cy.get(quote.cardTitle)
//     //       .contains(editedTestTitle)
//     //       .should('exist');
//     //   });

//     //   it('should show updated textarea', () => {
//     //     cy.get(quote.cardTitle)
//     //       .contains(editedTestTextarea)
//     //       .should('exist');
//     //   });

//     //   // cy.get(quote.formTitle)
//     //   //   .clear()
//     //   //   .type(editedTitle);
//     //   // cy.get(quote.formSubmit).click();
//     //   // cy.get(quote.form).should('not.exist');

//     //   // cy.get(quote.cardTitle)
//     //   //   .contains(editedTitle)
//     //   //   .should('exist');
//     // });

//     // it('should be able to delete quote', () => {
//     //   cy.get(quote.cardTitle)
//     //     .contains(testTitle)
//     //     .parents(quote.card)
//     //     .find(quote.cardDelete)
//     //     .click();

//     //   cy.get(quote.cardTitle)
//     //     .contains(testTitle)
//     //     .should('not.exist');

//     //   // should show snackbar
//     // });
//   });
// });
