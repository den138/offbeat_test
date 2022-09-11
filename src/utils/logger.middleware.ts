import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const currentDateTime = new Date().toLocaleString();
        console.log(
            `${currentDateTime} \nreq path: ${req.path} \nmethod: ${req.method}`,
        );
        next();
    }
}
