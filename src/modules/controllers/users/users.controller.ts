import { DataResponse } from '@core/data-response/data-response';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    delete user.password;
    return new DataResponse(user);
  }

  @Get()
  @ApiOkResponse({ description: 'List all users', type: FindAllUsersDto })
  async findAll(): Promise<FindAllUsersDto> {
    return new DataResponse(
      (await this.usersService.findAll({})).map((user) => {
        delete user.password;
        return user;
      }),
    );
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Find one user', type: FindUserDto })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne({ id });
    delete user.password;
    return new DataResponse(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new DataResponse(
      await this.usersService.update({ where: { id }, data: updateUserDto }),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return new DataResponse(await this.usersService.remove({ id }));
  }
}
