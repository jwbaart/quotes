import { customClaim, STATUS } from './custom-claim';
import { Request, Response } from 'express';
import { ROLE } from './../../auth-triggers/onCreate';
// import * as admin from 'firebase-admin';

jest.mock('firebase-admin', () => {
  const setCustomUserClaims: jest.Mock = jest.fn();

  return {
    auth: jest.fn(() => ({
      setCustomUserClaims
    })),
    initializeApp: jest.fn(),
    firestore: jest.fn()
  };
});

describe('custom claim', () => {
  let mockReq: Request;
  let mockRes: Response;
  let claim: string;
  let uid: string;

  beforeEach(() => {
    claim = ROLE.ADMIN;
    uid = 'uid';
    mockReq = ({
      claims: {
        admin: true
      },
      body: { claim, uid }
    } as unknown) as Request;
    mockRes = ({
      end: jest.fn()
    } as unknown) as Response;
  });

  // describe('setCustomUserClaims', () => {
  //   it('should be called with correct params', async () => {
  //     console.log('admin.auth().setCustomUserClaims', admin.auth().setCustomUserClaims);
  //     const setCustomUserClaims = admin.auth().setCustomUserClaims;
  //     // setCustomUserClaims.mockResolvedValue();
  //     // admin.auth().setCustomUserClaims.m;
  //     await customClaim(mockReq, mockRes);

  //     expect(setCustomUserClaims).toHaveBeenCalledTimes(1);
  //     // expect(setCustomUserClaims).toHaveBeenCalledWith()
  //   });
  // });

  describe('isUnknownClaim', () => {
    it('should error on unknown claim', async () => {
      mockReq.body.claim = 'unknown-claim';
      await customClaim(mockReq, mockRes);
      expect(mockRes.end).toHaveBeenCalledTimes(1);
      expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({ status: STATUS.INELIGIBLE }));
    });

    it('should error on missing claim', async () => {
      delete mockReq.body.claim;
      await customClaim(mockReq, mockRes);
      expect(mockRes.end).toHaveBeenCalledTimes(1);
      expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({ status: STATUS.INELIGIBLE }));
    });

    it('should error on empty claim', async () => {
      mockReq.body.claim = '';
      await customClaim(mockReq, mockRes);
      expect(mockRes.end).toHaveBeenCalledTimes(1);
      expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({ status: STATUS.INELIGIBLE }));
    });
  });

  describe('isUidInvalid', () => {
    it('should error on missing uid', async () => {
      delete mockReq.body.uid;
      await customClaim(mockReq, mockRes);
      expect(mockRes.end).toHaveBeenCalledTimes(1);
      expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({ status: STATUS.INELIGIBLE }));
    });

    it('should error on empty uid', async () => {
      mockReq.body.uid = '';
      await customClaim(mockReq, mockRes);
      expect(mockRes.end).toHaveBeenCalledTimes(1);
      expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({ status: STATUS.INELIGIBLE }));
    });
  });

  describe('isUserClaimsMissing', () => {
    it('should error on missing claim', async () => {
      delete mockReq.claims;
      await customClaim(mockReq, mockRes);
      expect(mockRes.end).toHaveBeenCalledTimes(1);
      expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({ status: STATUS.INELIGIBLE }));
    });

    it('should error on empty claim', async () => {
      mockReq.claims = {};
      await customClaim(mockReq, mockRes);
      expect(mockRes.end).toHaveBeenCalledTimes(1);
      expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({ status: STATUS.INELIGIBLE }));
    });
  });

  describe('isUserUnauthorized', () => {
    it('should error on missing admin claim', async () => {
      if (mockReq.claims) {
        mockReq.claims['preventNoClaims'] = false;
        delete mockReq.claims.admin;
      }
      await customClaim(mockReq, mockRes);
      expect(mockRes.end).toHaveBeenCalledTimes(1);
      expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({ status: STATUS.FAILED }));
    });

    it('should error on false admin claim', async () => {
      if (mockReq.claims) {
        mockReq.claims.admin = false;
      }
      await customClaim(mockReq, mockRes);
      expect(mockRes.end).toHaveBeenCalledTimes(1);
      expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({ status: STATUS.FAILED }));
    });
  });
});
