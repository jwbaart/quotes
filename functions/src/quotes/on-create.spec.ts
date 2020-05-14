const fft = require('firebase-functions-test')();
import { quoteOnCreateFn } from '../index';

describe('setCustomClaim', () => {
  let mockServerTimestamp: jest.Mock;
  let mockSet: jest.Mock;
  let timestamp: string;

  beforeEach(() => {
    timestamp = 'timestamp';
    mockServerTimestamp = jest.fn().mockReturnValue(timestamp);
    mockSet = jest.fn();

    jest.mock('firebase-admin', () => ({
      initializeApp: jest.fn(),
      firestore: {
        FieldValue: {
          serverTimestamp: mockServerTimestamp
        }
      }
    }));
  });

  it('should ignore empty object', async () => {
    const wrapped = fft.wrap(quoteOnCreateFn);
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
    const wrapped = fft.wrap(quoteOnCreateFn);
    const quote = { text: 'quote text' };

    await wrapped({
      data: () => quote,
      ref: {
        set: mockSet
      }
    });

    expect(mockSet).toHaveBeenCalledWith({ createdAt: timestamp }, { merge: true });
  });
});
