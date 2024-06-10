import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Ip,
  Logger,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(@Ip() ip: string): string {
    // console.log(ip);
    // this.logger.log(ip);
    // console.log(this.configService.get<string>('ENVIRONMENT'));
    return this.appService.getHello();
    // throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Get('name/:name')
  getName(@Param('name') name: string): string {
    return `${name} hello`;
  }
}
