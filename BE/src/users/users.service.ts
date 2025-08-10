import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordUtils } from 'src/common/utils/password-hasher.util';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.password) {
      throw new BadRequestException('Password is required.');
    }

    const hashedPassword = await PasswordUtils.hashPasswordSync(
      createUserDto.password,
    );

    const { information: userInfor, ...userEntity } = createUserDto;

    return this.prisma.user.create({
      data: {
        ...userEntity,
        password: hashedPassword,
        information: {
          create: {
            ...userInfor,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        information: true,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { information, ...userData } = updateUserDto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        information: {
          update: {
            ...information,
          },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
      include: {
        information: true,
      },
    });
  }
}
