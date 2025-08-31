import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { saveUserDto } from './dto/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'SAVE_USER' })
  saveUser(@Payload() data: saveUserDto) {
    return this.appService.saveUser(data);
  }

  @MessagePattern({ cmd: 'GET_USERS' })
  getUsers() {
    return this.appService.getUsers();
  }
}
