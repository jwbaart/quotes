describe.only('Quote add', () => {
  const quote = require('./quote.page');
  let testTitle;
  let testText;

  before(() => {
    testTitle = '[test] Title ' + new Date().getTime();
    testText = '[test] Text ' + new Date().getTime();
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/quotes');
  });

  it('should be able to add a quote', () => {
    quote.add({ title: testTitle, text: testText });
    quote.get(testText).should('exist');
  });

  afterEach(() => {
    quote.delete(testText);
  });
});
