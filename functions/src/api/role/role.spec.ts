import { userRole, STATUS } from './role';
import { Request, Response } from 'express';
import { ROLE } from '../../auth-triggers/onCreate';
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

describe('user role', () => {
  let mockReq: Request;
  // let mockRes: Response;
  let mockResNew: Response;
  const generateResponse: () => Response = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);
    return res as Response;
  };
  let role: string;
  let uid: string;

  beforeEach(() => {
    role = ROLE.ADMIN;
    uid = 'uid';
    mockReq = ({
      claims: {
        role
      },
      body: { role, uid }
    } as unknown) as Request;
    // mockRes = ({
    //   end: jest.fn()
    // } as unknown) as Response;
    mockResNew = generateResponse();
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

  describe('isUnknownRole', () => {
    it('should error on unknown role', async () => {
      mockReq.body.role = 'unknown-role';
      await userRole(mockReq, mockResNew);
      expect(mockResNew.end).toHaveBeenCalledTimes(1);
      expect(mockResNew.json).toHaveBeenCalledWith({ status: STATUS.INELIGIBLE });
      expect(mockResNew.status).toHaveBeenCalledWith(422);
    });

    it('should error on missing role', async () => {
      delete mockReq.body.role;
      await userRole(mockReq, mockResNew);
      expect(mockResNew.end).toHaveBeenCalledTimes(1);
      expect(mockResNew.json).toHaveBeenCalledWith({ status: STATUS.INELIGIBLE });
      expect(mockResNew.status).toHaveBeenCalledWith(422);
    });

    it('should error on empty role', async () => {
      mockReq.body.role = '';
      await userRole(mockReq, mockResNew);
      expect(mockResNew.end).toHaveBeenCalledTimes(1);
      expect(mockResNew.json).toHaveBeenCalledWith({ status: STATUS.INELIGIBLE });
      expect(mockResNew.status).toHaveBeenCalledWith(422);
    });
  });

  describe('isUidInvalid', () => {
    it('should error on missing uid', async () => {
      delete mockReq.body.uid;
      await userRole(mockReq, mockResNew);
      expect(mockResNew.end).toHaveBeenCalledTimes(1);
      expect(mockResNew.json).toHaveBeenCalledWith({ status: STATUS.INELIGIBLE });
      expect(mockResNew.status).toHaveBeenCalledWith(422);
    });

    it('should error on empty uid', async () => {
      mockReq.body.uid = '';
      await userRole(mockReq, mockResNew);
      expect(mockResNew.end).toHaveBeenCalledTimes(1);
      expect(mockResNew.json).toHaveBeenCalledWith({ status: STATUS.INELIGIBLE });
      expect(mockResNew.status).toHaveBeenCalledWith(422);
    });
  });

  describe('isUserClaimsMissing', () => {
    it('should error on missing role', async () => {
      delete mockReq.claims;
      await userRole(mockReq, mockResNew);
      expect(mockResNew.end).toHaveBeenCalledTimes(1);
      expect(mockResNew.status).toHaveBeenCalledWith(500);
    });

    it('should error on empty role', async () => {
      mockReq.claims = {};
      await userRole(mockReq, mockResNew);
      expect(mockResNew.end).toHaveBeenCalledTimes(1);
      expect(mockResNew.status).toHaveBeenCalledWith(500);
    });
  });

  xdescribe('isUserUnauthorized', () => {
    it('should error on missing admin role', async () => {
      if (mockReq.claims) {
        mockReq.claims['preventNoClaims'] = false;
        delete mockReq.claims.role;
      }
      await userRole(mockReq, mockResNew);
      expect(mockResNew.end).toHaveBeenCalledTimes(1);
      expect(mockResNew.status).toHaveBeenCalledWith(403);
    });

    it('should error on non admin role', async () => {
      if (mockReq.claims) {
        mockReq.claims.role = ROLE.EDITOR;
      }
      await userRole(mockReq, mockResNew);
      expect(mockResNew.end).toHaveBeenCalledTimes(1);
      expect(mockResNew.status).toHaveBeenCalledWith(403);
    });
  });
});
