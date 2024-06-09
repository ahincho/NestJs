import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user';
import { UserRequest } from './user.request';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  private users: User[] = [];
  constructor(private prismaService: PrismaService) { }
  public getUsers() {
    return this.prismaService.users.findMany();
  }
  public getUserById(id: number): User {
    if (id > 0 && id <= this.users.length) {
      return this.users.find(user => user.id === id);
    } else {
      console.log(`User with id ${id} not found`);
    }
  }
  public createUser(userRequest: UserRequest) {
    return this.prismaService.users.create({ data: userRequest });
  }
  public updateUser(id: number, userRequest: UserRequest): void {
    if (id > 0 && id <= this.users.length) {
      this.users[id - 1] = new User(id, userRequest.name, userRequest.lastname, userRequest.email, userRequest.password, userRequest.age);
    } else {
      console.log(`User with id ${id} not found`);
    }
  }
  public deleteUserById(id: number) {
    if (id > 0 && id <= this.users.length) {
      this.users = this.users.filter(task => task.id !== id);
    } else {
      console.log(`User with id ${id} not found`)
    }
  }
}