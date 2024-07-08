import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { UserNotFoundError } from './errors/user-not-found-error';
import { CryptoService } from '@modules/crypto/crypto.service';
import { UserAlreadyExistsError } from './errors/user-already-exists';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptoService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.findOne({ email: data.email });
    if (user) throw new UserAlreadyExistsError(data.email);
    return this.prisma.user.create({
      data: {
        ...data,
        password: await this.cryptoService.createHash(data.password, 10),
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    if (!user) throw new UserNotFoundError(userWhereUniqueInput.id);
    return user;
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    await this.findOne(where);
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    await this.findOne(where);
    return this.prisma.user.delete({
      where,
    });
  }
}
