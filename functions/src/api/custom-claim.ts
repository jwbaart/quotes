import { Request, Response } from 'express';

export async function customClaim(request: Request, response: Response): Promise<void> {
  response.send('success 2');
}
