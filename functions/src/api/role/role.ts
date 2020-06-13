import { Request, Response } from 'express';
import { ROLE } from '../../auth-triggers/onCreate';
import { updateUser } from '../helpers/firebase';
import { setCustomUserClaims } from '../helpers/auth';

export enum STATUS {
  FAILED = 'failed',
  INELIGIBLE = 'ineligible',
  SUCCESS = 'success'
}

export async function userRole(req: Request, res: Response): Promise<void> {
  const { role, uid } = req.body;
  const userClaims = req.claims || {};

  // validate input
  const isUnknownRole = !Object.values(ROLE).includes(role);
  const isUidInvalid = !(uid && uid.length);
  const isUserClaimsMissing = !(!!userClaims && !!Object.keys(userClaims).length);
  const isUserUnauthorized = !(userClaims.hasOwnProperty('role') && userClaims.role === 'admin');

  if (isUnknownRole) {
    console.error('setRole - unknown role: ', role);
    res
      .status(422)
      .json({ status: STATUS.INELIGIBLE })
      .end();
    return;
  }

  if (isUidInvalid) {
    console.error('setRole - invalid uid: ', uid);
    res
      .status(422)
      .json({ status: STATUS.INELIGIBLE })
      .end();
    return;
  }

  if (isUserClaimsMissing) {
    console.error('setRole - user claims missing');
    res.status(500).end();
    return;
  }

  if (isUserUnauthorized) {
    console.error('setRole - user not authorized');
    res.status(403).end();
    return;
  }

  try {
    await Promise.all([updateUser(uid, { role }), setCustomUserClaims(uid, { role })]);

    res
      .json({
        status: STATUS.SUCCESS
      })
      .end();
  } catch (error) {
    console.error('setRole - setCustomUserClaims failed', error);
    res.json({ status: STATUS.FAILED }).end();
  }
}
