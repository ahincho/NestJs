import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from './user';
import { UsersService } from './users.service';
import { UserRequest } from './user.request';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiTags('users')
  @Get()
  public getUsers() {
    return this.usersService.getUsers();
  }
  @ApiTags('users')
  @Get(':id')
  public getUserById(@Param('id') id: number): User {
    return this.usersService.getUserById(id);
  }
  @ApiTags('users')
  @Post()
  public createUser(@Body() userRequest: UserRequest) {
    return this.usersService.createUser(userRequest);
  }
  @ApiTags('users')
  @Put(':id')
  public updateUser(@Param('id') id: number, @Body() userRequest: UserRequest): void {
    this.usersService.updateUser(id, userRequest);
  }
  @ApiTags('users')
  @Delete(':id')
  public deleteUser(@Param('id') id: number): void {
    this.usersService.deleteUserById(id);
  }
}
