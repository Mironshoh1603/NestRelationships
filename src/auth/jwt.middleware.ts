import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header not found or invalid',
      );
    }

    const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

    try {
      const decoded = this.jwtService.verify(token, {
        secret: 'Nimadir', // Use the secret key to verify
      });

      // Attach the decoded user info to the request
      req['user'] = decoded;
      next(); // Call the next middleware/handler
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
