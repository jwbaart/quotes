import { Request, Response } from 'express';

export async function customClaim(request: Request, response: Response): Promise<void> {
  response.status(200).send(
    JSON.stringify({
      status: 'success'
    })
  );
}
