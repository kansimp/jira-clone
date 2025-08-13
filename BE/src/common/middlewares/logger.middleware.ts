import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const status = res.statusCode;
      const message = `${req.method} ${req.originalUrl} - ${status}`;

      if (status < 400) {
        this.logger.log(message);
      } else {
        this.logger.error(message);
      }
    });

    next();
  }
}
