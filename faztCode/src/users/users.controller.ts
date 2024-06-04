import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from './user';
import { UsersService } from './users.service';
import { UserRequest } from './user.request';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  public getUsers(): User[] {
    return this.usersService.getUsers();
  }
  @Get(':id')
  public getUserById(@Param('id') id: number): User {
    return this.usersService.getUserById(id);
  }
  @Post()
  @UsePipes(new ValidationPipe())
  public createUser(@Body() userRequest: UserRequest): User {
    return this.usersService.createUser(userRequest);
  }
  @Put(':id')
  public updateUser(@Param('id') id: number, @Body() userRequest: UserRequest): void {
    this.usersService.updateUser(id, userRequest);
  }
  @Delete(':id')
  public deleteUser(@Param('id') id: number): void {
    this.usersService.deleteUserById(id);
  }
}
