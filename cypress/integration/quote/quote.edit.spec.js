describe.only('Quote edit', () => {
  const quote = require('./quote.page');
  let testTitle;
  let testTitleUpdated;
  let testText;
  let testTextUpdated;

  before(() => {
    testTitle = '[test] Title ' + new Date().getTime();
    testTitleUpdated = testTitle + ' [updated]';
    testText = '[test] Text ' + new Date().getTime();
    testTextUpdated = testText + ' [updated]';
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/quotes');
    quote.add({ title: testTitle, text: testText });
  });

  it('should be able to edit quote', () => {
    quote.update(testText, { title: testTitleUpdated, text: testTextUpdated });

    
  });

  afterEach(() => {
    quote.delete(testText);
  });
});
