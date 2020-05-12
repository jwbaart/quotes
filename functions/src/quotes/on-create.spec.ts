const ffTest = require('firebase-functions-test')();
// const functions = require('./../index');
import { quoteOnCreateFn } from '../index';

describe('setCustomClaim', () => {
  it('successfully invokes function', async () => {
    const wrapped = ffTest.wrap(quoteOnCreateFn);
    // const wrapped = ffTest.wrap(functions.quoteOnCreateFn);
    // const data = { name: 'hello - world', broadcastAt: new Date() };

    await wrapped({
      data: () => ({
        name: 'hello - world'
      }),
      ref: {
        set: jest.fn()
      }
    });
  });
});
