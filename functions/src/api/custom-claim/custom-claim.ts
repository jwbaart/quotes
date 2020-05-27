import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { ROLE } from '../../auth-triggers/onCreate';

export enum STATUS {
  FAILED = 'failed',
  INELIGIBLE = 'ineligible',
  SUCCESS = 'success'
}

// TODO: correct HTTP status

export async function customClaim(req: Request, res: Response): Promise<void> {
  const newClaim = req.body.claim;
  const isUnknownClaim = !Object.values(ROLE).includes(newClaim);
  const uid = req.body.uid || '';
  const isUidInvalid = !(uid && uid.length);
  const userClaims = req.claims || {};
  const isUserClaimsMissing = !(!!userClaims && !!Object.keys(userClaims).length);
  const isUserUnauthorized = !(userClaims.hasOwnProperty('admin') && userClaims.admin === true);

  if (isUnknownClaim) {
    console.error('setCustomClaims - unknown claim: ', newClaim);
    res.end(JSON.stringify({ status: STATUS.INELIGIBLE }));
    return;
  }

  if (isUidInvalid) {
    console.error('setCustomClaims - invalid uid: ', uid);
    res.end(JSON.stringify({ status: STATUS.INELIGIBLE }));
    return;
  }

  if (isUserClaimsMissing) {
    console.error('setCustomClaims - user claims missing');
    res.end(JSON.stringify({ status: STATUS.INELIGIBLE }));
    return;
  }

  if (isUserUnauthorized) {
    console.error('setCustomClaims - user not authorized');
    res.end(JSON.stringify({ status: STATUS.FAILED }));
    return;
  }

  admin
    .auth()
    .setCustomUserClaims(uid, {
      [newClaim]: true
    })
    .then(function() {
      // Tell client to refresh token on user.
      res.end(
        JSON.stringify({
          status: STATUS.SUCCESS
        })
      );
    })
    .catch(error => {
      console.error('setCustomClaims - setCustomUserClaims failed', error);
      res.end(JSON.stringify({ status: STATUS.FAILED }));
    });
}
