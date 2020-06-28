describe('Quote', () => {
  const router = require('../page-objects/router.page');
  const quote = require('./quote.page');
  let testTitle;
  let testTitleUpdated;
  let testText;
  let testTextUpdated;

  beforeEach(() => {
    const currentTime = new Date().getTime();

    cy.login();
    router.toQuotes();
    testTitle = '[test] Title ' + currentTime;
    testText = '[test] Text ' + currentTime;
  });

  describe('add', () => {
    it('should be able to add a quote', () => {
      quote
        .add({ title: testTitle, text: testText })
        .should('contain', testTitle)
        .and('contain', testText);
    });

    after(() => {
      quote.delete(testText);
    });
  });

  describe('edit', () => {
    beforeEach(() => {
      testTitleUpdated = testTitle + ' [updated]';
      testTextUpdated = testText + ' [updated]';

      quote.add({ title: testTitle, text: testText });
    });

    it('should be able to edit quote text', () => {
      // TODO: extend to all quote properties
      quote
        .update(testText, { title: testTitleUpdated, text: testTextUpdated })
        .should('contain', testTitleUpdated)
        .and('contain', testTextUpdated);
    });

    afterEach(() => {
      quote.delete(testTextUpdated);
    });
  });

  describe('Delete', () => {
    beforeEach(() => {
      quote.add({ title: testTitle, text: testText });
    });

    it('should be able to delete a existing quote', () => {
      quote.delete(testText);
      cy.contains(testText).should('not.exist');
    });
  });
});
