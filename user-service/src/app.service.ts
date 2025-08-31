import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { saveUserDto } from './dto/dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  getUsers() {
    const users = this.prismaService.user.findMany();
    return {
      HttpCode: 201,
      data: users,
    };
  }

  async saveUser(data: saveUserDto) {
    try {
      const result = await this.prismaService.user.create({
        data: {
          name: data.name,
          email: data.email,
          age: data.age,
        },
      });

      return {
        HttpCode: 201,
        message: 'User saved successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        HttpCode: 400,
        message: 'Error saving user',
        data: null,
      };
    }
  }
  deleteUser() {
    return { message: 'User deleted successfully' };
  }
}
