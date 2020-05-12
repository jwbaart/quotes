const ffTest = require('firebase-functions-test')();
import { quoteOnCreateFn } from '../index';

describe('setCustomClaim', () => {
  let mockServerTimestamp: jest.Mock;
  let mockSet: jest.Mock;

  beforeEach(() => {
    const mockQueryResponse = jest.fn();
    mockQueryResponse.mockResolvedValue([
      {
        id: 1
      }
    ]);
    mockServerTimestamp = jest.fn();
    mockSet = jest.fn();

    jest.mock('firebase-admin', () => ({
      initializeApp: jest.fn(),
      firestore: {
        FieldValue: {
          serverTimestamp: mockServerTimestamp
        }
        // collection: jest.fn(path => ({
        //   where: jest.fn(queryString => ({
        //     get: mockQueryResponse
        //   }))
        // }))
      }
    }));
  });

  it('should ignore empty object', async () => {
    const wrapped = ffTest.wrap(quoteOnCreateFn);
    const emptyObject = {};

    await wrapped({
      data: () => emptyObject,
      ref: {
        set: mockSet
      }
    });

    expect(mockSet).not.toHaveBeenCalled();
  });

  it('should add timestamp', async () => {
    const wrapped = ffTest.wrap(quoteOnCreateFn);
    const quote = { text: 'quote text' };
    const timestamp = 'timestamp';

    mockServerTimestamp.mockReturnValue(timestamp);

    await wrapped({
      data: () => quote,
      ref: {
        set: mockSet
      }
    });

    expect(mockSet).toHaveBeenCalledWith({ createdAt: timestamp }, { merge: true });
  });
});
