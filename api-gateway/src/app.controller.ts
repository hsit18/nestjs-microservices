import { Controller, Delete, Get, Inject, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/api')
export class AppController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/user')
  saveUser(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAVE_USER' }, req.body);
  }

  @Get('/user')
  getUsers() {
    return this.natsClient.emit({ cmd: 'GET_USERS' }, {});
  }

  @Delete('/user')
  deleteUser(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_USER' }, req.body);
  }
}
