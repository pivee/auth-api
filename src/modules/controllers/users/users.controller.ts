import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundError } from 'src/core/errors/not-found-error';
import { DataResponse } from '../../../core/data-response/data-response';
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
    return new DataResponse(await this.usersService.create(createUserDto));
  }

  @Get()
  @ApiOkResponse({ description: 'List all users', type: FindAllUsersDto })
  async findAll(): Promise<FindAllUsersDto> {
    return new DataResponse(await this.usersService.findAll({}));
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Find one user', type: FindUserDto })
  async findOne(@Param('id') id: string) {
    try {
      return new DataResponse(await this.usersService.findOne({ id }));
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new NotFoundException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return new DataResponse(
        await this.usersService.update({ where: { id }, data: updateUserDto }),
      );
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      return new DataResponse(await this.usersService.remove({ id }));
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new NotFoundException(error.message);
    }
  }
}
