import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  get(key: string): string {
    return process.env[key];
  }
}
