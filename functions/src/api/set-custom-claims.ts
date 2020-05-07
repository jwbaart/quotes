import * as express from 'express';
import * as admin from 'firebase-admin';
import { ROLE } from '../auth';

const app = express();

admin.initializeApp();

app.post('/setCustomClaims', (req, res) => {
  // Get the ID token passed.
  const idToken = req.body.idToken;
  const newClaim = req.body.claim;
  const isKnownClaim = Object.values(ROLE).includes(newClaim);

  // Check if claim exists
  if (isKnownClaim) {
    // Verify the ID token and decode its payload.
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(claims => {
        // const userIsAdmin = claims.hasOwnProperty('admin') && claims.admin === true;
        // if (userIsAdmin) {

        // Add custom claims for additional privileges.
        admin
          .auth()
          .setCustomUserClaims(claims.sub, {
            [newClaim]: true
          })
          .then(function() {
            // Tell client to refresh token on user.
            res.end(
              JSON.stringify({
                status: 'success'
              })
            );
          })
          .catch(error => console.error('setCustomClaims - setCustomUserClaims failed', error));
        // }
      })
      .catch(error => console.error('setCustomClaims - verifyIdToken failed', error));
  } else {
    console.error('setCustomClaims - unknown claim: ', newClaim);
    res.end(JSON.stringify({ status: 'ineligible' }));
  }
});

export { app };
